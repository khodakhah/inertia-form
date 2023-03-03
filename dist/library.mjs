import { computed, withDirectives, openBlock, createElementBlock, isRef, vModelCheckbox, unref, ref, watch, createBlock, withCtx, createElementVNode, withModifiers, renderSlot, Fragment, renderList, createVNode, normalizeClass, createTextVNode, toDisplayString, vModelDynamic, createCommentVNode, vShow, onMounted } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { debounce } from 'lodash';
import { useForm } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import FormInput from '@/Components/FormInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import InputError from '@/Components/InputError.vue';
import TextInput from '@/Components/TextInput.vue';
import TextareaInput from '@/Components/TextareaInput.vue';
import Select from '@/Components/Select.vue';
import Checkbox from '@/Components/Checkbox.vue';
import DatepickerInput from '@/Components/DatepickerInput.vue';

var script$9 = {
  __name: 'Checkbox',
  props: {
    checked: {
        type: [Array, Boolean],
        default: false,
    },
},
  emits: ['update:checked'],
  setup(__props, { emit }) {

const props = __props;





const proxyChecked = computed({
    get() {
        return props.checked;
    },

    set(val) {
        emit('update:checked', val);
    },
});

return (_ctx, _cache) => {
  return withDirectives((openBlock(), createElementBlock("input", {
    type: "checkbox",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(proxyChecked) ? (proxyChecked).value = $event : null)),
    class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
  }, null, 512 /* NEED_PATCH */)), [
    [vModelCheckbox, unref(proxyChecked)]
  ])
}
}

};

script$9.__file = "src/Components/Checkbox.vue";

const _hoisted_1$7 = ["value"];


var script$8 = {
  __name: 'DatepickerInput',
  props: {
    modelValue: String,
    minDate: String,
    maxDate: String,
    disabledDates: Array,
    allowedDates: Array,
    disabledWeekDays: Array,
    onChange: Function
},
  emits: ['update:modelValue'],
  setup(__props, { emit: emits }) {

const props = __props;






const genDate = (value, defaultValue) => {
    if (value !== undefined && typeof value === 'string' && value !== '') {
        return new Date(value)
    }

    if (defaultValue !== undefined) {
        return defaultValue
    }

    return new Date()
};

const date = ref(genDate(props.modelValue, null));

const updateDate = (modelData) => {
    date.value = modelData;
    emits('update:modelValue', modelData?.toISOString() ?? '');
    props.onChange(date.value);
};

const textInputOptions = ref({
    format: 'dd.MM.yyyy'
});

const dateFormat = (date) => {
    if (typeof date !== "object") {
        return ''
    }
    const day = ('0' + (date.getDate())).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
};

const genDateList = (dates) => {
    if (dates && Array.isArray(dates) && dates.length > 0) {
        let res = [];
        dates.forEach(function (element) {
            let newDate = genDate(element, null);
            if (newDate !== null) {
                res.push(newDate);
            }
        });
        return res
    }
    return []
};

watch(() => props.modelValue, (value) => {
    date.value = genDate(value, null);
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(unref(Datepicker), {
    modelValue: date.value,
    "onUpdate:modelValue": [
      _cache[0] || (_cache[0] = $event => ((date).value = $event)),
      updateDate
    ],
    "enable-time-picker": false,
    format: dateFormat,
    "text-input": "",
    "text-input-options": textInputOptions.value,
    "min-date": genDate(__props.minDate, null),
    "max-date": genDate(__props.maxDate, null),
    "disabled-dates": genDateList(__props.disabledDates),
    "allowed-dates": genDateList(__props.allowedDates),
    "disabled-week-days": __props.disabledWeekDays,
    "start-date": genDate(__props.maxDate, null) ?? genDate(__props.minDate, null) ?? genDate(),
    "prevent-min-max-navigation": "",
    "auto-apply": ""
  }, {
    "dp-input": withCtx(({ value, onInput, onEnter, onTab, onClear }) => [
      createElementVNode("input", {
        type: "text",
        value: value,
        class: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
      }, null, 8 /* PROPS */, _hoisted_1$7)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["modelValue", "text-input-options", "min-date", "max-date", "disabled-dates", "allowed-dates", "disabled-week-days", "start-date"]))
}
}

};

script$8.__file = "src/Components/DatepickerInput.vue";

const _hoisted_1$6 = ["onSubmit"];
const _hoisted_2$3 = { class: "w-full mb-6" };

    
var script$7 = {
  __name: 'Form',
  props: {
        inputs: Array|Object,
        action: String,
        method: String,
        layout: Array,
        onFinish: Function,
        staticErrors: Object,
        reset: {
            type: Boolean,
            default: true,
        },
    },
  setup(__props, { expose }) {

const props = __props;

    

    let firstKey = Array.isArray(props.inputs) ? props.inputs[0].key : Object.keys(props.inputs)[0];

    const getFormData = () => {
        let data = {};
        for (let input in props.inputs) {
            data[props.inputs[input].key] = props.inputs[input].default ?? '';
        }
        return data
    };

    const form = useForm(getFormData());

    if (props.staticErrors) {
        form.errors = props.staticErrors;
    }

    const submit = () => {
        if (props.method === 'put') {
            form.put(props.action, {
                onFinish: () => {
                    if (props.onFinish) {
                        props.onFinish(form, getFormData());
                    }
                },
                onSuccess: () => {
                    form.defaults(getFormData());
                    if (props.reset) {
                        form.reset();
                    }
                }
            });
            return;
        }
        form.post(props.action, {
            onFinish: () => {
                if (props.onFinish) {
                    props.onFinish(form, getFormData());
                }
            },
            onSuccess: () => {
                form.defaults(getFormData());
                if (props.reset) {
                    form.reset();
                }
            }
        });
    };

    expose({
        form
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("form", {
    class: "w-full",
    onSubmit: withModifiers(submit, ["prevent"])
  }, [
    renderSlot(_ctx.$slots, "inputs", {
      inputs: __props.inputs,
      form: unref(form)
    }, () => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.inputs, (input) => {
        return renderSlot(_ctx.$slots, input.key, {
          input: input,
          form: unref(form),
          focus: input.key === unref(firstKey)
        }, () => [
          createElementVNode("div", _hoisted_2$3, [
            createVNode(FormInput, {
              input: input,
              form: unref(form),
              focus: input.key === unref(firstKey)
            }, null, 8 /* PROPS */, ["input", "form", "focus"])
          ])
        ])
      }), 256 /* UNKEYED_FRAGMENT */))
    ]),
    renderSlot(_ctx.$slots, "submit", {
      class: normalizeClass({ 'opacity-25': unref(form).processing }),
      disabled: unref(form).processing
    }, () => [
      createVNode(PrimaryButton, null, {
        default: withCtx(() => [
          createTextVNode(" Save ")
        ]),
        _: 1 /* STABLE */
      })
    ])
  ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$6))
}
}

};

