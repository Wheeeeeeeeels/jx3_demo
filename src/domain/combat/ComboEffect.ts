import { SkillEffect } from './SkillEffect';
import { Character } from '../character/Character';

export enum ComboEffectType {
    伤害加成 = '伤害加成',
    效果增强 = '效果增强',
    特殊效果 = '特殊效果'
}

export interface IComboEffect {
    name: string;
    type: ComboEffectType;
    description: string;
    apply(caster: Character, target: Character, baseEffect: SkillEffect): void;
}

export class ComboEffect implements IComboEffect {
    constructor(
        public name: string,
        public type: ComboEffectType,
        public description: string,
        private effectFunction: (caster: Character, target: Character, baseEffect: SkillEffect) => void
    ) {}

    apply(caster: Character, target: Character, baseEffect: SkillEffect): void {
        this.effectFunction(caster, target, baseEffect);
    }
} 