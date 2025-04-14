import { EventEmitter } from 'events';

export class GameEngine {
    private static instance: GameEngine;
    private eventEmitter: EventEmitter;
    private isRunning: boolean = false;
    private tickRate: number = 60; // 每秒更新次数
    private lastTick: number = 0;

    private constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public static getInstance(): GameEngine {
        if (!GameEngine.instance) {
            GameEngine.instance = new GameEngine();
        }
        return GameEngine.instance;
    }

    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.gameLoop();
    }

    public stop(): void {
        this.isRunning = false;
    }

    private gameLoop(): void {
        if (!this.isRunning) return;

        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastTick;

        if (deltaTime >= 1000 / this.tickRate) {
            this.update(deltaTime);
            this.lastTick = currentTime;
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    private update(deltaTime: number): void {
        this.eventEmitter.emit('tick', deltaTime);
    }

    public on(event: string, listener: (...args: any[]) => void): void {
        this.eventEmitter.on(event, listener);
    }
} 