script$7.__file = "src/Components/Form.vue";

const _hoisted_1$5 = {
  key: 0,
  class: "border-gray-200 dark:border-gray-700"
};
const _hoisted_2$2 = ["for"];
const _hoisted_3$1 = {
  key: 1,
  class: "flex items-center"
};
const _hoisted_4 = ["id", "type"];
const _hoisted_5 = ["for"];
const _hoisted_6 = {
  key: 5,
  class: "relative"
};
const _hoisted_7 = /*#__PURE__*/createElementVNode("div", { class: "flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none" }, [
  /*#__PURE__*/createElementVNode("svg", {
    "aria-hidden": "true",
    class: "w-5 h-5 text-gray-500 dark:text-gray-400",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /*#__PURE__*/createElementVNode("path", {
      "fill-rule": "evenodd",
      d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
      "clip-rule": "evenodd"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createElementVNode("input", {
  datepicker: "",
  type: "text",
  class: "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input",
  placeholder: "Select date"
}, null, -1 /* HOISTED */);
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];


var script$6 = {
  __name: 'FormInput',
  props: {
    input: Object,
    form: Object,
    focus: {
        type: Boolean,
        default: false,
    },
    options: Array,
    onChange: {
        type: Function,
        default: (value) => {
        }
    },
},
  setup(__props) {

const props = __props;

const typeInInputs = [
    'textarea',
    'text',
    'password',
    'email',
    'number',
    'url',
    'date',
    'datetime-local',
    'month',
    'week',
    'time',
    'search',
    'tel',
];



let value = ref(props.form[props.input.key]);
if (typeInInputs.includes(props.input.type)) {
    watch(value, debounce((val) => {
        props.onChange(val);
    }, 300));
}

return (_ctx, _cache) => {
  return (Object.keys(__props.input).length === 0)
    ? (openBlock(), createElementBlock("hr", _hoisted_1$5))
    : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        (__props.input.type === 'checkbox')
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(Checkbox, {
                id: __props.input.key,
                type: __props.input.type,
                modelValue: __props.form[__props.input.key],
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((__props.form[__props.input.key]) = $event)),
                checked: __props.input.default,
                "on-change": __props.onChange,
                onChange: __props.onChange
              }, null, 8 /* PROPS */, ["id", "type", "modelValue", "checked", "on-change", "onChange"]),
              createElementVNode("label", {
                for: __props.input.key,
                class: "ml-2 text-sm text-gray-600"
              }, toDisplayString(__props.input.label), 9 /* TEXT, PROPS */, _hoisted_2$2)
            ], 64 /* STABLE_FRAGMENT */))
          : (['radio'].includes(__props.input.type))
            ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
                withDirectives(createElementVNode("input", {
                  id: __props.input.key,
                  type: __props.input.type,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((__props.form[__props.input.key]) = $event)),
                  onKeyup: _cache[2] || (_cache[2] = $event => (isRef(value) ? value.value = __props.form[__props.input.key] : value = __props.form[__props.input.key])),
                  onChange: _cache[3] || (_cache[3] = $event => (isRef(value) ? value.value = __props.form[__props.input.key] : value = __props.form[__props.input.key]))
                }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_4), [
                  [vModelDynamic, __props.form[__props.input.key]]
                ]),
                createElementVNode("label", {
                  for: __props.input.key,
                  class: "px-3"
                }, toDisplayString(__props.input.label), 9 /* TEXT, PROPS */, _hoisted_5)
              ]))
            : (openBlock(), createBlock(InputLabel, {
                key: 2,
                for: __props.input.key,
                value: __props.input.label
              }, null, 8 /* PROPS */, ["for", "value"])),
        ([
                    'text',
                    'password',
                    'email',
                    'number',
                    'url',
                    // 'date',
                    'datetime-local',
                    'month',
                    'week',
                    'time',
                    'search',
                    'tel',
                    ].includes(__props.input.type))
          ? (openBlock(), createBlock(TextInput, {
              key: 3,
              id: __props.input.key,
              type: __props.input.type,
              placeholder: __props.input.placeholder,
              modelValue: __props.form[__props.input.key],
              "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((__props.form[__props.input.key]) = $event)),
              onKeyup: _cache[5] || (_cache[5] = $event => (isRef(value) ? value.value = __props.form[__props.input.key] : value = __props.form[__props.input.key])),
              onChange: _cache[6] || (_cache[6] = $event => (isRef(value) ? value.value = __props.form[__props.input.key] : value = __props.form[__props.input.key])),
              class: "mt-1 block w-full",
              required: __props.input.required,
              autofocus: __props.focus
            }, null, 8 /* PROPS */, ["id", "type", "placeholder", "modelValue", "required", "autofocus"]))
          : (__props.input.type === 'date')
            ? (openBlock(), createBlock(DatepickerInput, {
                key: 4,
                id: __props.input.key,
                class: "mt-1",
                "min-date": __props.input.min,
                "max-date": __props.input.max,
                placeholder: __props.input.placeholder,
                "allowed-dates": __props.input.allowed,
                "disabled-dates": __props.input.disabled,
                "disabled-week-days": __props.input.disabledWeekDays,
                "on-change": __props.onChange,
                modelValue: __props.form[__props.input.key],
                "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((__props.form[__props.input.key]) = $event))
              }, null, 8 /* PROPS */, ["id", "min-date", "max-date", "placeholder", "allowed-dates", "disabled-dates", "disabled-week-days", "on-change", "modelValue"]))
            : createCommentVNode("v-if", true),
        (__props.input.type === 'ndate')
          ? (openBlock(), createElementBlock("div", _hoisted_6, _hoisted_9))
          : (__props.input.type === 'textarea')
            ? (openBlock(), createBlock(TextareaInput, {
                key: 6,
                id: __props.input.key,
                type: __props.input.type,
                modelValue: __props.form[__props.input.key],
                "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((__props.form[__props.input.key]) = $event)),
                class: "mt-1 block w-full",
                required: __props.input.required,
                autofocus: __props.focus,
                onKeyup: _cache[9] || (_cache[9] = $event => (isRef(value) ? value.value = __props.form[__props.input.key] : value = __props.form[__props.input.key])),
                onChange: _cache[10] || (_cache[10] = $event => (__props.onChange(__props.form[__props.input.key])))
              }, null, 8 /* PROPS */, ["id", "type", "modelValue", "required", "autofocus"]))
            : (__props.input.type === 'select')
              ? (openBlock(), createBlock(Select, {
                  key: 7,
                  id: __props.input.key,
                  options: __props.options ? __props.options : __props.input.options ?? [],
                  modelValue: __props.form[__props.input.key],
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((__props.form[__props.input.key]) = $event)),
                  autofocus: __props.focus,
                  onChange: _cache[12] || (_cache[12] = $event => (__props.onChange(__props.form[__props.input.key])))
                }, null, 8 /* PROPS */, ["id", "options", "modelValue", "autofocus"]))
              : createCommentVNode("v-if", true),
        createVNode(InputError, {
          class: "mt-2",
          message: __props.form.errors[__props.input.key]
        }, null, 8 /* PROPS */, ["message"])
      ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$6.__file = "src/Components/FormInput.vue";

