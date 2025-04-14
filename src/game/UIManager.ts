import { AdvancedDynamicTexture, Rectangle, TextBlock, Button, Control, StackPanel } from "@babylonjs/gui";

export class UIManager {
    private advancedTexture: AdvancedDynamicTexture;
    private characterPanel!: Rectangle;
    private skillPanel!: Rectangle;
    private statusPanel!: Rectangle;

    constructor(canvas: HTMLCanvasElement) {
        // 创建高级动态纹理
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

        // 创建角色面板
        this.createCharacterPanel();
        
        // 创建技能面板
        this.createSkillPanel();

        // 创建状态面板
        this.createStatusPanel();
    }

    private createCharacterPanel(): void {
        // 创建角色面板
        this.characterPanel = new Rectangle("characterPanel");
        this.characterPanel.width = "200px";
        this.characterPanel.height = "300px";
        this.characterPanel.cornerRadius = 10;
        this.characterPanel.color = "white";
        this.characterPanel.thickness = 2;
        this.characterPanel.background = "#333333";
        this.characterPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.characterPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.advancedTexture.addControl(this.characterPanel);

        // 添加角色名称
        const nameText = new TextBlock("nameText", "角色名称");
        nameText.color = "white";
        nameText.fontSize = 20;
        nameText.top = 10;
        this.characterPanel.addControl(nameText);

        // 添加属性信息
        const attributesText = new TextBlock("attributesText", "属性信息");
        attributesText.color = "white";
        attributesText.fontSize = 16;
        attributesText.top = 40;
        this.characterPanel.addControl(attributesText);
    }

    private createStatusPanel(): void {
        // 创建状态面板
        this.statusPanel = new Rectangle("statusPanel");
        this.statusPanel.width = "200px";
        this.statusPanel.height = "100px";
        this.statusPanel.cornerRadius = 10;
        this.statusPanel.color = "white";
        this.statusPanel.thickness = 2;
        this.statusPanel.background = "#333333";
        this.statusPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.statusPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this.advancedTexture.addControl(this.statusPanel);

        // 创建血条
        const healthBar = new Rectangle("healthBar");
        healthBar.width = "180px";
        healthBar.height = "20px";
        healthBar.cornerRadius = 5;
        healthBar.color = "white";
        healthBar.thickness = 1;
        healthBar.background = "#ff0000";
        healthBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        healthBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        healthBar.top = 10;
        this.statusPanel.addControl(healthBar);

        // 创建内力条
        const manaBar = new Rectangle("manaBar");
        manaBar.width = "180px";
        manaBar.height = "20px";
        manaBar.cornerRadius = 5;
        manaBar.color = "white";
        manaBar.thickness = 1;
        manaBar.background = "#0000ff";
        manaBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        manaBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        manaBar.top = 40;
        this.statusPanel.addControl(manaBar);
    }

    private createSkillPanel(): void {
        // 创建技能面板
        this.skillPanel = new Rectangle("skillPanel");
        this.skillPanel.width = "400px";
        this.skillPanel.height = "100px";
        this.skillPanel.cornerRadius = 10;
        this.skillPanel.color = "white";
        this.skillPanel.thickness = 2;
        this.skillPanel.background = "#333333";
        this.skillPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.skillPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.advancedTexture.addControl(this.skillPanel);

        // 添加技能按钮
        for (let i = 0; i < 6; i++) {
            const skillButton = Button.CreateSimpleButton(`skillButton${i}`, `技能${i + 1}`);
            skillButton.width = "50px";
            skillButton.height = "50px";
            skillButton.color = "white";
            skillButton.background = "#666666";
            skillButton.left = `${i * 60 - 150}px`;
            this.skillPanel.addControl(skillButton);
        }
    }

    public updateCharacterInfo(name: string, attributes: any): void {
        const nameText = this.characterPanel.getChildByName("nameText") as TextBlock;
        const attributesText = this.characterPanel.getChildByName("attributesText") as TextBlock;

        if (nameText) {
            nameText.text = name;
        }

        if (attributesText) {
            let attributesStr = "";
            for (const [key, value] of Object.entries(attributes)) {
                attributesStr += `${key}: ${value}\n`;
            }
            attributesText.text = attributesStr;
        }
    }

    public updateStatus(health: number, maxHealth: number, mana: number, maxMana: number): void {
        const healthBar = this.statusPanel.getChildByName("healthBar") as Rectangle;
        const manaBar = this.statusPanel.getChildByName("manaBar") as Rectangle;

        if (healthBar) {
            healthBar.width = `${(health / maxHealth) * 180}px`;
        }

        if (manaBar) {
            manaBar.width = `${(mana / maxMana) * 180}px`;
        }
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }
} 