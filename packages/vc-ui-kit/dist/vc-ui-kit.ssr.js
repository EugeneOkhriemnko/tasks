'use strict';var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
var script$b = {
  props: {
    icon: {
      type: String,
      default: "square-full"
    },
    family: {
      type: String,
      default: "solid"
    },
    size: {
      type: String,
      default: "m"
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__$b = script$b;
/* template */

var __vue_render__$d = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('i', {
    class: "vc-icon vc-icon_" + _vm.size + " fa" + _vm.family.toLowerCase()[0] + " fa-" + _vm.icon.toLowerCase()
  }, []);
};

var __vue_staticRenderFns__$d = [];
/* style */

var __vue_inject_styles__$d = undefined;
/* scoped */

var __vue_scope_id__$d = undefined;
/* module identifier */

var __vue_module_identifier__$d = "data-v-94c069b2";
/* functional template */

var __vue_is_functional_template__$d = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$d = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$d,
  staticRenderFns: __vue_staticRenderFns__$d
}, __vue_inject_styles__$d, __vue_script__$b, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, false, undefined, undefined, undefined);//
var script$a = {
  components: {
    VcIcon: __vue_component__$d
  },
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      internalValue: this.value
    };
  }
};/* script */
var __vue_script__$a = script$a;
/* template */

var __vue_render__$c = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-input vc-flex vc-flex-align_stretch",
    class: {
      'vc-input_clearable': _vm.clearable
    }
  }, [_vm._ssrNode("<input" + _vm._ssrAttr("placeholder", _vm.placeholder) + _vm._ssrAttr("value", _vm.internalValue) + " class=\"vc-input__field vc-flex-grow_1 vc-padding-left_m\"> "), _vm.clearable ? _vm._ssrNode("<div class=\"\n      vc-input__clear\n      vc-padding-horizontal_m\n      vc-flex\n      vc-flex-align_center\n    \">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": "times"
    }
  })], 1) : _vm._e()], 2);
};

var __vue_staticRenderFns__$c = [];
/* style */

var __vue_inject_styles__$c = undefined;
/* scoped */

var __vue_scope_id__$c = undefined;
/* module identifier */

var __vue_module_identifier__$c = "data-v-3318b5ae";
/* functional template */

var __vue_is_functional_template__$c = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$c = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$c,
  staticRenderFns: __vue_staticRenderFns__$c
}, __vue_inject_styles__$c, __vue_script__$a, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, false, undefined, undefined, undefined);//
var script$9 = {
  components: {
    VcIcon: __vue_component__$d
  },
  props: {
    items: {
      type: Array
    }
  }
};/* script */
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$b = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.items ? _c('div', {
    staticClass: "vc-breadcrumbs vc-flex vc-flex-align_center vc-flex-nowrap"
  }, [_vm._l(_vm.items, function (item, i) {
    return [_vm._ssrNode("<div" + _vm._ssrClass("vc-breadcrumbs__item vc-flex vc-flex-align_center", {
      'vc-breadcrumbs__item_disabled': item.disabled,
      'vc-breadcrumbs__item_current': i === _vm.items.length - 1
    }) + ">", "</div>", [item.icon ? _c('vc-icon', {
      staticClass: "vc-breadcrumbs__item-icon",
      attrs: {
        "icon": item.icon,
        "size": "s"
      }
    }) : _vm._e(), _vm._ssrNode(" <div class=\"vc-breadcrumbs__item-title\">" + _vm._ssrEscape(_vm._s(item.title)) + "</div>")], 2)];
  })], 2) : _vm._e();
};

var __vue_staticRenderFns__$b = [];
/* style */

var __vue_inject_styles__$b = undefined;
/* scoped */

var __vue_scope_id__$b = undefined;
/* module identifier */

var __vue_module_identifier__$b = "data-v-ae797f32";
/* functional template */

