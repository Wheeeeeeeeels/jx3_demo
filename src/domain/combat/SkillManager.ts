import { Character } from '../character/Character';
import { Skill } from './Skill';
import { SkillEffect } from './SkillEffect';
import { SkillEffectType } from './SkillEffectType';
import { SkillTargetType } from './SkillTargetType';

export class SkillManager {
    private skills: Map<string, Skill> = new Map();
    private cooldowns: Map<string, number> = new Map();
    
    constructor(private character: Character) {}
    
    public addSkill(skill: Skill): void {
        this.skills.set(skill.getName(), skill);
    }
    
    public useSkill(skillName: string, target?: Character): boolean {
        const skill = this.skills.get(skillName);
        if (!skill) {
            console.error(`技能 ${skillName} 不存在`);
            return false;
        }
        
        // 检查冷却
        const cooldownEnd = this.cooldowns.get(skillName) || 0;
        if (Date.now() < cooldownEnd) {
            console.error(`技能 ${skillName} 还在冷却中`);
            return false;
        }
        
        try {
            // 使用技能
            const success = skill.use(this.character, target);
            if (success) {
                // 设置冷却时间
                this.cooldowns.set(skillName, Date.now() + skill.getCooldown());
            }
            return success;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`使用技能 ${skillName} 失败:`, error.message);
            } else {
                console.error(`使用技能 ${skillName} 失败:`, String(error));
            }
            return false;
        }
    }
    
    public getSkills(): Skill[] {
        return Array.from(this.skills.values());
    }
    
    public getCooldown(skillName: string): number {
        const cooldownEnd = this.cooldowns.get(skillName) || 0;
        const remaining = cooldownEnd - Date.now();
        return Math.max(0, remaining);
    }

    private applySkillEffect(skill: Skill, target?: Character): void {
        const effect = skill.getEffect();
        
        switch (effect.效果类型) {
            case SkillEffectType.伤害:
                if (target) {
                    target.takeDamage(this.calculateDamage(effect.伤害系数));
                }
                break;
            case SkillEffectType.治疗:
                if (target) {
                    target.heal(this.calculateHeal(effect.伤害系数));
                }
                break;
            // 其他效果类型的处理...
        }
    }

    private calculateDamage(damageFactor: number): number {
        const attributes = this.character.getAttributes();
        return attributes.力道 * damageFactor;
    }

    private calculateHeal(healFactor: number): number {
        const attributes = this.character.getAttributes();
        return attributes.根骨 * healFactor;
    }

    public getAvailableSkills(): Skill[] {
        const currentTime = Date.now();
        return Array.from(this.skills.values()).filter(skill => {
            const lastUsed = this.cooldowns.get(skill.getName()) || 0;
            return currentTime - lastUsed >= skill.getEffect().冷却时间;
        });
    }
} 