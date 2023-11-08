/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extPrefix: () => (/* binding */ extPrefix),
/* harmony export */   key: () => (/* binding */ key),
/* harmony export */   trans: () => (/* binding */ trans)
/* harmony export */ });
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 统一前缀
 */
var extPrefix = 'imdong-visible-to-op-only';

/**
 * 获取一个 key
 * @param key
 */
function key(key) {
  return extPrefix + "." + key.replace(/^\.*/, '');
}

/**
 * 获取特定 key 的翻译
 * @param id
 * @param parameters
 */
function trans(id, parameters) {
  if (parameters === void 0) {
    parameters = {};
  }
  return flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans(key(id), parameters);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  extPrefix: extPrefix,
  key: key,
  trans: trans
});

/***/ }),

/***/ "./src/forum/addOnlyOpSeeBtnToTextEditeor.js":
/*!***************************************************!*\
  !*** ./src/forum/addOnlyOpSeeBtnToTextEditeor.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addOnlyOpSeeBtnToTextEditeor)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/TextEditor */ "flarum/common/components/TextEditor");
/* harmony import */ var flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/TextEditorButton */ "flarum/common/components/TextEditorButton");
/* harmony import */ var flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_styleSelectedText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/styleSelectedText */ "flarum/common/utils/styleSelectedText");
/* harmony import */ var flarum_common_utils_styleSelectedText__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_styleSelectedText__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");





var style = {
  prefix: '[OP]',
  suffix: '[/OP]',
  trimFirst: true
};
function addOnlyOpSeeBtnToTextEditeor() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_common_components_TextEditor__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'toolbarItems', function (items) {
    var _this = this;
    if (app.composer.body.attrs.discussion || app.composer.body.attrs.post) {
      items.add("only-op-see", m((flarum_common_components_TextEditorButton__WEBPACK_IMPORTED_MODULE_2___default()), {
        onclick: function onclick() {
          return flarum_common_utils_styleSelectedText__WEBPACK_IMPORTED_MODULE_3___default()(_this.attrs.composer.editor.el, style);
        },
        icon: "fas fa-user-shield"
      }, (0,_common__WEBPACK_IMPORTED_MODULE_4__.trans)("forum.button_tooltip_only_op_see")));
    }
  });
}

/***/ }),

/***/ "./src/forum/index.tsx":
/*!*****************************!*\
  !*** ./src/forum/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_ReplyComposer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/ReplyComposer */ "flarum/forum/components/ReplyComposer");
/* harmony import */ var flarum_forum_components_ReplyComposer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_ReplyComposer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");
/* harmony import */ var _renderOnlyOpSee__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderOnlyOpSee */ "./src/forum/renderOnlyOpSee.js");
/* harmony import */ var _addOnlyOpSeeBtnToTextEditeor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addOnlyOpSeeBtnToTextEditeor */ "./src/forum/addOnlyOpSeeBtnToTextEditeor.js");






flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add(_common__WEBPACK_IMPORTED_MODULE_3__.extPrefix, function () {
  // 添加按钮到工具栏
  (0,_addOnlyOpSeeBtnToTextEditeor__WEBPACK_IMPORTED_MODULE_5__["default"])();

  // 各种前端渲染
  (0,_renderOnlyOpSee__WEBPACK_IMPORTED_MODULE_4__["default"])();

  // 包含空结构就不要提交了
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.override)((flarum_forum_components_ReplyComposer__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'onsubmit', function (original, content) {
    if (/\[OP\]\s*\[\/OP\]/.test(content)) {
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().alerts.show({
        type: "error"
      }, (0,_common__WEBPACK_IMPORTED_MODULE_3__.trans)('forum.editor_empty_tips'));
      return false;
    }
    original();
  });
});

/***/ }),

/***/ "./src/forum/renderOnlyOpSee.js":
/*!**************************************!*\
  !*** ./src/forum/renderOnlyOpSee.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderOnlyOpSee)
/* harmony export */ });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/Post */ "flarum/common/models/Post");
/* harmony import */ var flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "./src/common/index.ts");



function onlyOpSee(innerHTML, canViewHidePosts) {
  return innerHTML.replace(/<onlyopsee>([\s\S]*?)<\/onlyopsee>/gi, function (full, text) {
    return render(canViewHidePosts, text);
  });
}
function render(canViewHidePosts, text) {
  var title = (0,_common__WEBPACK_IMPORTED_MODULE_2__.trans)(canViewHidePosts ? "forum.only_op_see" : 'forum.hidden_content_only_op_see');
  return "<div class=\"onlyopsee\" data-title-content=\"" + title + "\" >" + (text || "") + "</div>";
}
function renderOnlyOpSee() {
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.override)((flarum_common_models_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'contentHtml', function (original, content) {
    // 如果不能看见正文 就直接给拒绝文案
    if (!this.attribute('canViewPosts')) {
      return render(false);
    }

    // 否则替换正文
    return onlyOpSee(original(), this.attribute('canViewHidePosts'));
  });

  // 预览时
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__.override)(s9e.TextFormatter, 'preview', function (original, text, element) {
    original(text, element);
    element.innerHTML = onlyOpSee(element.innerHTML, true);
  });
}

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/TextEditor":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditor']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditor'];

/***/ }),

/***/ "flarum/common/components/TextEditorButton":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/TextEditorButton']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/TextEditorButton'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/models/Post":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/models/Post']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/models/Post'];

/***/ }),

/***/ "flarum/common/utils/styleSelectedText":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['common/utils/styleSelectedText']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/styleSelectedText'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/ReplyComposer":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/ReplyComposer']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/ReplyComposer'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extPrefix: () => (/* reexport safe */ _src_common__WEBPACK_IMPORTED_MODULE_0__.extPrefix),
/* harmony export */   key: () => (/* reexport safe */ _src_common__WEBPACK_IMPORTED_MODULE_0__.key),
/* harmony export */   trans: () => (/* reexport safe */ _src_common__WEBPACK_IMPORTED_MODULE_0__.trans)
/* harmony export */ });
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.tsx");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map