var __vue_is_functional_template__$b = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$b = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$9, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, false, undefined, undefined, undefined);//
var script$8 = {
  components: {
    VcIcon: __vue_component__$d,
    VcInput: __vue_component__$c,
    VcBreadcrumbs: __vue_component__$b
  },
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    width: {
      type: Number | String,
      default: 300
    },
    closable: {
      type: Boolean,
      default: true
    },
    toolbarItems: {
      type: Array
    },
    breadcrumbs: {
      type: Array
    },
    searchable: {
      type: Boolean
    },
    filterable: {
      type: Boolean
    }
  },
  data: function data() {
    return {
      expanded: false,
      filterOpened: false
    };
  }
};/* script */
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$a = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-blade",
    class: {
      'vc-blade_expanded': _vm.expanded
    },
    style: {
      width: _vm.width + "px"
    }
  }, [_vm._ssrNode("<div class=\"vc-blade__topbar vc-flex-shrink_0\">", "</div>", [_vm.expanded ? _vm._ssrNode("<div class=\"vc-blade__topbar-button\">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": "window-minimize",
      "size": "s"
    }
  })], 1) : _vm._ssrNode("<div class=\"vc-blade__topbar-button\">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": "window-maximize",
      "size": "s"
    }
  })], 1), _vm._ssrNode(" "), _vm._ssrNode("<div" + _vm._ssrClass("vc-blade__topbar-button", {
    'vc-blade__topbar-button_disabled': !_vm.closable
  }) + ">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": "times"
    }
  })], 1)], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vc-blade__header vc-flex-shrink_0\">", "</div>", [_vm._ssrNode("<div class=\"vc-blade__header-icon\">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": _vm.icon,
      "size": "xxl"
    }
  })], 1), _vm._ssrNode(" <div class=\"vc-blade__header-info\"><div" + _vm._ssrClass("vc-blade__header-title", {
    'vc-blade__header-title_only': !_vm.subtitle
  }) + ">" + _vm._ssrEscape("\n        " + _vm._s(_vm.title) + "\n      ") + "</div> " + (_vm.subtitle ? "<div class=\"vc-blade__header-subtitle\">" + _vm._ssrEscape("\n        " + _vm._s(_vm.subtitle) + "\n      ") + "</div>" : "<!---->") + "</div>")], 2), _vm._ssrNode(" "), _vm.toolbarItems ? _vm._ssrNode("<div class=\"vc-blade__toolbar vc-flex-shrink_0\">", "</div>", [_vm._l(_vm.toolbarItems, function (item) {
    return [_vm._ssrNode("<div" + _vm._ssrClass("vc-blade__toolbar-item", {
      'vc-blade__toolbar-item_disabled': item.disabled
    }) + ">", "</div>", [_c('vc-icon', {
      attrs: {
        "icon": item.icon,
        "size": "ss"
      }
    }), _vm._ssrNode(" <div class=\"vc-blade__toolbar-item-title\">" + _vm._ssrEscape(_vm._s(item.title)) + "</div>")], 2)];
  })], 2) : _vm._e(), _vm._ssrNode(" "), _vm.breadcrumbs ? _c('vc-breadcrumbs', {
    staticClass: "vc-padding_l vc-padding-bottom_none vc-flex-shrink_0",
    attrs: {
      "items": _vm.breadcrumbs
    }
  }) : _vm._e(), _vm._ssrNode(" "), _vm.searchable || _vm.filterable ? _vm._ssrNode("<div class=\"\n      vc-blade__searchbar\n      vc-flex\n      vc-flex-align_center\n      vc-fill_width\n      vc-padding_l\n      vc-flex-shrink_0\n    \">", "</div>", [_vm.filterable ? _vm._ssrNode("<div class=\"vc-blade__searchbar-filter vc-margin-right_l\">", "</div>", [_vm._ssrNode("<div class=\"\n          vc-blade__searchbar-filter-toggler\n          vc-flex vc-flex-align-center\n        \">", "</div>", [_vm._ssrNode("<div class=\"vc-blade__searchbar-filter-label\">Select filter</div> "), _c('vc-icon', {
    staticClass: "vc-blade__searchbar-filter-chevron vc-margin-left_s",
    attrs: {
      "icon": _vm.filterOpened ? 'caret-up' : 'caret-down',
      "size": "s"
    }
  })], 2), _vm._ssrNode(" " + (_vm.filterOpened ? "<div class=\"vc-blade__searchbar-filter-menu\"><div class=\"vc-blade__searchbar-filter-menu-item\">\n          Item 1\n        </div> <div class=\"vc-blade__searchbar-filter-menu-item\">\n          Item 2\n        </div> <div class=\"vc-blade__searchbar-filter-menu-item\">\n          Item 3\n        </div></div>" : "<!---->"))], 2) : _vm._e(), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vc-blade__searchbar-search vc-flex-grow_1\">", "</div>", [_c('vc-input', {
    attrs: {
      "placeholder": "Search keywords",
      "clearable": "clearable"
    }
  })], 1), _vm._ssrNode(" " + (_vm.filterable ? "<div class=\"vc-blade__searchbar-counter vc-margin-left_l\"><span class=\"vc-blade__searchbar-counter-label\">Count:</span> <span class=\"vc-blade__searchbar-counter-value\">5</span></div>" : "<!---->"))], 2) : _vm._e(), _vm._ssrNode(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$a = [];
/* style */

var __vue_inject_styles__$a = undefined;
/* scoped */

var __vue_scope_id__$a = undefined;
/* module identifier */

var __vue_module_identifier__$a = "data-v-c70aa040";
/* functional template */

var __vue_is_functional_template__$a = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$a = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$8, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);//
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
var script$7 = {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    variant: {
      type: String,
      enum: ["primary", "secondary", "special"],
      default: "primary"
    },
    disabled: {
      type: Boolean
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};/* script */
var __vue_script__$7 = script$7;
/* template */

var __vue_render__$9 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-button",
    class: ["vc-button_" + _vm.variant, {
      'vc-button_disabled': _vm.disabled,
      'vc-button_small': _vm.small
    }]
  }, [_vm._ssrNode((_vm.icon ? "<i class=\"vc-button__icon\"></i>" : "<!---->") + " " + (_vm.title ? "<div class=\"vc-button__title\">" + _vm._ssrEscape(_vm._s(_vm.title)) + "</div>" : "<!---->"))]);
};

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = undefined;
/* module identifier */

var __vue_module_identifier__$9 = "data-v-6c3718fc";
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$7, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
var script$6 = {
  props: {
    checked: {
      type: Boolean
    }
  }
};/* script */
var __vue_script__$6 = script$6;
/* template */

var __vue_render__$8 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-checkbox"
  }, [_vm._ssrNode("<label class=\"vc-checkbox__label\"><input type=\"checkbox\" class=\"vc-checkbox__input\"> <span class=\"vc-checkbox__checkmark\"></span></label>")]);
};

var __vue_staticRenderFns__$8 = [];
/* style */

var __vue_inject_styles__$8 = undefined;
/* scoped */

var __vue_scope_id__$8 = undefined;
/* module identifier */

var __vue_module_identifier__$8 = "data-v-16b1cfc5";
/* functional template */

var __vue_is_functional_template__$8 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$6, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);/* script */

/* template */
var __vue_render__$7 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-container"
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = "data-v-0f3b297a";
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, {}, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);//
var script$5 = {
  components: {
    VcIcon: __vue_component__$d
  },
  props: {
    sticky: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    to: {
      type: String
    }
  }
};/* script */
var __vue_script__$5 = script$5;
/* template */