const _hoisted_1$4 = { class: "text-sm text-red-600" };


var script$5 = {
  __name: 'InputError',
  props: ['message'],
  setup(__props) {



return (_ctx, _cache) => {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    createElementVNode("p", _hoisted_1$4, toDisplayString(__props.message), 1 /* TEXT */)
  ], 512 /* NEED_PATCH */)), [
    [vShow, __props.message]
  ])
}
}

};

script$5.__file = "src/Components/InputError.vue";

const _hoisted_1$3 = { class: "block font-medium text-sm text-gray-700" };
const _hoisted_2$1 = { key: 0 };
const _hoisted_3 = { key: 1 };


var script$4 = {
  __name: 'InputLabel',
  props: ['value'],
  setup(__props) {



return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("label", _hoisted_1$3, [
    (__props.value)
      ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(__props.value), 1 /* TEXT */))
      : (openBlock(), createElementBlock("span", _hoisted_3, [
          renderSlot(_ctx.$slots, "default")
        ]))
  ]))
}
}

};

script$4.__file = "src/Components/InputLabel.vue";

var script$3 = {
    name: "Layout"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return null
}

script$3.render = render;
script$3.__file = "src/Components/Layout.vue";

const _hoisted_1$2 = ["value"];
const _hoisted_2 = ["value"];


