//=============================================================================
// マップ右に先頭キャラ表示
// BANI_MapPicture.js v1.0.0
//=============================================================================
/*:
 * @target MZ
 * @plugindesc マップ右に先頭キャラを表示します。
 * @author Baniyama
 * @url https://baniyama.com/
 * @base BANI_MapPicture
 * @orderAfter LL_MenuScreenBase
 *
 * @help BANI_MapPicture.js
 *
 * マップ右にパーティ先頭キャラを表示します。
 * 「LL_MenuScreenBase」で設定した立ち絵リストを参照します。
 *
 * @param mapWindowPictureX
 * @text X座標始点
 * @desc マップ画面に表示する立ち絵の表示位置(X)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param mapWindowPictureY
 * @text Y座標始点
 * @desc マップ画面に表示する立ち絵の表示位置(Y)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number

 * @param mapWindowPictureOpacity
 * @text 不透明度
 * @desc 立ち絵の不透明度(0～255)です。 (初期値: 160)
 * @type number
 * @default 160
 * @min 0
 * @max 255

 */
 (() => {
   	"use strict";
   	const pluginName = "BANI_MapPicture";

    const parameters = PluginManager.parameters(pluginName);
  	const mapWindowPictureX = Number(parameters["mapWindowPictureX"] || 0);
  	const mapWindowPictureY = Number(parameters["mapWindowPictureY"] || 0);
  	const mapWindowPictureOpacity = Number(parameters["mapWindowPictureOpacity"] || 160);

    //-----------------------------------------------------------------------------
    // Scene_Map
    //-----------------------------------------------------------------------------
    Scene_Map.prototype.createDisplayObjects = function() {
        this.createSpriteset();
        this.createMapPicture();
        this.createWindowLayer();
        this.createAllWindows();
        this.createButtons();
    };

    Scene_Map.prototype.createMapPicture = function() {
      // 先頭アクター取得
      let actor = $gameParty.members()[0];
  		if (this._mapStandingPicture) this._mapStandingPicture.bitmap = null;

  		// 立ち絵描画
  		let mPicture = ExMenuScreenBase.getImageName(actor._actorId);
  		if (mPicture) {
  			const x = mapWindowPictureX + Number(mPicture.x);
  			const y = mapWindowPictureY + Number(mPicture.y);
  			const scaleX = Number(mPicture.scaleX) / 100;
  			const scaleY = Number(mPicture.scaleY) / 100;
  			// ピンチ判定
  			if (ExMenuScreenBase.getHpRate(actor._actorId) > Number(mPicture.pinchPercentage) || !mPicture.pinchImageName) {
  				// 通常
  				this.drawMapStandingPicture(String(mPicture.imageName), x, y, scaleX, scaleY);
  			} else {
  				// ピンチ
  				this.drawMapStandingPicture(String(mPicture.pinchImageName), x, y, scaleX, scaleY);
  			}
  		}
  	};

    Scene_Map.prototype.drawMapStandingPicture = function(
  		imageName, x, y, scaleX, scaleY
  	) {
  		const spacing = 8;
  		this._mapStandingPicture = new Sprite();
  		this._mapStandingPicture.bitmap = ImageManager.loadPicture(imageName);
  		this._mapStandingPicture.x = x;
  		this._mapStandingPicture.y = y;
  		this._mapStandingPicture.scale.x = scaleX;
  		this._mapStandingPicture.scale.y = scaleY;

  		this._mapStandingPicture.opacity = mapWindowPictureOpacity;
  		this.addChild(this._mapStandingPicture);
  	};

})();
