import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh } from "@babylonjs/core";

export class GameScene {
    private engine: Engine;
    private scene: Scene;
    private camera!: ArcRotateCamera;  // 使用!表示这个属性会在构造函数中初始化
    
    constructor(canvas: HTMLCanvasElement) {
        // 创建引擎
        this.engine = new Engine(canvas, true);
        
        // 创建场景
        this.scene = new Scene(this.engine);
        
        // 设置相机
        this.setupCamera();
        
        // 设置光照
        this.setupLighting();
        
        // 开始渲染循环
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
    
    private setupCamera(): void {
        // 创建相机
        this.camera = new ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2.5,
            10,
            Vector3.Zero(),
            this.scene
        );
        
        // 设置相机控制
        this.camera.attachControl(this.engine.getRenderingCanvas(), true);
    }
    
    private setupLighting(): void {
        // 创建环境光
        const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            this.scene
        );
        
        // 设置光照强度
        light.intensity = 0.7;
    }
    
    public getScene(): Scene {
        return this.scene;
    }
    
    public getEngine(): Engine {
        return this.engine;
    }
} 