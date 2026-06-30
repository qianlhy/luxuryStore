(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/recycle/recycle"],{

/***/ 71:
/*!***************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/main.js?{"page":"pages%2Frecycle%2Frecycle"} ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _recycle = _interopRequireDefault(__webpack_require__(/*! ./pages/recycle/recycle.vue */ 72));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_recycle.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 72:
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./recycle.vue?vue&type=template&id=dd2cb7a4& */ 73);
/* harmony import */ var _recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recycle.vue?vue&type=script&lang=js& */ 75);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recycle.vue?vue&type=style&index=0&lang=css& */ 77);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/recycle/recycle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 73:
/*!***************************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=template&id=dd2cb7a4& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./recycle.vue?vue&type=template&id=dd2cb7a4& */ 74);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_template_id_dd2cb7a4___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 74:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=template&id=dd2cb7a4& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.cfg.tickers.length
  var g1 = _vm.currentSteps.length
  var g2 = _vm.cfg.faqs.length
  var g3 = _vm.cfg.reviews.length
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 75:
/*!*********************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./recycle.vue?vue&type=script&lang=js& */ 76);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 76:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var configApi = __webpack_require__(/*! ../../api/config */ 57);
var _require = __webpack_require__(/*! ../../utils/image */ 45),
  seedImage = _require.seedImage,
  resolveImage = _require.resolveImage;
var DEFAULT_CONFIG = {
  banner: seedImage('banner1.jpg'),
  tickers: [{
    text: '张** 卖出了 LV 手提包，收入 ￥***',
    date: '06-03'
  }, {
    text: '李** 寄售了 香奈儿 链条包，成交 ￥***',
    date: '06-05'
  }, {
    text: '王** 回收了 劳力士 腕表，到账 ￥***',
    date: '06-08'
  }],
  team: [{
    icon: '🧑‍🔬',
    title: '资深鉴定师',
    desc: '一对一服务，在线快速了解您的产品价值'
  }, {
    icon: '💼',
    title: '省心省力',
    desc: '售前0服务费，全程托管0费心，坐等收钱'
  }, {
    icon: '⚡',
    title: '快速见真伪',
    desc: '线上出价格交易成功，24小时极速到账'
  }],
  guardian: {
    title: '扫码加管家 回收价更高',
    desc: '长按图片识别二维码'
  },
  recycleSteps: ['咨询预约', '快递邮寄', '审核打款', '极速到账'],
  consignSteps: ['咨询预约', '上架寄售', '成交结算', '货款到账'],
  guaranteeText: '在白白叶叶抖音、微信、门店购买的订单，一年内85折兜底回收。\n例：售价8000元的包包，在购买日期一年内联系回收，8000×0.85=6800元。\n包包当前市场行情价低于6800，我们将启动85折兜底；高于6800元，将依照实际市场价格回收。',
  faqs: [{
    q: '回收/寄售完成后货款打到哪里？',
    a: '货款会打到您的钱包内，可随时申请提现，提现24小时内到账，请务必确保登记时提供的账号信息准确。'
  }, {
    q: '估价完成后一定会交易成功吗？',
    a: '因图片拍摄可能存在差异，收到货品后会进行实物质检并提供最终报价，实际交易以您的最终确认为准。'
  }, {
    q: '你们收到货后多久可以给我结果？',
    a: '快递签收后两个工作日内会有客服专员致电或短信告知质检结果，若低于预估价可退回商品，运费由我司承担。'
  }, {
    q: '为什么全新正品回收价格这么低？',
    a: '回收价格根据该商品当下二手市场行情给出，可作参考；不选择回收也可选择寄售，寄售价格相对较高。'
  }],
  reviews: [{
    name: 'Sie***',
    region: '北京',
    content: '整个回收过程非常顺利，估价合理，打款迅速。'
  }, {
    name: 'Lin***',
    region: '上海',
    content: '鉴定师很专业，沟通耐心，会推荐给朋友。'
  }]
};
var _default = {
  data: function data() {
    return {
      cfg: DEFAULT_CONFIG,
      qrcode: '',
      servicePhone: '400-888-9999',
      flowTab: 'recycle',
      openFaq: -1,
      showContact: false
    };
  },
  computed: {
    currentSteps: function currentSteps() {
      return this.flowTab === 'recycle' ? this.cfg.recycleSteps || [] : this.cfg.consignSteps || [];
    }
  },
  onLoad: function onLoad() {
    this.loadConfig();
  },
  methods: {
    loadConfig: function loadConfig() {
      var _this = this;
      configApi.getAll().then(function (map) {
        map = map || {};
        var parsed = {};
        if (map.recycle_config) {
          try {
            parsed = JSON.parse(map.recycle_config) || {};
          } catch (e) {
            parsed = {};
          }
        }
        var cfg = Object.assign({}, DEFAULT_CONFIG, parsed);
        cfg.guardian = Object.assign({}, DEFAULT_CONFIG.guardian, parsed.guardian || {});
        if (cfg.banner) cfg.banner = resolveImage(cfg.banner);
        _this.setData({
          cfg: cfg,
          servicePhone: map.service_phone || _this.servicePhone,
          qrcode: map.recycle_qrcode ? resolveImage(map.recycle_qrcode) : parsed.guardian && parsed.guardian.qrcode ? resolveImage(parsed.guardian.qrcode) : ''
        });
      }).catch(function () {});
    },
    switchFlow: function switchFlow(e) {
      this.setData({
        flowTab: e.currentTarget.dataset.tab
      });
    },
    toggleFaq: function toggleFaq(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        openFaq: this.openFaq === index ? -1 : index
      });
    },
    openContact: function openContact() {
      this.setData({
        showContact: true
      });
    },
    closeContact: function closeContact() {
      this.setData({
        showContact: false
      });
    },
    callPhone: function callPhone() {
      uni.makePhoneCall({
        phoneNumber: this.servicePhone
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 77:
/*!*****************************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./recycle.vue?vue&type=style&index=0&lang=css& */ 78);
/* harmony import */ var _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_A_new_start_HBuilderX_4_87_2025121004_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_recycle_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/2026年1月7日/卡歌/名品汇商城/Luxury-store-backend-sb_uni/Luxury-store-miniprogram_uni/pages/recycle/recycle.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[71,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/recycle/recycle.js.map