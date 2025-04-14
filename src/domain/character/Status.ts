import { Attributes } from './Attributes';
import { IAttributes } from './IAttributes';

export class Status {
    private 气血: number = 100;
    private 内力: number = 100;
    private 体力: number = 100;
    private 当前经验值: number = 0;
    private 等级: number = 1;

    constructor() {}

    public updateFromAttributes(attributes: Attributes): void {
        this.气血 = attributes.体质 * 10;
        this.内力 = attributes.根骨 * 10;
    }

    public getStatus(): IStatus {
        return {
            气血: this.气血,
            内力: this.内力,
            体力: this.体力,
            当前经验值: this.当前经验值,
            等级: this.等级
        };
    }

    public updateHealth(newHealth: number): void {
        this.气血 = newHealth;
    }

    public updateMana(newMana: number): void {
        this.内力 = newMana;
    }
}

export interface IStatus {
    气血: number;
    内力: number;
    体力: number;
    当前经验值: number;
    等级: number;
} 