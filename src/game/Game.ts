import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import { GameScene } from "./GameScene";
import { CharacterModel } from "./CharacterModel";
import { Character } from "../domain/character/Character";
import { School } from "../domain/character/School";
import { UIManager } from "./UIManager";

export class Game {
    private engine: Engine;
    private scene: GameScene;
    private characterModels: Map<string, CharacterModel> = new Map();
    private uiManager: UIManager;
    private character: Character;
    private characterModel: CharacterModel;

    constructor(canvas: HTMLCanvasElement) {
        // 创建引擎
        this.engine = new Engine(canvas, true);

        // 创建场景
        this.scene = new GameScene(new Scene(this.engine));

        // 创建相机
        const camera = new ArcRotateCamera("camera", 0, Math.PI / 3, 10, Vector3.Zero(), this.scene.getScene());
        camera.attachControl(canvas, true);

        // 创建光源
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene.getScene());

        // 创建角色
        const school = new School("测试门派");
        this.character = new Character("测试角色", school);
        this.characterModel = new CharacterModel(this.scene.getScene(), this.character);
        this.characterModel.loadModel();

        // 创建UI管理器
        this.uiManager = new UIManager(canvas);

        // 初始化UI
        this.updateUI();

        // 设置渲染循环
        this.engine.runRenderLoop(() => {
            this.scene.getScene().render();
            this.update();
        });

        // 处理窗口大小变化
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }

    private update(): void {
        // 更新角色状态
        this.character.updateBuffs();
        
        // 更新UI
        this.updateUI();
    }

    private updateUI(): void {
        // 更新角色信息
        this.uiManager.updateCharacterInfo(
            this.character.getName(),
            this.character.getAttributes()
        );

        // 更新状态条
        const status = this.character.getStatus();
        this.uiManager.updateStatus(
            status.气血,
            this.character.getAttributes().体质 * 10, // 最大气血
            status.内力,
            this.character.getAttributes().根骨 * 10  // 最大内力
        );
    }

    public async createCharacter(character: Character, modelPath: string): Promise<void> {
        const model = new CharacterModel(
            this.scene.getScene(),
            character,
            modelPath
        );
        this.characterModels.set(character.getName(), model);

        // 更新UI
        this.uiManager.updateCharacterInfo(
            character.getName(),
            character.getAttributes()
        );
    }

    public getCharacterModel(name: string): CharacterModel | undefined {
        return this.characterModels.get(name);
    }

    public dispose(): void {
        this.characterModels.forEach(model => model.dispose());
        this.scene.getScene().dispose();
        this.uiManager.dispose();
        this.engine.dispose();
    }
} 