import { SkillEffect } from './SkillEffect';
import { SkillEffectType } from './SkillEffectType';
import { SkillTargetType } from './SkillTargetType';
import { IAttributes } from '../character/IAttributes';

export class SkillEffectFactory {
    public static createDamageEffect(
        damageFactor: number,
        manaCost: number,
        cooldown: number,
        targetType: SkillTargetType = SkillTargetType.单个目标
    ): SkillEffect {
        return {
            伤害系数: damageFactor,
            内力消耗: manaCost,
            冷却时间: cooldown,
            持续时间: 0,
            效果类型: SkillEffectType.伤害,
            目标类型: targetType
        };
    }

    public static createHealEffect(
        healFactor: number,
        manaCost: number,
        cooldown: number,
        targetType: SkillTargetType = SkillTargetType.单个目标
    ): SkillEffect {
        return {
            伤害系数: healFactor,
            内力消耗: manaCost,
            冷却时间: cooldown,
            持续时间: 0,
            效果类型: SkillEffectType.治疗,
            目标类型: targetType
        };
    }

    public static createBuffEffect(
        attributes: Partial<IAttributes>,
        duration: number,
        manaCost: number,
        cooldown: number,
        stackable: boolean = false,
        maxStacks: number = 1,
        targetType: SkillTargetType = SkillTargetType.自身
    ): SkillEffect {
        return {
            伤害系数: 0,
            内力消耗: manaCost,
            冷却时间: cooldown,
            持续时间: duration,
            效果类型: SkillEffectType.增益,
            目标类型: targetType,
            attributes,
            stackable,
            maxStacks
        };
    }

    public static createDebuffEffect(
        attributes: Partial<IAttributes>,
        duration: number,
        manaCost: number,
        cooldown: number,
        stackable: boolean = false,
        maxStacks: number = 1,
        targetType: SkillTargetType = SkillTargetType.单个目标
    ): SkillEffect {
        return {
            伤害系数: 0,
            内力消耗: manaCost,
            冷却时间: cooldown,
            持续时间: duration,
            效果类型: SkillEffectType.减益,
            目标类型: targetType,
            attributes,
            stackable,
            maxStacks
        };
    }
} 