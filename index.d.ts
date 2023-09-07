import {DefineComponent} from "vue";

export interface InertiaFormProps {
    submitLabel: string,
    inputs: {
        [key: string]: Input
    },
    action: string,
    method: string,
    onSubmit: Function,
    onFinish: Function,
    staticErrors: Object,
    reset: boolean,
}

declare const _default: DefineComponent<
    InertiaFormProps,
    {},
    {},
    ComputedOptions,
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    {},
    '',
    InertiaFormProps
>;

export default _default;