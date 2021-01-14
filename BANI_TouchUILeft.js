//=============================================================================
// タッチUIを左にする
// BANI_TouchUILeft.js v1.0.0
//=============================================================================
/*:
 * @target MZ
 * @plugindesc マップとバトル画面のメニューを左上に表示します。
 * @author Baniyama
 * @url https://baniyama.com/
 * @base BANI_TouchUILeft
 * *
 * @help BANI_TouchUILeft.js
 *
 * マップとバトル画面のメニューを左上に表示します。
 *
 * @param leftInputMode
 * @text タッチUI配置を左に配置
 * @desc タッチUI配置を左に配置
 * @default false
 * @type boolean
 */
 (() => {
   	"use strict";
   	const pluginName = "BANI_TouchUILeft";

    const parameters = PluginManager.parameters(pluginName);
    const leftInputMode = eval(parameters["leftInputMode"] || "true");

    //-----------------------------------------------------------------------------
    // Scene_Map
    //-----------------------------------------------------------------------------
    Scene_Map.prototype.createMenuButton = function() {
        this._menuButton = new Sprite_Button("menu");
        this._menuButton.x = leftInputMode ? 4 : Graphics.boxWidth - this._cancelButton.width - 4;
        this._menuButton.y = this.buttonY();
        this._menuButton.visible = false;
        this.addWindow(this._menuButton);
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //-----------------------------------------------------------------------------
    Scene_Battle.prototype.createCancelButton = function() {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.x = leftInputMode ? 4 : Graphics.boxWidth - this._cancelButton.width - 4;
        this._cancelButton.y = this.buttonY();
        this.addWindow(this._cancelButton);
    };

    //-----------------------------------------------------------------------------
    // Window_BattleStatus
    //-----------------------------------------------------------------------------
    Window_BattleStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const nameX = this.nameX(rect);
        const nameY = this.nameY(rect);
        const stateIconX = this.stateIconX(rect);
        const stateIconY = this.stateIconY(rect);
        const basicGaugesX = this.basicGaugesX(rect);
        const basicGaugesY = this.basicGaugesY(rect);
        this.placeTimeGauge(actor, nameX, nameY);
        this.placeStateIcon(actor, stateIconX, stateIconY);
        this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
    };

})();
