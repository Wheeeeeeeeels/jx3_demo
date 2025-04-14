import { Entity } from './Entity';
import { Attributes } from './Attributes';
import { School } from './School';
import { Equipment } from '../item/Equipment';
import { Skill } from '../combat/Skill';
import { Status } from './Status';
import { IAttributes } from './IAttributes';
import { IStatus } from './Status';
import { SkillManager } from '../combat/SkillManager';
import { BuffManager } from '../combat/BuffManager';
import { BuffEffect, ActiveBuff } from '../combat/BuffEffect';

export class Character extends Entity {
    private attributes: Attributes;
    private status: Status;
    private school: School;
    private equipment: Map<string, Equipment>;
    private skills: Map<string, Skill>;
    private buffs: Set<string>;
    private skillManager: SkillManager;
    private buffManager: BuffManager;

    constructor(name: string, school: School) {
        super(name);
        this.school = school;
        this.attributes = new Attributes();
        this.status = new Status();
        this.equipment = new Map();
        this.skills = new Map();
        this.buffs = new Set();
        this.skillManager = new SkillManager(this);
        this.buffManager = new BuffManager(this);
    }

    public gainExperience(amount: number): void {
        super.gainExperience(amount);
        this.updateTimestamp();
    }

    public equipItem(item: Equipment): boolean {
        if (item.canEquip(this)) {
            const slot = item.getSlot();
            this.unequipItem(slot);
            this.equipment.set(slot, item);
            this.updateAttributes();
            return true;
        }
        return false;
    }

    private updateAttributes(): void {
        // 重新计算所有属性（基础属性+装备加成+buff加成）
        this.attributes.reset();
        this.equipment.forEach(item => {
            this.attributes.addEquipmentBonus(item.getAttributes());
        });
        // 更新状态
        this.status.updateFromAttributes(this.attributes);
    }

    private unequipItem(slot: string): void {
        this.equipment.delete(slot);
    }

    public getAttributes(): IAttributes {
        return this.attributes.getAttributes();
    }

    public getStatus(): IStatus {
        return this.status.getStatus();
    }

    public consumeMana(amount: number): void {
        const currentStatus = this.status.getStatus();
        this.status.updateMana(Math.max(0, currentStatus.内力 - amount));
    }

    public takeDamage(damage: number): void {
        const currentStatus = this.status.getStatus();
        this.status.updateHealth(Math.max(0, currentStatus.气血 - damage));
    }

    public heal(amount: number): void {
        const currentStatus = this.status.getStatus();
        const maxHealth = this.attributes.体质 * 10;
        this.status.updateHealth(Math.min(maxHealth, currentStatus.气血 + amount));
    }

    public useSkill(skillName: string, target?: Character): boolean {
        return this.skillManager.useSkill(skillName, target);
    }

    public addSkill(skill: Skill): void {
        this.skillManager.addSkill(skill);
    }

    public applyBuffAttributes(attributes: Partial<IAttributes>): void {
        this.attributes.addEquipmentBonus(attributes);
        this.status.updateFromAttributes(this.attributes);
    }

    public addBuff(effect: BuffEffect): void {
        this.buffManager.addBuff(effect);
    }

    public removeBuff(buffName: string): void {
        this.buffManager.removeBuff(buffName);
    }

    public updateBuffs(currentTime: number): void {
        this.buffManager.update(currentTime);
    }

    public getActiveBuffs(): ActiveBuff[] {
        return this.buffManager.getActiveBuffs();
    }
} 