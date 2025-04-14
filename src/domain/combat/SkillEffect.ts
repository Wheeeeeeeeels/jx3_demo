import { IAttributes } from '../character/IAttributes';
import { SkillEffectType } from './SkillEffectType';
import { SkillTargetType } from './SkillTargetType';

export interface SkillEffect {
    伤害系数: number;
    内力消耗: number;
    冷却时间: number;
    持续时间: number;
    效果类型: SkillEffectType;
    目标类型: SkillTargetType;
    attributes?: Partial<IAttributes>;
    stackable?: boolean;
    maxStacks?: number;
} 