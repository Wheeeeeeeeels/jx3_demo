import { Scene, TransformNode, AbstractMesh, AnimationGroup, Vector3, SceneLoader } from "@babylonjs/core";
import { Character } from "../domain/character/Character";

export class CharacterModel {
    private rootNode: TransformNode;
    private meshes: AbstractMesh[] = [];
    private animations: Map<string, AnimationGroup> = new Map();
    private currentAnimation: string = "idle";

    constructor(
        private scene: Scene,
        private character: Character,
        private modelPath: string
    ) {
        this.rootNode = new TransformNode(`character_${character.getName()}`, scene);
        this.loadModel();
    }

    private async loadModel(): Promise<void> {
        try {
            // 加载模型
            const result = await SceneLoader.ImportMeshAsync(
                "",
                this.modelPath,
                "",
                this.scene
            );

            // 设置模型
            this.meshes = result.meshes;
            this.animations = new Map(
                result.animationGroups.map((group: AnimationGroup) => [group.name, group])
            );

            // 设置根节点
            this.meshes.forEach(mesh => {
                mesh.parent = this.rootNode;
            });

            // 设置初始位置
            this.rootNode.position = new Vector3(0, 0, 0);

            // 播放待机动画
            this.playAnimation("idle");
        } catch (error) {
            console.error("加载角色模型失败:", error);
        }
    }

    public playAnimation(name: string): void {
        const animation = this.animations.get(name);
        if (animation) {
            // 停止当前动画
            if (this.currentAnimation) {
                const currentAnimation = this.animations.get(this.currentAnimation);
                if (currentAnimation) {
                    currentAnimation.stop();
                }
            }

            // 播放新动画
            animation.play(true);
            this.currentAnimation = name;
        }
    }

    public setPosition(position: Vector3): void {
        this.rootNode.position = position;
    }

    public getPosition(): Vector3 {
        return this.rootNode.position;
    }

    public dispose(): void {
        this.meshes.forEach(mesh => mesh.dispose());
        this.animations.forEach(animation => animation.dispose());
        this.rootNode.dispose();
    }
} 