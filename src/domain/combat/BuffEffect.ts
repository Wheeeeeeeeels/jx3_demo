import { IAttributes } from "domain/character/IAttributes";

export interface BuffEffect {
    name: string;
    duration: number;
    effectType: BuffEffectType;
    attributes: Partial<IAttributes>;
    stackable: boolean;
    maxStacks?: number;
}

export enum BuffEffectType {
    增益 = "增益",
    减益 = "减益",
    控制 = "控制"
}

export interface ActiveBuff {
    effect: BuffEffect;
    startTime: number;
    stacks: number;
} 