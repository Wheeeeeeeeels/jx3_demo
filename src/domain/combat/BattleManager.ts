import { Character } from '../character/Character';
import { Skill } from './Skill';
import { SkillEffect } from './SkillEffect';
import { SkillEffectType } from './SkillEffectType';

export class BattleManager {
    private characters: Character[] = [];
    private currentTime: number = 0;
    private battleLog: string[] = [];

    constructor() {}

    public addCharacter(character: Character): void {
        this.characters.push(character);
    }

    public removeCharacter(character: Character): void {
        const index = this.characters.indexOf(character);
        if (index !== -1) {
            this.characters.splice(index, 1);
        }
    }

    public update(deltaTime: number): void {
        this.currentTime += deltaTime;
        
        // 更新所有角色的状态
        for (const character of this.characters) {
            character.updateBuffs(this.currentTime);
        }
    }

    public useSkill(skill: Skill, caster: Character, target?: Character): void {
        try {
            const success = skill.use(caster, target);
            if (success) {
                this.logBattle(`${caster.getName()} 使用了 ${skill.getName()}`);
            } else {
                this.logBattle(`${caster.getName()} 使用 ${skill.getName()} 失败`);
            }
        } catch (error) {
            if (error instanceof Error) {
                this.logBattle(`技能使用失败: ${error.message}`);
            } else {
                this.logBattle(`技能使用失败: ${String(error)}`);
            }
        }
    }

    public applySkillEffect(effect: SkillEffect, caster: Character, target?: Character): void {
        try {
            // 根据技能效果类型应用不同的效果
            switch (effect.效果类型) {
                case SkillEffectType.伤害:
                    if (target) {
                        const damage = caster.getAttributes().力道 * effect.伤害系数;
                        target.takeDamage(damage);
                    }
                    break;
                case SkillEffectType.治疗:
                    if (target) {
                        const heal = caster.getAttributes().根骨 * effect.伤害系数;
                        target.heal(heal);
                    }
                    break;
                // 其他效果类型的处理...
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("应用技能效果失败:", error.message);
            } else {
                console.error("应用技能效果失败:", String(error));
            }
        }
    }

    private calculateDamage(damageFactor: number): number {
        // 简化的伤害计算公式
        const attackerAttributes = this.characters[0].getAttributes();
        const defenderAttributes = this.characters[1].getAttributes();
        
        const baseDamage = attackerAttributes.力道 * damageFactor;
        const defense = defenderAttributes.身法 * 0.5;
        
        return Math.max(1, baseDamage - defense);
    }

    private logBattle(message: string): void {
        this.battleLog.push(message);
    }

    public getBattleLog(): string[] {
        return this.battleLog;
    }
} 