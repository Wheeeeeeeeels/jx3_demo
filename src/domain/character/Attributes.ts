import { IAttributes } from './IAttributes';

export class Attributes implements IAttributes {
    体质: number = 10;
    根骨: number = 10;
    力道: number = 10;
    身法: number = 10;
    元气: number = 10;

    constructor() {}

    public get体质(): number {
        return this.体质;
    }

    public get根骨(): number {
        return this.根骨;
    }

    public get力道(): number {
        return this.力道;
    }

    public get身法(): number {
        return this.身法;
    }

    public get元气(): number {
        return this.元气;
    }

    public increaseByLevel(): void {
        this.体质 += 2;
        this.根骨 += 2;
        this.力道 += 2;
        this.身法 += 2;
        this.元气 += 2;
    }

    public reset(): void {
        this.体质 = 10;
        this.根骨 = 10;
        this.力道 = 10;
        this.身法 = 10;
        this.元气 = 10;
    }

    public addEquipmentBonus(attributes: Partial<IAttributes>): void {
        if (attributes.体质) this.体质 += attributes.体质;
        if (attributes.根骨) this.根骨 += attributes.根骨;
        if (attributes.力道) this.力道 += attributes.力道;
        if (attributes.身法) this.身法 += attributes.身法;
        if (attributes.元气) this.元气 += attributes.元气;
    }

    public getAttributes(): IAttributes {
        return {
            体质: this.体质,
            根骨: this.根骨,
            力道: this.力道,
            身法: this.身法,
            元气: this.元气
        };
    }
} 