import { Attributes } from '../character/Attributes';
import { Character } from '../character/Character';

export enum EquipmentSlot {
    武器 = "武器",
    帽子 = "帽子",
    衣服 = "衣服",
    护腕 = "护腕",
    腰带 = "腰带",
    鞋子 = "鞋子",
    项链 = "项链",
    戒指 = "戒指",
    腰坠 = "腰坠"
}

export class Equipment {
    private name: string;
    private slot: EquipmentSlot;
    private attributes: Attributes;
    private level: number;
    private quality: number;

    constructor(name: string, slot: EquipmentSlot, attributes: Attributes, level: number = 1, quality: number = 1) {
        this.name = name;
        this.slot = slot;
        this.attributes = attributes;
        this.level = level;
        this.quality = quality;
    }

    public canEquip(character: Character): boolean {
        // 这里可以添加装备条件检查，比如等级要求、门派限制等
        return true;
    }

    public getSlot(): EquipmentSlot {
        return this.slot;
    }

    public getAttributes(): Attributes {
        return this.attributes;
    }
} 