import { Scene, ArcRotateCamera, Vector3, HemisphericLight, DirectionalLight, ShadowGenerator, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

export class GameScene {
    private scene: Scene;
    private camera!: ArcRotateCamera;
    private light!: HemisphericLight;
    private directionalLight!: DirectionalLight;
    private shadowGenerator!: ShadowGenerator;

    constructor(scene: Scene) {
        this.scene = scene;
        this.setupCamera();
        this.setupLights();
        this.setupGround();
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
        this.camera.attachControl(this.scene.getEngine().getRenderingCanvas(), true);
        this.camera.lowerRadiusLimit = 5;
        this.camera.upperRadiusLimit = 20;
    }

    private setupLights(): void {
        // 创建环境光
        this.light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            this.scene
        );
        this.light.intensity = 0.7;

        // 创建方向光（用于阴影）
        this.directionalLight = new DirectionalLight(
            "directionalLight",
            new Vector3(0, -1, 1),
            this.scene
        );
        this.directionalLight.intensity = 0.5;

        // 创建阴影生成器
        this.shadowGenerator = new ShadowGenerator(1024, this.directionalLight);
        this.shadowGenerator.useBlurExponentialShadowMap = true;
        this.shadowGenerator.blurKernel = 32;
    }

    private setupGround(): void {
        // 创建地面
        const ground = MeshBuilder.CreateGround(
            "ground",
            { width: 100, height: 100 },
            this.scene
        );
        
        // 设置地面材质
        const groundMaterial = new StandardMaterial("groundMaterial", this.scene);
        groundMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
        groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
        ground.material = groundMaterial;

        // 为地面添加阴影
        ground.receiveShadows = true;
    }

    public getScene(): Scene {
        return this.scene;
    }

    public getCamera(): ArcRotateCamera {
        return this.camera;
    }

    public getShadowGenerator(): ShadowGenerator {
        return this.shadowGenerator;
    }
} 