import { Game } from "./game/Game";
import { Character } from "./domain/character/Character";
import { School } from "./domain/character/School";

// 等待DOM加载完成
window.addEventListener("DOMContentLoaded", async () => {
    // 获取画布元素
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    if (!canvas) {
        console.error("找不到画布元素");
        return;
    }

    // 创建游戏实例
    const game = new Game(canvas);

    // 创建角色
    const school = new School("纯阳");
    const character = new Character("测试角色", school);

    // 加载角色模型
    try {
        await game.createCharacter(character, "/assets/models/character.glb");
    } catch (error) {
        console.error("加载角色模型失败:", error);
    }
}); 