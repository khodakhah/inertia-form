export interface Input {
    type: string,
    key: string,
    default: string,
    label: string,
    placeholder?: string,
    required?: boolean,
}

export interface InputSelect extends Input{
    options: SelectOption[],
}

export interface InputDate extends Input{
    min: string,
    max: string,
    allowed: string[],
    disabled: string[],
    disabledWeekDays: string[],
}

export interface SelectOption {
    value: string,
    label: string
}