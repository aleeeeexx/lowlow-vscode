var S = Object.defineProperty;
var M = (t, d, o) => d in t ? S(t, d, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[d] = o;
var C = (t, d, o) => (M(t, typeof d != "symbol" ? d + "" : d, o), o);
import { r as _, m as F, d as z, a as f, o as y, c as k, b as e, w as l, e as h, u as n, h as B, g as J, i as U, F as x, f as N, j as T, t as P, _ as G } from "./main-DZBL1taH.js";
import { g as $ } from "./service-BXs7DKxT.js";
class D {
  constructor(d) {
    C(this, "model");
    this.model = d, console.log(this.model);
  }
}
const L = () => {
  const t = _([
    {
      title: "查询条件1",
      formItem: {
        component: "",
        key: "",
        label: "",
        placeholder: ""
      },
      key: "1"
    }
  ]), d = _(t.value[0].key), o = _(0), b = ["input", "select"], g = _("1"), i = _(0), I = _([
    {
      title: "表格项1",
      tableItem: {
        title: "",
        dataIndex: "",
        key: "",
        width: "",
        slot: !1
      },
      key: "1"
    }
  ]), v = _({
    show: !1,
    page: "page",
    size: "size",
    total: "result.total"
  }), s = _({
    fetchName: "fetchTableList",
    result: '["result"]["records"]',
    serviceName: "getTableList"
  });
  return {
    filterItems: t,
    newTabIndex: o,
    filterActiveKey: d,
    ANTD_COMPONENT_OPTIONS: b,
    tableActiveKey: g,
    tableItems: I,
    newTableTabIndex: i,
    pagination: v,
    apiInfo: s
  };
}, V = () => {
  const t = L(), d = new D(t), o = () => {
    t.filterActiveKey.value = `newTab${++t.newTabIndex.value}`, t.filterItems.value.push({
      title: `查询条件${t.filterItems.value.length + 1}`,
      formItem: {
        component: "",
        key: "",
        label: "",
        placeholder: ""
      },
      key: t.filterActiveKey.value
    });
  }, b = (r) => {
    let c = 0;
    t.filterItems.value.forEach((p, m) => {
      p.key === r && (c = m - 1);
    }), t.filterItems.value = t.filterItems.value.filter((p) => p.key !== r), t.filterItems.value.length && t.filterActiveKey.value === r && (c >= 0 ? t.filterActiveKey.value = t.filterItems.value[c].key : t.filterActiveKey.value = t.filterItems.value[0].key);
  }, g = (r, c) => {
    c === "add" ? o() : b(r);
  }, i = () => {
    t.tableActiveKey.value = `newTab${++t.newTableTabIndex.value}`, t.tableItems.value.push({
      title: `表格项${t.tableItems.value.length + 1}`,
      tableItem: {
        title: "",
        dataIndex: "",
        key: "",
        width: "",
        slot: !1
      },
      key: t.tableActiveKey.value
    });
  }, I = (r) => {
    let c = 0;
    t.tableItems.value.forEach((p, m) => {
      p.key === r && (c = m - 1);
    }), t.tableItems.value = t.tableItems.value.filter((p) => p.key !== r), t.tableItems.value.length && t.tableActiveKey.value === r && (c >= 0 ? t.tableActiveKey.value = t.tableItems.value[c].key : t.tableActiveKey.value = t.tableItems.value[0].key);
  };
  return {
    model: t,
    service: d,
    onFilterEdit: g,
    onTableEdit: (r, c) => {
      c === "add" ? i() : I(r);
    },
    handleConfirmGenerateCode: () => {
      const r = {
        filters: t.filterItems.value.map((p) => JSON.parse(JSON.stringify(p.formItem))),
        columns: t.tableItems.value.map((p) => JSON.parse(JSON.stringify(p.tableItem))),
        pagination: JSON.parse(JSON.stringify(t.pagination.value)),
        ...t.apiInfo.value,
        includeModifyModal: !1,
        modifyMOdal: {}
      }, c = localStorage.getItem("selectedFolder");
      $({
        material: "增删改查列表页",
        model: r,
        path: "",
        createPath: c ? [c] : [],
        privateMaterials: void 0
      }).then(() => {
        F.success("生成成功");
      }), console.log(r, "handleConfirmGenerateCode-data");
    }
  };
}, R = { class: "autoTable" }, j = { class: "main" }, q = { class: "main" }, H = { class: "footer" }, Q = /* @__PURE__ */ z({
  __name: "index",
  setup(t) {
    const d = V(), { model: o } = d, b = { span: 3 };
    return (g, i) => {
      const I = f("a-typography-title"), v = f("a-input"), s = f("a-form-item"), r = f("a-select-option"), c = f("a-select"), p = f("a-form"), m = f("a-card"), w = f("a-tab-pane"), A = f("a-tabs"), K = f("a-switch"), O = f("a-button");
      return y(), k("div", R, [
        e(I, { level: 4 }, {
          default: l(() => [
            U("配置生成增删查改表格")
          ]),
          _: 1
        }),
        e(m, { title: "筛选项配置" }, {
          default: l(() => [
            e(A, {
              activeKey: n(o).filterActiveKey,
              "onUpdate:activeKey": i[0] || (i[0] = (a) => n(o).filterActiveKey = a),
              type: "editable-card",
              onEdit: n(d).onFilterEdit,
              style: { width: "700px" }
            }, {
              default: l(() => [
                (y(!0), k(x, null, N(n(o).filterItems.value, (a) => (y(), T(w, {
                  key: a.key,
                  tab: a.title
                }, {
                  default: l(() => [
                    h("div", j, [
                      e(m, { style: { "margin-top": "20px" } }, {
                        default: l(() => [
                          e(p, {
                            labelAlign: "right",
                            "label-col": b
                          }, {
                            default: l(() => [
                              e(s, { label: "字段名" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.formItem.key,
                                    "onUpdate:value": (u) => a.formItem.key = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "label" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.formItem.label,
                                    "onUpdate:value": (u) => a.formItem.label = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "组件" }, {
                                default: l(() => [
                                  e(c, {
                                    ref_for: !0,
                                    ref: "select",
                                    value: a.formItem.component,
                                    "onUpdate:value": (u) => a.formItem.component = u
                                  }, {
                                    default: l(() => [
                                      (y(!0), k(x, null, N(n(o).ANTD_COMPONENT_OPTIONS, (u, E) => (y(), T(r, {
                                        value: u,
                                        key: E
                                      }, {
                                        default: l(() => [
                                          U(P(u), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]))), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "placeholder" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.formItem.placeholder,
                                    "onUpdate:value": (u) => a.formItem.placeholder = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ]),
                  _: 2
                }, 1032, ["tab"]))), 128))
              ]),
              _: 1
            }, 8, ["activeKey", "onEdit"])
          ]),
          _: 1
        }),
        e(m, {
          title: "表格配置",
          style: { "margin-top": "20px" }
        }, {
          default: l(() => [
            e(A, {
              activeKey: n(o).tableActiveKey,
              "onUpdate:activeKey": i[1] || (i[1] = (a) => n(o).tableActiveKey = a),
              type: "editable-card",
              onEdit: n(d).onTableEdit,
              style: { width: "700px" }
            }, {
              default: l(() => [
                (y(!0), k(x, null, N(n(o).tableItems.value, (a) => (y(), T(w, {
                  key: a.key,
                  tab: a.title
                }, {
                  default: l(() => [
                    h("div", q, [
                      e(m, { style: { "margin-top": "20px" } }, {
                        default: l(() => [
                          e(p, { "label-col": b }, {
                            default: l(() => [
                              e(s, { label: "title" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.tableItem.title,
                                    "onUpdate:value": (u) => a.tableItem.title = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "dataIndex" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.tableItem.dataIndex,
                                    "onUpdate:value": (u) => a.tableItem.dataIndex = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "key" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.tableItem.key,
                                    "onUpdate:value": (u) => a.tableItem.key = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "width" }, {
                                default: l(() => [
                                  e(v, {
                                    value: a.tableItem.width,
                                    "onUpdate:value": (u) => a.tableItem.width = u
                                  }, null, 8, ["value", "onUpdate:value"])
                                ]),
                                _: 2
                              }, 1024),
                              e(s, { label: "自定义插槽" }, {
                                default: l(() => [
                                  e(K, {
                                    checked: a.tableItem.slot,
                                    "onUpdate:checked": (u) => a.tableItem.slot = u
                                  }, null, 8, ["checked", "onUpdate:checked"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ])
                  ]),
                  _: 2
                }, 1032, ["tab"]))), 128))
              ]),
              _: 1
            }, 8, ["activeKey", "onEdit"])
          ]),
          _: 1
        }),
        e(m, {
          style: { "margin-top": "20px" },
          title: "分页配置"
        }, {
          default: l(() => [
            e(p, { "label-col": b }, {
              default: l(() => [
                e(s, { label: "是否分页" }, {
                  default: l(() => [
                    e(K, {
                      checked: n(o).pagination.value.show,
                      "onUpdate:checked": i[2] || (i[2] = (a) => n(o).pagination.value.show = a)
                    }, null, 8, ["checked"])
                  ]),
                  _: 1
                }),
                e(s, { label: "page字段名" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).pagination.value.page,
                      "onUpdate:value": i[3] || (i[3] = (a) => n(o).pagination.value.page = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                e(s, { label: "size字段名" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).pagination.value.size,
                      "onUpdate:value": i[4] || (i[4] = (a) => n(o).pagination.value.size = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                e(s, { label: "total字段获取" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).pagination.value.total,
                      "onUpdate:value": i[5] || (i[5] = (a) => n(o).pagination.value.total = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        e(m, {
          style: { "margin-top": "20px" },
          title: "接口配置"
        }, {
          default: l(() => [
            e(p, { "label-col": b }, {
              default: l(() => [
                e(s, { label: "api名称" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).apiInfo.value.fetchName,
                      "onUpdate:value": i[6] || (i[6] = (a) => n(o).apiInfo.value.fetchName = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                e(s, { label: "列表数据获取字段" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).apiInfo.value.result,
                      "onUpdate:value": i[7] || (i[7] = (a) => n(o).apiInfo.value.result = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                e(s, { label: "service方法名" }, {
                  default: l(() => [
                    e(v, {
                      value: n(o).apiInfo.value.serviceName,
                      "onUpdate:value": i[8] || (i[8] = (a) => n(o).apiInfo.value.serviceName = a)
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        h("div", H, [
          e(O, {
            onClick: n(d).handleConfirmGenerateCode,
            icon: B(n(J)),
            size: "large",
            type: "primary"
          }, {
            default: l(() => [
              U(" 生成代码 ")
            ]),
            _: 1
          }, 8, ["onClick", "icon"])
        ])
      ]);
    };
  }
}), Z = /* @__PURE__ */ G(Q, [["__scopeId", "data-v-ba8b693b"]]);
export {
  Z as default
};
