var P = Object.defineProperty;
var E = (s, o, n) => o in s ? P(s, o, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[o] = n;
var T = (s, o, n) => (E(s, typeof o != "symbol" ? o + "" : o, n), n);
import { r as C, m as S, d as w, a as p, o as c, c as v, b as l, w as t, e as D, F as k, f as b, u, h as A, g as V, i as h, j as U, C as M, t as I, _ as L } from "./main-DZBL1taH.js";
import { g as B } from "./service-BXs7DKxT.js";
class j {
  constructor(o) {
    T(this, "model");
    this.model = o, console.log(this.model);
  }
}
const q = () => {
  const s = C(!1), o = C(!1), n = C([
    {
      type: "",
      component: "",
      key: "",
      optional: !1,
      defaultValue: "",
      label: "",
      placeholder: "",
      required: !1,
      message: "",
      showMore: !1,
      maxlength: ""
    }
  ]);
  return {
    isDefineProps: s,
    isDefineEmits: o,
    formItems: n,
    ANTD_COMPONENT_OPTIONS: [
      "input",
      "input-password",
      "input-number",
      "textarea",
      "select",
      "radio-group",
      "checkbox-group",
      "switch",
      "date-picker",
      "time-picker",
      "range-picker",
      "transfer"
    ],
    TYPE_OPTIONS: [
      "string",
      "number",
      "boolean",
      "string[]",
      "number[]",
      "boolean[]",
      "Dayjs",
      "[Dayjs,Dayjs]",
      "图片、视频、文件默认值选空数组"
    ],
    DEFUALT_VALUES: ['""', "false", "true", "0", "undefined", "[]"]
  };
}, G = () => {
  const s = q(), o = new j(s);
  return {
    model: s,
    service: o,
    handleAddFormItem: () => {
      const d = {
        type: "",
        component: "",
        key: "",
        optional: !1,
        defaultValue: "",
        label: "",
        placeholder: "",
        required: !1,
        message: "",
        showMore: !1,
        maxlength: "",
        showCount: !1
      };
      s.formItems.value.push({
        ...d
      });
    },
    handleDelFormItem: (d) => {
      s.formItems.value.length !== 1 && s.formItems.value.splice(d, 1);
    },
    handleConfirmGenerateCode: () => {
      const d = localStorage.getItem("selectedFolder");
      B({
        material: "表单",
        model: {
          modal: !1,
          title: "",
          formItems: JSON.parse(JSON.stringify(s.formItems.value)),
          independentFormFile: !1,
          excludeOriFile: !1
        },
        path: "",
        createPath: d ? [d] : [],
        privateMaterials: void 0
      }).then(() => {
        S.success("生成成功");
      });
    }
  };
}, Y = { class: "autoform" }, $ = { class: "main" }, z = { class: "footer" }, J = /* @__PURE__ */ w({
  __name: "index",
  setup(s) {
    const o = G(), { model: n } = o;
    return (x, f) => {
      const d = p("a-button"), _ = p("a-switch"), r = p("a-form-item"), N = p("a-card"), i = p("a-input"), g = p("a-select-option"), y = p("a-select"), F = p("a-form");
      return c(), v("div", Y, [
        l(N, {
          title: "表单配置生成代码",
          style: { width: "800px" },
          key: "ni"
        }, {
          extra: t(() => [
            l(d, {
              type: "primary",
              onClick: u(o).handleAddFormItem
            }, {
              default: t(() => [
                h("新增表单项")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          default: t(() => [
            l(r, { label: "是否配置props" }, {
              default: t(() => [
                l(_, {
                  checked: u(n).isDefineProps.value,
                  "onUpdate:checked": f[0] || (f[0] = (a) => u(n).isDefineProps.value = a)
                }, null, 8, ["checked"])
              ]),
              _: 1
            }),
            l(r, { label: "是否配置emits" }, {
              default: t(() => [
                l(_, {
                  checked: u(n).isDefineEmits.value,
                  "onUpdate:checked": f[1] || (f[1] = (a) => u(n).isDefineEmits.value = a)
                }, null, 8, ["checked"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        D("div", $, [
          (c(!0), v(k, null, b(u(n).formItems.value, (a, O) => (c(), U(N, {
            key: a,
            style: { "margin-top": "20px" },
            title: `表单项${O + 1}:${a.key ?? ""}`
          }, {
            extra: t(() => [
              l(u(M), {
                style: { "font-size": "18px" },
                onClick: (e) => u(o).handleDelFormItem(O)
              }, null, 8, ["onClick"])
            ]),
            default: t(() => [
              l(F, { labelAlign: "left" }, {
                default: t(() => [
                  l(r, { label: "字段名" }, {
                    default: t(() => [
                      l(i, {
                        value: a.key,
                        "onUpdate:value": (e) => a.key = e
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "字段类型" }, {
                    default: t(() => [
                      l(y, {
                        ref_for: !0,
                        ref: "select",
                        value: a.type,
                        "onUpdate:value": (e) => a.type = e
                      }, {
                        default: t(() => [
                          (c(!0), v(k, null, b(u(n).TYPE_OPTIONS, (e, m) => (c(), U(g, {
                            value: e,
                            key: m
                          }, {
                            default: t(() => [
                              h(I(e), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "是否可选" }, {
                    default: t(() => [
                      l(_, {
                        checked: a.optional,
                        "onUpdate:checked": (e) => a.optional = e
                      }, null, 8, ["checked", "onUpdate:checked"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "默认值" }, {
                    default: t(() => [
                      l(y, {
                        ref_for: !0,
                        ref: "select",
                        value: a.defaultValue,
                        "onUpdate:value": (e) => a.defaultValue = e
                      }, {
                        default: t(() => [
                          (c(!0), v(k, null, b(u(n).DEFUALT_VALUES, (e, m) => (c(), U(g, {
                            value: e,
                            key: m
                          }, {
                            default: t(() => [
                              h(I(e), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "组件" }, {
                    default: t(() => [
                      l(y, {
                        ref_for: !0,
                        ref: "select",
                        value: a.component,
                        "onUpdate:value": (e) => a.component = e
                      }, {
                        default: t(() => [
                          (c(!0), v(k, null, b(u(n).ANTD_COMPONENT_OPTIONS, (e, m) => (c(), U(g, {
                            value: e,
                            key: m
                          }, {
                            default: t(() => [
                              h(I(e), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "label" }, {
                    default: t(() => [
                      l(i, {
                        value: a.label,
                        "onUpdate:value": (e) => a.label = e
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "placeholder" }, {
                    default: t(() => [
                      l(i, {
                        value: a.placeholder,
                        "onUpdate:value": (e) => a.placeholder = e
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "是否必填" }, {
                    default: t(() => [
                      l(_, {
                        checked: a.required,
                        "onUpdate:checked": (e) => a.required = e
                      }, null, 8, ["checked", "onUpdate:checked"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "校验失败message" }, {
                    default: t(() => [
                      l(i, {
                        value: a.message,
                        "onUpdate:value": (e) => a.message = e
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "maxlength" }, {
                    default: t(() => [
                      l(i, {
                        value: a.maxlength,
                        "onUpdate:value": (e) => a.maxlength = e
                      }, null, 8, ["value", "onUpdate:value"])
                    ]),
                    _: 2
                  }, 1024),
                  l(r, { label: "是否展示字数" }, {
                    default: t(() => [
                      l(_, {
                        checked: a.showCount,
                        "onUpdate:checked": (e) => a.showCount = e
                      }, null, 8, ["checked", "onUpdate:checked"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1032, ["title"]))), 128))
        ]),
        D("div", z, [
          l(d, {
            onClick: u(o).handleConfirmGenerateCode,
            icon: A(u(V)),
            size: "large",
            type: "primary"
          }, {
            default: t(() => [
              h(" 生成代码 ")
            ]),
            _: 1
          }, 8, ["onClick", "icon"])
        ])
      ]);
    };
  }
}), R = /* @__PURE__ */ L(J, [["__scopeId", "data-v-bdf9ab03"]]);
export {
  R as default
};