var __vue_render__$6 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c(_vm.to ? 'a' : 'div', {
    tag: "component",
    staticClass: "vc-drawer-item",
    attrs: {
      "href": _vm.to
    },
    on: {
      "click": function click($event) {
        return _vm.$emit('click');
      }
    }
  }, [_c('div', {
    staticClass: "vc-drawer-item__handler",
    class: {
      'vc-drawer-item__handler_enabled': !_vm.sticky
    }
  }, [_c('vc-icon', {
    attrs: {
      "icon": "ellipsis-v",
      "size": "m"
    }
  })], 1), _vm._v(" "), _vm.icon ? _c('div', {
    staticClass: "vc-drawer-item__icon"
  }, [_c('vc-icon', {
    attrs: {
      "icon": _vm.icon,
      "size": "m"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vc-drawer-item__title",
    attrs: {
      "title": _vm.title
    }
  }, [_vm._v(_vm._s(_vm.title))])]);
};

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = undefined;
/* scoped */

var __vue_scope_id__$6 = undefined;
/* module identifier */

var __vue_module_identifier__$6 = "data-v-1872522e";
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$5, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);//
var script$4 = {
  components: {
    VcDrawerItem: __vue_component__$6
  }
};/* script */
var __vue_script__$4 = script$4;
/* template */

var __vue_render__$5 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-drawer-toggler",
    on: {
      "click": function click($event) {
        return _vm.$emit('click');
      }
    }
  }, [_c('vc-drawer-item', {
    attrs: {
      "sticky": "sticky",
      "icon": "bars"
    }
  })], 1);
};

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = undefined;
/* scoped */

var __vue_scope_id__$5 = undefined;
/* module identifier */

var __vue_module_identifier__$5 = "data-v-6f1791a6";
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$4, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);//
var script$3 = {
  components: {
    VcDrawerItem: __vue_component__$6,
    VcDrawerToggler: __vue_component__$5,
    VcContainer: __vue_component__$7
  },
  props: {
    logo: {
      type: String
    },
    version: {
      type: String
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      collapsed: false
    };
  },
  methods: {
    toggleCollapsed: function toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit(this.collapsed ? "collapse" : "expand");
    }
  }
};/* script */
var __vue_script__$3 = script$3;
/* template */

var __vue_render__$4 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-drawer",
    class: {
      'vc-drawer_collapsed': _vm.collapsed
    }
  }, [_vm._ssrNode("<div class=\"vc-drawer__top\"><div class=\"vc-drawer__top-image\"" + _vm._ssrStyle(null, {
    'background-image': "url(" + _vm.logo + ")"
  }, null) + "></div> <div class=\"vc-drawer__top-version\">" + _vm._ssrEscape(_vm._s(_vm.version)) + "</div></div> "), _c('vc-drawer-toggler', {
    on: {
      "click": function click($event) {
        return _vm.toggleCollapsed();
      }
    }
  }), _vm._ssrNode(" "), _c('vc-container', {
    staticClass: "vc-drawer__content"
  }, [_c('vc-drawer-item', {
    attrs: {
      "icon": "home",
      "to": "/",
      "sticky": "sticky",
      "title": "Home"
    }
  }), _vm._v(" "), _vm._l(_vm.items, function (item) {
    return _c('vc-drawer-item', {
      key: item.id,
      attrs: {
        "icon": item.icon,
        "title": item.title
      },
      on: {
        "click": function click($event) {
          return _vm.$emit('itemClick', item);
        }
      }
    });
  }), _vm._v(" "), _c('vc-drawer-item', {
    attrs: {
      "icon": "ellipsis-h",
      "sticky": "sticky",
      "title": "More"
    }
  })], 2)], 2);
};

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = "data-v-4e26477c";
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$3, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);/* script */

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-spacer"
  }, []);
};

var __vue_staticRenderFns__$3 = [];
/* style */

var __vue_inject_styles__$3 = undefined;
/* scoped */

var __vue_scope_id__$3 = undefined;
/* module identifier */

var __vue_module_identifier__$3 = "data-v-6831c661";
/* functional template */

var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {}, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
var script$2 = {
  components: {
    VcIcon: __vue_component__$d,
    VcSpacer: __vue_component__$3
  },
  props: {
    toolbarItems: {
      type: Array
    },
    account: {
      type: Object
    }
  },
  data: function data() {
    return {
      accountMenuVisible: false
    };
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-layout vc-flex vc-fill_all"
  }, [_vm._ssrNode("<div class=\"vc-fill_height\">", "</div>", [_vm._t("left")], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vc-flex vc-flex-grow_1 vc-flex-column\">", "</div>", [_vm._ssrNode("<div class=\"\n        vc-layout__topbar\n        vc-flex\n        vc-fill_width\n        vc-flex-align_stretch\n        vc-flex-shrink_0\n      \">", "</div>", [_vm.$slots['banner'] ? _vm._ssrNode("<div class=\"vc-layout__topbar-banner\">", "</div>", [_vm._t("banner")], 2) : _vm._e(), _vm._ssrNode(" "), _vm.$slots['notification'] ? _vm._ssrNode("<div class=\"vc-layout__topbar-notification\">", "</div>", [_vm._t("notification")], 2) : _c('vc-spacer'), _vm._ssrNode(" "), _vm.toolbarItems ? _vm._ssrNode("<div class=\"vc-layout__topbar-toolbar vc-flex\">", "</div>", _vm._l(_vm.toolbarItems, function (item) {
    return _vm._ssrNode("<div" + _vm._ssrAttr("title", item.title) + _vm._ssrClass("\n            vc-layout__topbar-toolbar-item\n            vc-flex\n            vc-flex-align_center\n            vc-fill_height\n            vc-flex-justify_center\n          ", {
      'vc-layout__topbar-toolbar-item_accent': item.accent
    }) + ">", "</div>", [_c('vc-icon', {
      attrs: {
        "icon": typeof item.icon === 'function' ? item.icon() : item.icon,
        "size": "xl"
      }
    })], 1);
  }), 0) : _vm._e(), _vm._ssrNode(" "), _vm.account ? _vm._ssrNode("<div" + _vm._ssrClass("\n          vc-layout__topbar-account\n          vc-flex\n          vc-flex-shrink_0\n          vc-flex-align_center\n        ", {
    'vc-layout__topbar-account_active': _vm.accountMenuVisible
  }) + ">", "</div>", [_vm._ssrNode("<div class=\"vc-layout__topbar-account-avatar\"" + _vm._ssrStyle(null, {
    'background-image': "url(" + _vm.account.avatar + ")"
  }, null) + "></div> <div class=\"vc-flex-grow_1 vc-margin-left_m\"><div class=\"vc-layout__topbar-account-name\">" + _vm._ssrEscape(_vm._s(_vm.account.name)) + "</div> <div class=\"vc-layout__topbar-account-role\">" + _vm._ssrEscape(_vm._s(_vm.account.role)) + "</div></div> "), _vm._ssrNode("<div class=\"vc-layout__topbar-account-chevron\">", "</div>", [_c('vc-icon', {
    attrs: {
      "icon": "chevron-down",
      "size": "xl"
    }
  })], 1), _vm._ssrNode(" " + (_vm.accountMenuVisible ? "<div class=\"vc-layout__topbar-account-menu\"><div class=\"vc-layout__topbar-account-menu-item\">Profile</div> <div class=\"vc-layout__topbar-account-menu-item\">Log Out</div></div>" : "<!---->"))], 2) : _vm._e()], 2), _vm._ssrNode(" "), _vm._ssrNode("<div class=\"vc-layout__content vc-flex vc-flex-grow_1\">", "</div>", [_vm._t("default")], 2)], 2)], 2);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = undefined;
