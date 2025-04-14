import { Character } from '../character/Character';
import { BuffEffect, ActiveBuff } from './BuffEffect';
import { IAttributes } from '../character/IAttributes';

export class BuffManager {
    private activeBuffs: Map<string, ActiveBuff> = new Map();
    
    constructor(private character: Character) {}
    
    public addBuff(effect: BuffEffect): void {
        const existingBuff = this.activeBuffs.get(effect.name);
        
        if (existingBuff) {
            if (effect.stackable) {
                if (!effect.maxStacks || existingBuff.stacks < effect.maxStacks) {
                    existingBuff.stacks++;
                    this.applyBuffEffect(effect);
                }
            } else {
                existingBuff.startTime = Date.now();
            }
        } else {
            this.activeBuffs.set(effect.name, {
                effect,
                startTime: Date.now(),
                stacks: 1
            });
            this.applyBuffEffect(effect);
        }
    }
    
    public removeBuff(buffName: string): void {
        const buff = this.activeBuffs.get(buffName);
        if (buff) {
            this.removeBuffEffect(buff.effect);
            this.activeBuffs.delete(buffName);
        }
    }
    
    public update(currentTime: number): void {
        for (const [name, buff] of this.activeBuffs) {
            if (currentTime - buff.startTime >= buff.effect.duration) {
                this.removeBuff(name);
            }
        }
    }
    
    public getActiveBuffs(): ActiveBuff[] {
        return Array.from(this.activeBuffs.values());
    }
    
    private applyBuffEffect(effect: BuffEffect): void {
        if (effect.attributes) {
            const attributes = effect.attributes as Record<string, number>;
            this.character.applyBuffAttributes(attributes);
        }
    }
    
    private removeBuffEffect(effect: BuffEffect): void {
        if (effect.attributes) {
            const attributes = effect.attributes as Record<string, number>;
            const negativeAttributes: Record<string, number> = {};
            for (const key in attributes) {
                negativeAttributes[key] = -attributes[key];
            }
            this.character.applyBuffAttributes(negativeAttributes);
        }
    }
} 