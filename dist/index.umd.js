!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react-form-reducer"),require("validatorjs")):"function"==typeof define&&define.amd?define(["exports","react-form-reducer","validatorjs"],t):t((e||self).reactFormReducerValidator={},e.reactFormReducer,e.validatorjs)}(this,function(e,t,r){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=/*#__PURE__*/o(r);function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}e.Resolver=/*#__PURE__*/function(e){var t,r;function o(t,r){var o;return(o=e.call(this)||this).rules=void 0,o.messages=void 0,o.rules=t,o.messages=r,a(o)||a(o)}return r=e,(t=o).prototype=Object.create(r.prototype),t.prototype.constructor=t,i(t,r),o.prototype.validate=function(e,t){var r=this.rules||{},o=e||{};if(t){o={};var i={};t.forEach(function(t){o[t]=null==e?void 0:e[t],r[t]&&(i[t]=r[t])}),r=i}var a=new n.default(o,r,this.messages);return!!a.passes()||a.errors.all()},o}(t.ValidationResolver)});
//# sourceMappingURL=index.umd.js.map