/* scoped */

var __vue_scope_id__$2 = undefined;
/* module identifier */

var __vue_module_identifier__$2 = "data-v-e3eaf7e8";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);//
//
//
//
//
//
var script$1 = {
  props: {
    to: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('a', {
    staticClass: "vc-link",
    class: {
      'vc-link_disabled': _vm.disabled
    },
    attrs: {
      "href": _vm.to
    }
  }, [_vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-c544c084";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);//
var script = {
  components: {
    VcIcon: __vue_component__$d,
    VcCheckbox: __vue_component__$8
  },
  props: {
    headers: {
      type: Array
    },
    items: {
      type: Array
    },
    sortable: {
      type: Array
    },
    multiselect: {
      type: Boolean
    }
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "vc-table-wrapper"
  }, [_vm._ssrNode("<table" + _vm._ssrClass("vc-table vc-fill_width", {
    'vc-table_empty': !_vm.items || !_vm.items.length,
    'vc-table_multiselect': _vm.multiselect
  }) + ">", "</table>", [_vm.headers ? _vm._ssrNode("<thead class=\"vc-table__header\">", "</thead>", [_vm._ssrNode("<tr class=\"vc-table__header-row\">", "</tr>", [_vm.multiselect ? _vm._ssrNode("<td width=\"32\" class=\"vc-table__header-cell\">", "</td>", [_vm._ssrNode("<div class=\"vc-flex vc-flex-justify_center vc-flex-align_center\">", "</div>", [_c('vc-checkbox')], 1)]) : _vm._e(), _vm._ssrNode(" "), _vm._l(_vm.headers, function (item) {
    return _vm._ssrNode("<td" + _vm._ssrAttr("width", item.width) + " class=\"vc-table__header-cell vc-padding-horizontal_m\">", "</td>", [_vm._ssrNode("<div" + _vm._ssrClass("vc-flex vc-flex-align_center vc-flex-nowrap", "vc-flex-justify_" + (item.align || 'start')) + ">", "</div>", [_vm._ssrNode("<div>", "</div>", [_vm._t("header_" + item.id, [_vm._v(_vm._s(item.title))])], 2), _vm._ssrNode(" "), item.sortable ? _vm._ssrNode("<div class=\"vc-table__header-cell_sort vc-margin-left_xs\">", "</div>", [_c('vc-icon', {
      attrs: {
        "size": "xs",
        "icon": "caret-up"
      }
    })], 1) : _vm._e()], 2)]);
  })], 2)]) : _vm._e(), _vm._ssrNode(" "), _vm.items ? _vm._ssrNode("<tbody class=\"vc-table__body\">", "</tbody>", _vm._l(_vm.items, function (item) {
    return _vm._ssrNode("<tr class=\"vc-table__body-row\">", "</tr>", [_vm.multiselect ? _vm._ssrNode("<td width=\"20\" class=\"vc-table__body-cell vc-table__body-cell_bordered\">", "</td>", [_vm._ssrNode("<div class=\"vc-flex vc-flex-justify_center vc-flex-align_center\">", "</div>", [_c('vc-checkbox')], 1)]) : _vm._e(), _vm._ssrNode(" "), _vm._l(_vm.headers, function (cell) {
      return _vm._ssrNode("<td" + _vm._ssrAttr("width", cell.width) + _vm._ssrClass("vc-table__body-cell vc-padding-horizontal_m", cell.class) + ">", "</td>", [_vm._ssrNode("<div class=\"vc-flex vc-flex-align_center\">", "</div>", [_vm._t("item_" + cell.id, [_vm._v(_vm._s(item[cell.id]))], {
        "item": item
      })], 2)]);
    })], 2);
  }), 0) : _vm._e()], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-0c5f5d6a";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,VcBlade: __vue_component__$a,VcBreadcrumbs: __vue_component__$b,VcButton: __vue_component__$9,VcCheckbox: __vue_component__$8,VcContainer: __vue_component__$7,VcDrawerItem: __vue_component__$6,VcDrawerToggler: __vue_component__$5,VcDrawer: __vue_component__$4,VcIcon: __vue_component__$d,VcInput: __vue_component__$c,VcLayout: __vue_component__$2,VcLink: __vue_component__$1,VcSpacer: __vue_component__$3,VcTable: __vue_component__});var toString = function (x) { return Object.prototype.toString.call(x); };
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' &&
    isNative(Symbol) &&
    typeof Reflect !== 'undefined' &&
    isNative(Reflect.ownKeys);
var noopFn = function (_) { return _; };
function proxy(target, key, _a) {
    var get = _a.get, set = _a.set;
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: get || noopFn,
        set: set || noopFn,
    });
}
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}
function hasOwn(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
function isArray(x) {
    return Array.isArray(x);
}
function isObject(val) {
    return val !== null && typeof val === 'object';
}
function isPlainObject(x) {
    return toString(x) === '[object Object]';
}
function isFunction(x) {
    return typeof x === 'function';
}
function warn$1(msg, vm) {
    Vue__default['default'].util.warn(msg, vm);
}

var vueDependency = undefined;
try {
    var requiredVue = require('vue');
    if (requiredVue && isVue(requiredVue)) {
        vueDependency = requiredVue;
    }
    else if (requiredVue &&
        'default' in requiredVue &&
        isVue(requiredVue.default)) {
        vueDependency = requiredVue.default;
    }
}
catch (_a) {
    // not available
}
var vueConstructor = null;
var currentInstance = null;
var PluginInstalledFlag = '__composition_api_installed__';
function isVue(obj) {
    return obj && typeof obj === 'function' && obj.name === 'Vue';
}
function isVueRegistered(Vue) {
    return hasOwn(Vue, PluginInstalledFlag);
}
function getVueConstructor() {
    return vueConstructor;
}
// returns registered vue or `vue` dependency
function getRegisteredVueOrDefault() {
    var constructor = vueConstructor || vueDependency;
    return constructor;
}
function setVueConstructor(Vue) {
    vueConstructor = Vue;
    Object.defineProperty(Vue, PluginInstalledFlag, {
        configurable: true,
        writable: true,
        value: true,
    });
}
function setCurrentInstance(vm) {
    // currentInstance?.$scopedSlots
    currentInstance = vm;
}
function getCurrentVue2Instance() {
    return currentInstance;
}
function getCurrentInstance() {
    if (currentInstance) {
        return toVue3ComponentInstance(currentInstance);
    }
    return null;
}
var instanceMapCache = new WeakMap();
function toVue3ComponentInstance(vue2Instance) {
    if (instanceMapCache.has(vue2Instance)) {
        return instanceMapCache.get(vue2Instance);
    }
    var instance = {
        proxy: vue2Instance,
        update: vue2Instance.$forceUpdate,
        uid: vue2Instance._uid,
        // $emit is defined on prototype and it expected to be bound
        emit: vue2Instance.$emit.bind(vue2Instance),
        parent: null,
        root: null,
    };
    // map vm.$props =
    var instanceProps = [
        'data',
        'props',
        'attrs',
        'refs',
        'vnode',
        'slots',
    ];
    instanceProps.forEach(function (prop) {
        proxy(instance, prop, {
            get: function () {
                return vue2Instance["$" + prop];
            },
        });
    });
    proxy(instance, 'isMounted', {
        get: function () {
            // @ts-expect-error private api
            return vue2Instance._isMounted;
        },
    });
    proxy(instance, 'isUnmounted', {
        get: function () {
            // @ts-expect-error private api
            return vue2Instance._isDestroyed;
        },
    });
    proxy(instance, 'isDeactivated', {
        get: function () {
            // @ts-expect-error private api
            return vue2Instance._inactive;
        },
    });
    proxy(instance, 'emitted', {
        get: function () {
            // @ts-expect-error private api
            return vue2Instance._events;
        },
    });
    instanceMapCache.set(vue2Instance, instance);
    if (vue2Instance.$parent) {
        instance.parent = toVue3ComponentInstance(vue2Instance.$parent);
    }
    if (vue2Instance.$root) {
        instance.root = toVue3ComponentInstance(vue2Instance.$root);
    }
    return instance;
}
function defineComponentInstance(Ctor, options) {
    if (options === void 0) { options = {}; }
    var silent = Ctor.config.silent;
    Ctor.config.silent = true;
    var vm = new Ctor(options);
    Ctor.config.silent = silent;
    return vm;
}
function isComponentInstance(obj) {
    var Vue = getVueConstructor();
    return Vue && obj instanceof Vue;
}
function createSlotProxy(vm, slotName) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!vm.$scopedSlots[slotName]) {
            return warn$1("slots." + slotName + "() got called outside of the \"render()\" scope", vm);
        }
        return vm.$scopedSlots[slotName].apply(vm, args);
    };
}
function resolveSlots(slots, normalSlots) {
    var res;
    if (!slots) {
        res = {};
    }
    else if (slots._normalized) {
        // fast path 1: child component re-render only, parent did not change
        return slots._normalized;
    }
    else {
        res = {};
        for (var key in slots) {
            if (slots[key] && key[0] !== '$') {
                res[key] = true;
            }
        }
    }
    // expose normal slots on scopedSlots
    for (var key in normalSlots) {
        if (!(key in res)) {
            res[key] = true;
        }
    }
    return res;
}
var vueInternalClasses;
var getVueInternalClasses = function () {
    if (!vueInternalClasses) {
        var vm = defineComponentInstance(getVueConstructor(), {
            computed: {
                value: function () {
                    return 0;
                },
            },
        });
        // to get Watcher class
        var Watcher = vm._computedWatchers.value.constructor;
        // to get Dep class
        var Dep = vm._data.__ob__.dep.constructor;
        vueInternalClasses = {
            Watcher: Watcher,
            Dep: Dep,
        };
        vm.$destroy();
    }
    return vueInternalClasses;
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
// must be a string, symbol key is ignored in reactive
var RefKey = 'composition-api.refKey';

var accessModifiedSet = new WeakMap();
var readonlySet = new WeakMap();

var RefImpl = /** @class */ (function () {
    function RefImpl(_a) {
        var get = _a.get, set = _a.set;
        proxy(this, 'value', {
            get: get,
            set: set,
        });
    }
    return RefImpl;
}());
function createRef(options, readonly) {
    var r = new RefImpl(options);
    // seal the ref, this could prevent ref from being observed
    // It's safe to seal the ref, since we really shouldn't extend it.
    // related issues: #79
    var sealed = Object.seal(r);
    readonlySet.set(sealed, true);
    return sealed;
}
function ref(raw) {
    var _a;
    if (isRef(raw)) {
        return raw;
    }
    var value = reactive((_a = {}, _a[RefKey] = raw, _a));
    return createRef({
        get: function () { return value[RefKey]; },
        set: function (v) { return (value[RefKey] = v); },
    });
}
function isRef(value) {
    return value instanceof RefImpl;
}
function toRefs(obj) {
    if (!isPlainObject(obj))
        return obj;
    var ret = {};
    for (var key in obj) {
        ret[key] = toRef(obj, key);
    }
    return ret;
}
function toRef(object, key) {
    var v = object[key];
    if (isRef(v))
        return v;
    return createRef({
        get: function () { return object[key]; },
        set: function (v) { return (object[key] = v); },
    });
}

function isRaw(obj) {
    var _a;
    return Boolean((obj === null || obj === void 0 ? void 0 : obj.__ob__) && ((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a.__raw__));
}
function isReactive(obj) {
    var _a;
    return Boolean((obj === null || obj === void 0 ? void 0 : obj.__ob__) && !((_a = obj.__ob__) === null || _a === void 0 ? void 0 : _a.__raw__));
}
/**
 * Proxing property access of target.
 * We can do unwrapping and other things here.
 */
function setupAccessControl(target) {
    if (!isPlainObject(target) ||
        isRaw(target) ||
        Array.isArray(target) ||
        isRef(target) ||
        isComponentInstance(target) ||
        accessModifiedSet.has(target))
        return;
    accessModifiedSet.set(target, true);
    var keys = Object.keys(target);
    for (var i = 0; i < keys.length; i++) {
        defineAccessControl(target, keys[i]);
    }
}
/**
 * Auto unwrapping when access property
 */
function defineAccessControl(target, key, val) {
    if (key === '__ob__')
        return;
    if (isRaw(target[key]))
        return;
    var getter;
    var setter;
    var property = Object.getOwnPropertyDescriptor(target, key);
    if (property) {
        if (property.configurable === false) {
            return;
        }
        getter = property.get;
        setter = property.set;
        if ((!getter || setter) /* not only have getter */ &&
            arguments.length === 2) {
            val = target[key];
        }
    }
    setupAccessControl(val);
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function getterHandler() {
            var value = getter ? getter.call(target) : val;
            // if the key is equal to RefKey, skip the unwrap logic
            if (key !== RefKey && isRef(value)) {
                return value.value;
            }
            else {
                return value;
            }
        },
        set: function setterHandler(newVal) {
            if (getter && !setter)
                return;
            var value = getter ? getter.call(target) : val;
            // If the key is equal to RefKey, skip the unwrap logic
            // If and only if "value" is ref and "newVal" is not a ref,
            // the assignment should be proxied to "value" ref.
            if (key !== RefKey && isRef(value) && !isRef(newVal)) {
                value.value = newVal;
            }
            else if (setter) {
                setter.call(target, newVal);
            }
            else {
                val = newVal;
            }
            setupAccessControl(newVal);
        },
    });
}
function observe(obj) {
    var Vue = getRegisteredVueOrDefault();
    var observed;
    if (Vue.observable) {
        observed = Vue.observable(obj);
    }
    else {
        var vm = defineComponentInstance(Vue, {
            data: {
                $$state: obj,
            },
        });
        observed = vm._data.$$state;
    }
    // in SSR, there is no __ob__. Mock for reactivity check
    if (!hasOwn(observed, '__ob__')) {
        def(observed, '__ob__', mockObserver(observed));
    }
    return observed;
}
function createObserver() {
    return observe({}).__ob__;
}
function mockObserver(value) {
    if (value === void 0) { value = {}; }
    return {
        value: value,
        dep: {
            notify: noopFn,
            depend: noopFn,
            addSub: noopFn,
            removeSub: noopFn,
        },
    };
}
/**
 * Make obj reactivity
 */
function reactive(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    if (!(isPlainObject(obj) || isArray(obj)) ||
        isRaw(obj) ||
        !Object.isExtensible(obj)) {
        return obj;
    }
    var observed = observe(obj);
    setupAccessControl(observed);
    return observed;
}

// implement
function computed(getterOrOptions) {
    var _a;
    var vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
    var getter;
    var setter;
    if (typeof getterOrOptions === 'function') {
        getter = getterOrOptions;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    var computedSetter;
    var computedGetter;
    if (vm && !vm.$isServer) {
        var _b = getVueInternalClasses(), Watcher_1 = _b.Watcher, Dep_1 = _b.Dep;
        var watcher_1;
        computedGetter = function () {
            if (!watcher_1) {
                watcher_1 = new Watcher_1(vm, getter, noopFn, { lazy: true });
            }
            if (watcher_1.dirty) {
                watcher_1.evaluate();
            }
            if (Dep_1.target) {
                watcher_1.depend();
            }
            return watcher_1.value;
        };
        computedSetter = function (v) {
            if (setter) {
                setter(v);
            }
        };
    }
    else {
        // fallback
        var computedHost_1 = defineComponentInstance(getVueConstructor(), {
            computed: {
                $$state: {
                    get: getter,
                    set: setter,
                },
            },
        });
        vm && vm.$on('hook:destroyed', function () { return computedHost_1.$destroy(); });
        computedGetter = function () { return computedHost_1.$$state; };
        computedSetter = function (v) {
            computedHost_1.$$state = v;
        };
    }
    return createRef({
        get: computedGetter,
        set: computedSetter,
    });
}

function set(vm, key, value) {
    var state = (vm.__composition_api_state__ =
        vm.__composition_api_state__ || {});
    state[key] = value;
}
function get(vm, key) {
    return (vm.__composition_api_state__ || {})[key];
}
var vmStateManager = {
    set: set,
    get: get,
};

function asVmProperty(vm, propName, propValue) {
    var props = vm.$options.props;
    if (!(propName in vm) && !(props && hasOwn(props, propName))) {
        if (isRef(propValue)) {
            proxy(vm, propName, {
                get: function () { return propValue.value; },
                set: function (val) {
                    propValue.value = val;
                },
            });
        }
        else {
            Object.defineProperty(vm, propName, {
                enumerable: true,
                configurable: true,
                get: function () {
                    if (isReactive(propValue)) {
                        propValue.__ob__.dep.depend();
                    }
                    return propValue;
                },
                set: function (val) {
                    propValue = val;
                },
            });
        }
    }
}
function updateTemplateRef(vm) {
    var rawBindings = vmStateManager.get(vm, 'rawBindings') || {};
    if (!rawBindings || !Object.keys(rawBindings).length)
        return;
    var refs = vm.$refs;
    var oldRefKeys = vmStateManager.get(vm, 'refs') || [];
    for (var index = 0; index < oldRefKeys.length; index++) {
        var key = oldRefKeys[index];
        var setupValue = rawBindings[key];
        if (!refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = null;
        }
    }
    var newKeys = Object.keys(refs);
    var validNewKeys = [];
    for (var index = 0; index < newKeys.length; index++) {
        var key = newKeys[index];
        var setupValue = rawBindings[key];
        if (refs[key] && setupValue && isRef(setupValue)) {
            setupValue.value = refs[key];
            validNewKeys.push(key);
        }
    }
    vmStateManager.set(vm, 'refs', validNewKeys);
}
function resolveScopedSlots(vm, slotsProxy) {
    var parentVNode = vm.$options._parentVnode;
    if (!parentVNode)
        return;
    var prevSlots = vmStateManager.get(vm, 'slots') || [];
    var curSlots = resolveSlots(parentVNode.data.scopedSlots, vm.$slots);
    // remove staled slots
    for (var index = 0; index < prevSlots.length; index++) {
        var key = prevSlots[index];
        if (!curSlots[key]) {
            delete slotsProxy[key];
        }
    }
    // proxy fresh slots
    var slotNames = Object.keys(curSlots);
    for (var index = 0; index < slotNames.length; index++) {
        var key = slotNames[index];
        if (!slotsProxy[key]) {
            slotsProxy[key] = createSlotProxy(vm, key);
        }
    }
    vmStateManager.set(vm, 'slots', slotNames);
}
function activateCurrentInstance(vm, fn, onError) {
    var preVm = getCurrentVue2Instance();
    setCurrentInstance(vm);
    try {
        return fn(vm);
    }
    catch (err) {
        if (onError) {
            onError(err);
        }
        else {
            throw err;
        }
    }
    finally {
        setCurrentInstance(preVm);
    }
}

function mixin(Vue) {
    Vue.mixin({
        beforeCreate: functionApiInit,
        mounted: function () {
            updateTemplateRef(this);
        },
        updated: function () {
            updateTemplateRef(this);
        },
    });
    /**
     * Vuex init hook, injected into each instances init hooks list.
     */
    function functionApiInit() {
        var vm = this;
        var $options = vm.$options;
        var setup = $options.setup, render = $options.render;
        if (render) {
            // keep currentInstance accessible for createElement
            $options.render = function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return activateCurrentInstance(vm, function () { return render.apply(_this, args); });
            };
        }
        if (!setup) {
            return;
        }
        if (typeof setup !== 'function') {
            return;
        }
        var data = $options.data;
        // wrapper the data option, so we can invoke setup before data get resolved
        $options.data = function wrappedData() {
            initSetup(vm, vm.$props);
            return typeof data === 'function'
                ? data.call(vm, vm)
                : data || {};
        };
    }
    function initSetup(vm, props) {
        if (props === void 0) { props = {}; }
        var setup = vm.$options.setup;
        var ctx = createSetupContext(vm);
        // fake reactive for `toRefs(props)`
        def(props, '__ob__', createObserver());
        // resolve scopedSlots and slots to functions
        // @ts-expect-error
        resolveScopedSlots(vm, ctx.slots);
        var binding;
        activateCurrentInstance(vm, function () {
            // make props to be fake reactive, this is for `toRefs(props)`
            binding = setup(props, ctx);
        });
        if (!binding)
            return;
        if (isFunction(binding)) {
            // keep typescript happy with the binding type.
            var bindingFunc_1 = binding;
            // keep currentInstance accessible for createElement
            vm.$options.render = function () {
                // @ts-expect-error
                resolveScopedSlots(vm, ctx.slots);
                return activateCurrentInstance(vm, function () { return bindingFunc_1(); });
            };
            return;
        }
        else if (isPlainObject(binding)) {
            if (isReactive(binding)) {
                binding = toRefs(binding);
            }
            vmStateManager.set(vm, 'rawBindings', binding);
            var bindingObj_1 = binding;
            Object.keys(bindingObj_1).forEach(function (name) {
                var bindingValue = bindingObj_1[name];
                if (!isRef(bindingValue)) {
                    if (!isReactive(bindingValue)) {
                        if (isFunction(bindingValue)) {
                            bindingValue = bindingValue.bind(vm);
                        }
                        else if (!isObject(bindingValue)) {
                            bindingValue = ref(bindingValue);
                        }
                        else if (hasReactiveArrayChild(bindingValue)) {
                            // creates a custom reactive properties without make the object explicitly reactive
                            // NOTE we should try to avoid this, better implementation needed
                            customReactive(bindingValue);
                        }
                    }
                    else if (isArray(bindingValue)) {
                        bindingValue = ref(bindingValue);
                    }
                }
                asVmProperty(vm, name, bindingValue);
            });
            return;
        }
    }
    function customReactive(target) {
        if (!isPlainObject(target) ||
            isRef(target) ||
            isReactive(target) ||
            isRaw(target))
            return;
        var Vue = getVueConstructor();
        var defineReactive = Vue.util.defineReactive;
        Object.keys(target).forEach(function (k) {
            var val = target[k];
            defineReactive(target, k, val);
            if (val) {
                customReactive(val);
            }
            return;
        });
    }
    function hasReactiveArrayChild(target, visited) {
        if (visited === void 0) { visited = new Map(); }
        if (visited.has(target)) {
            return visited.get(target);
        }
        visited.set(target, false);
        if (Array.isArray(target) && isReactive(target)) {
            visited.set(target, true);
            return true;
        }
        if (!isPlainObject(target) || isRaw(target)) {
            return false;
        }
        return Object.keys(target).some(function (x) {
            return hasReactiveArrayChild(target[x], visited);
        });
    }
    function createSetupContext(vm) {
        var ctx = { slots: {} };
        var propsPlain = [
            'root',
            'parent',
            'refs',
            'listeners',
            'isServer',
            'ssrContext',
        ];
        var propsReactiveProxy = ['attrs'];
        var methodReturnVoid = ['emit'];
        propsPlain.forEach(function (key) {
            var srcKey = "$" + key;
            proxy(ctx, key, {
                get: function () { return vm[srcKey]; },
                set: function () {
                    warn$1("Cannot assign to '" + key + "' because it is a read-only property", vm);
                },
            });
        });
        propsReactiveProxy.forEach(function (key) {
            var srcKey = "$" + key;
            proxy(ctx, key, {
                get: function () {
                    var e_1, _a;
                    var data = reactive({});
                    var source = vm[srcKey];
                    var _loop_1 = function (attr) {
                        proxy(data, attr, {
                            get: function () {
                                // to ensure it always return the latest value
                                return vm[srcKey][attr];
                            },
                        });
                    };
                    try {
                        for (var _b = __values(Object.keys(source)), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var attr = _c.value;
                            _loop_1(attr);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return data;
                },
                set: function () {
                    warn$1("Cannot assign to '" + key + "' because it is a read-only property", vm);
                },
            });
        });
        methodReturnVoid.forEach(function (key) {
            var srcKey = "$" + key;
            proxy(ctx, key, {
                get: function () {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var fn = vm[srcKey];
                        fn.apply(vm, args);
                    };
                },
            });
        });
        return ctx;
    }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(from, to) {
    if (!from)
        return to;
    if (!to)
        return from;
    var key;
    var toVal;
    var fromVal;
    var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        // in case the object is already observed...
        if (key === '__ob__')
            continue;
        toVal = to[key];
        fromVal = from[key];
        if (!hasOwn(to, key)) {
            to[key] = fromVal;
        }
        else if (toVal !== fromVal &&
            isPlainObject(toVal) &&
            !isRef(toVal) &&
            isPlainObject(fromVal) &&
            !isRef(fromVal)) {
            mergeData(fromVal, toVal);
        }
    }
    return to;
}
function install$1(Vue) {
    if (isVueRegistered(Vue)) {
        return;
    }
    Vue.config.optionMergeStrategies.setup = function (parent, child) {
        return function mergedSetupFn(props, context) {
            return mergeData(typeof parent === 'function' ? parent(props, context) || {} : undefined, typeof child === 'function' ? child(props, context) || {} : undefined);
        };
    };
    setVueConstructor(Vue);
    mixin(Vue);
}
var Plugin = {
    install: function (Vue) { return install$1(Vue); },
};
// auto install when using CDN
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}/** All registered blades */

var blades = ref([]);
/** All pinnned blades */

var drawer = ref([]);
/** All opened blades */

var opened = ref([]);
/**
 * Put Blade options into registry.
 */

function registerBlade(options) {
  blades.value.push(options);
  console.log("Registered blades: ", blades.value);
}
/**
 * Return readonly list of all registered blades.
 */

function listBlades() {
  return computed(function () {
    return blades.value;
  });
}
/**
 * Return readonly list of all opened blades.
 */

function openedBlades() {
  return computed(function () {
    return opened.value;
  });
}
/**
 * Open blade by name.
 */

function openBlade(component, componentOptions) {
  opened.value.push({
    id: Math.random(),
    component: component,
    componentOptions: componentOptions
  });
  console.log("Opened blades: ", opened.value);
}
/**
 * Close blade by name and all its descendants.
 */

function closeBlade(name) {
  var bladeIndex = opened.value.findIndex(function (item) {
    return item.name === name;
  });

  if (bladeIndex > -1) {
    opened.value.splice(bladeIndex);
  }
}
/**
 * Close all blades.
 */

function closeBlades() {
  opened.value.splice(0);
}
/**
 * Save drawer items into local storage.
 */

function saveDrawer() {
  localStorage.setItem("vc-platform-drawer", JSON.stringify(drawer.value));
}
/**
 * Load drawer items from local storage.
 */

function loadDrawer() {
  var savedData = localStorage.getItem("vc-platform-drawer");

  try {
    return JSON.parse(savedData || "[]");
  } catch (err) {
    return [];
  }
}
/**
 * Add item into drawer.
 */

function addDrawerItem(item) {
  drawer.value.add(item);
}
/**
 * Remove item from drawer.
 */

function removeDrawerItem(item) {
  drawer.value.delete(item);
}
/**
 * Return readonly list of all drawer items.
 */

function getDrawer() {
  return computed(function () {
    return drawer.value;
  });
}var router=/*#__PURE__*/Object.freeze({__proto__:null,opened: opened,registerBlade: registerBlade,listBlades: listBlades,openedBlades: openedBlades,openBlade: openBlade,closeBlade: closeBlade,closeBlades: closeBlades,saveDrawer: saveDrawer,loadDrawer: loadDrawer,addDrawerItem: addDrawerItem,removeDrawerItem: removeDrawerItem,getDrawer: getDrawer});var install = function installVcUiKit(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,router: router,VcBlade: __vue_component__$a,VcBreadcrumbs: __vue_component__$b,VcButton: __vue_component__$9,VcCheckbox: __vue_component__$8,VcContainer: __vue_component__$7,VcDrawerItem: __vue_component__$6,VcDrawerToggler: __vue_component__$5,VcDrawer: __vue_component__$4,VcIcon: __vue_component__$d,VcInput: __vue_component__$c,VcLayout: __vue_component__$2,VcLink: __vue_component__$1,VcSpacer: __vue_component__$3,VcTable: __vue_component__});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;