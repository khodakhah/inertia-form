import {DefineComponent, ComputedOptions, ComponentOptionsMixin} from "vue";

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

declare module 'CheckboxInput' {
    import {CheckboxInput} from "./src/components/CheckboxInput.vue";
    export const CheckboxInput: CheckboxInput;
}

declare module 'DatepickerInput' {
    import {DatepickerInput} from "./src/components/DatepickerInput.vue";
    export const DatepickerInput: DatepickerInput;
}

declare module 'FormInput' {
    import {FormInput} from "./src/components/FormInput.vue";
    export const FormInput: FormInput;
}

declare module 'InputError' {
    import {InputError} from "./src/components/InputError.vue";
    export const InputError: InputError;
}

declare module 'InputLabel' {
    import {InputLabel} from "./src/components/InputLabel.vue";
    export const InputLabel: InputLabel;
}

declare module 'PrimaryButton' {
    import {PrimaryButton} from "./src/components/PrimaryButton.vue";
    export const PrimaryButton: PrimaryButton;
}

declare module 'RadioInput' {
    import {RadioInput} from "./src/components/RadioInput.vue";
    export const RadioInput: RadioInput;
}

declare module 'SelectInput' {
    import {SelectInput} from "./src/components/SelectInput.vue";
    export const SelectInput: SelectInput;
}

declare module 'TextareaInput' {
    import {TextareaInput} from "./src/components/TextareaInput.vue";
    export const TextareaInput: TextareaInput;
}

declare module 'TextInput' {
    import {TextInput} from "./src/components/TextInput.vue";
    export const TextInput: TextInput;
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