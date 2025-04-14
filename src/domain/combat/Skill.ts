import { Character } from "../character/Character";
import { SkillEffect } from "./SkillEffect";

export class Skill {
    constructor(
        private name: string,
        private effect: SkillEffect
    ) {}
    
    public getName(): string {
        return this.name;
    }
    
    public getEffect(): SkillEffect {
        return this.effect;
    }
    
    public getCooldown(): number {
        return this.effect.冷却时间;
    }
    
    public use(caster: Character, target?: Character): boolean {
        // 检查内力是否足够
        if (caster.getStatus().内力 < this.effect.内力消耗) {
            return false;
        }
        
        // 消耗内力
        caster.consumeMana(this.effect.内力消耗);
        
        // 应用技能效果
        this.applyEffect(caster, target);
        
        return true;
    }
    
    private applyEffect(caster: Character, target?: Character): void {
        // 根据技能效果类型应用不同的效果
        switch (this.effect.效果类型) {
            case "伤害":
                if (target) {
                    const damage = caster.getAttributes().力道 * this.effect.伤害系数;
                    target.takeDamage(damage);
                }
                break;
            case "治疗":
                if (target) {
                    const heal = caster.getAttributes().根骨 * this.effect.伤害系数;
                    target.heal(heal);
                }
                break;
            // 其他效果类型的处理...
        }
    }
} 