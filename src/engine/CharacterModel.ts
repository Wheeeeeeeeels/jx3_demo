import { Scene, AbstractMesh, AnimationGroup, Vector3 } from "@babylonjs/core";
import { Character } from "../domain/character/Character";
import { IStatus } from "../domain/character/Status";

export class CharacterModel {
    private mesh: AbstractMesh | null = null;
    private animations: Map<string, AnimationGroup> = new Map();
    private currentAnimation: AnimationGroup | null = null;
    
    constructor(
        private scene: Scene,
        private character: Character
    ) {}
    
    public async loadModel(modelUrl: string): Promise<void> {
        // TODO: 实现模型加载
        // 这里需要加载角色模型和动画
    }
    
    public update(status: IStatus): void {
        // 更新模型状态
        if (this.mesh) {
            // 根据状态更新模型外观
            // 例如：受伤状态、buff效果等
        }
    }
    
    public playAnimation(name: string): void {
        const animation = this.animations.get(name);
        if (animation) {
            if (this.currentAnimation) {
                this.currentAnimation.stop();
            }
            animation.play();
            this.currentAnimation = animation;
        }
    }
    
    public setPosition(position: Vector3): void {
        if (this.mesh) {
            this.mesh.position = position;
        }
    }
    
    public setRotation(rotation: Vector3): void {
        if (this.mesh) {
            this.mesh.rotation = rotation;
        }
    }
} 