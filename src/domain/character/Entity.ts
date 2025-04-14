import { UUID } from '../../core/utils/UUID';

export abstract class Entity {
    protected id: string;
    protected createdAt: Date;
    protected updatedAt: Date;
    protected name: string;
    protected level: number = 1;
    protected experience: number = 0;

    constructor(name: string) {
        this.id = UUID.generate();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.name = name;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getLevel(): number {
        return this.level;
    }

    public getExperience(): number {
        return this.experience;
    }

    public gainExperience(amount: number): void {
        this.experience += amount;
        this.checkLevelUp();
    }

    protected checkLevelUp(): void {
        const requiredExp = this.calculateRequiredExp();
        while (this.experience >= requiredExp) {
            this.levelUp();
        }
    }

    protected levelUp(): void {
        this.level++;
        this.experience -= this.calculateRequiredExp();
    }

    protected calculateRequiredExp(): number {
        return Math.pow(this.level, 2) * 1000;
    }

    protected updateTimestamp(): void {
        this.updatedAt = new Date();
    }
} 