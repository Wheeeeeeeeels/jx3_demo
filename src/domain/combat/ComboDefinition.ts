import { Skill } from './Skill';
import { ComboEffect } from './ComboEffect';

export interface IComboDefinition {
    name: string;
    description: string;
    requiredSkills: Skill[];
    comboEffect: ComboEffect;
    maxTimeBetweenSkills: number; // 连招技能之间的最大时间间隔（毫秒）
}

export class ComboDefinition implements IComboDefinition {
    constructor(
        public name: string,
        public description: string,
        public requiredSkills: Skill[],
        public comboEffect: ComboEffect,
        public maxTimeBetweenSkills: number
    ) {}
} 