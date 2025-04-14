import { Character } from '../character/Character';
import { Skill } from './Skill';
import { ComboDefinition } from './ComboDefinition';
import { ComboEffect } from './ComboEffect';

export class ComboManager {
    private comboDefinitions: ComboDefinition[] = [];
    private activeCombos: Map<Character, {
        definition: ComboDefinition;
        currentIndex: number;
        lastSkillTime: number;
    }> = new Map();

    constructor() {}

    public addComboDefinition(definition: ComboDefinition): void {
        this.comboDefinitions.push(definition);
    }

    public onSkillUsed(character: Character, skill: Skill, target: Character): void {
        const currentTime = Date.now();
        
        // 检查是否有正在进行的连招
        const activeCombo = this.activeCombos.get(character);
        if (activeCombo) {
            // 检查时间间隔
            if (currentTime - activeCombo.lastSkillTime > activeCombo.definition.maxTimeBetweenSkills) {
                // 超时，重置连招
                this.activeCombos.delete(character);
                return;
            }

            // 检查是否是连招的下一个技能
            if (skill === activeCombo.definition.requiredSkills[activeCombo.currentIndex + 1]) {
                activeCombo.currentIndex++;
                activeCombo.lastSkillTime = currentTime;

                // 检查是否完成连招
                if (activeCombo.currentIndex === activeCombo.definition.requiredSkills.length - 1) {
                    // 应用连招效果
                    activeCombo.definition.comboEffect.apply(character, target, skill.getEffect());
                    this.activeCombos.delete(character);
                }
            } else {
                // 技能不匹配，重置连招
                this.activeCombos.delete(character);
            }
        } else {
            // 检查是否可以开始新的连招
            for (const definition of this.comboDefinitions) {
                if (skill === definition.requiredSkills[0]) {
                    this.activeCombos.set(character, {
                        definition,
                        currentIndex: 0,
                        lastSkillTime: currentTime
                    });
                    break;
                }
            }
        }
    }

    public getActiveCombo(character: Character): ComboDefinition | null {
        const activeCombo = this.activeCombos.get(character);
        return activeCombo ? activeCombo.definition : null;
    }

    public resetCombo(character: Character): void {
        this.activeCombos.delete(character);
    }
} 