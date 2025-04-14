import { EventEmitter } from 'events';

export interface NetworkConfig {
    serverUrl: string;
    reconnectAttempts: number;
    reconnectDelay: number;
}

export class NetworkManager {
    private static instance: NetworkManager;
    private socket: WebSocket | null = null;
    private eventEmitter: EventEmitter;
    private config: NetworkConfig;
    private reconnectCount: number = 0;

    private constructor(config: NetworkConfig) {
        this.config = config;
        this.eventEmitter = new EventEmitter();
    }

    public static getInstance(config?: NetworkConfig): NetworkManager {
        if (!NetworkManager.instance && config) {
            NetworkManager.instance = new NetworkManager(config);
        }
        return NetworkManager.instance;
    }

    public connect(): void {
        try {
            this.socket = new WebSocket(this.config.serverUrl);
            this.setupSocketListeners();
        } catch (error) {
            this.handleConnectionError(error);
        }
    }

    private setupSocketListeners(): void {
        if (!this.socket) return;

        this.socket.onopen = () => {
            this.reconnectCount = 0;
            this.eventEmitter.emit('connected');
        };

        this.socket.onmessage = (event) => {
            this.handleMessage(event.data);
        };

        this.socket.onclose = () => {
            this.handleDisconnect();
        };

        this.socket.onerror = (error) => {
            this.handleConnectionError(error);
        };
    }

    private handleMessage(data: any): void {
        try {
            const parsedData = JSON.parse(data);
            this.eventEmitter.emit('message', parsedData);
        } catch (error) {
            console.error('Failed to parse message:', error);
        }
    }

    private handleDisconnect(): void {
        if (this.reconnectCount < this.config.reconnectAttempts) {
            setTimeout(() => {
                this.reconnectCount++;
                this.connect();
            }, this.config.reconnectDelay);
        } else {
            this.eventEmitter.emit('disconnected');
        }
    }

    private handleConnectionError(error: any): void {
        this.eventEmitter.emit('error', error);
    }

    public send(data: any): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }
} 