var script$2 = {
  __name: 'Select',
  props: {
    modelValue: String,
    options: Array,
},
  emits: ['update:modelValue'],
  setup(__props) {





const input = ref(null);


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("select", {
    class: "mt-1 block w-full border-gray-300 rounded",
    value: __props.modelValue,
    onChange: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event.target.value))),
    ref_key: "input",
    ref: input
  }, [
    (__props.options)
      ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.options, (option) => {
          return (openBlock(), createElementBlock("option", {
            value: option.value
          }, toDisplayString(option.label), 9 /* TEXT, PROPS */, _hoisted_2))
        }), 256 /* UNKEYED_FRAGMENT */))
      : createCommentVNode("v-if", true)
  ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$2))
}
}

};

script$2.__file = "src/Components/Select.vue";

const _hoisted_1$1 = ["value"];


var script$1 = {
  __name: 'TextareaInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(__props) {





const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("textarea", {
    class: "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
    value: __props.modelValue,
    onInput: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event.target.value))),
    ref_key: "input",
    ref: input
  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1$1))
}
}

};

script$1.__file = "src/Components/TextareaInput.vue";

const _hoisted_1 = ["value"];


var script = {
  __name: 'TextInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(__props) {





const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("input", {
    class: "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
    value: __props.modelValue,
    onInput: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', $event.target.value))),
    ref_key: "input",
    ref: input
  }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_1))
}
}

};

script.__file = "src/Components/TextInput.vue";

var components = {
    Checkbox: script$9,
    DatepickerInput: script$8,
    Form: script$7,
    FormInput: script$6,
    InputError: script$5,
    InputLabel: script$4,
    Layout: script$3,
    Select: script$2,
    TextareaInput: script$1,
    TextInput: script,
};

const plugin = {
    install (Vue) {
        for (const prop in components) {
            if (components.hasOwnProperty(prop)) {
                const component = components[prop];
                Vue.component(component.name, component);
            }
        }
    }
};

export { plugin as default };
