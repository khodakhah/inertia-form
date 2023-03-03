<script setup>
    import {useForm} from '@inertiajs/vue3';
    import PrimaryButton from "@/Components/PrimaryButton.vue";
    import FormInput from "@/Components/FormInput.vue";

    let props = defineProps({
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
    })

    let firstKey = Array.isArray(props.inputs) ? props.inputs[0].key : Object.keys(props.inputs)[0]

    const getFormData = () => {
        let data = {}
        for (let input in props.inputs) {
            data[props.inputs[input].key] = props.inputs[input].default ?? ''
        }
        return data
    }

    const form = useForm(getFormData())

    if (props.staticErrors) {
        form.errors = props.staticErrors
    }

    const submit = () => {
        if (props.method === 'put') {
            form.put(props.action, {
                onFinish: () => {
                    if (props.onFinish) {
                        props.onFinish(form, getFormData())
                    }
                },
                onSuccess: () => {
                    form.defaults(getFormData())
                    if (props.reset) {
                        form.reset()
                    }
                }
            })
            return;
        }
        form.post(props.action, {
            onFinish: () => {
                if (props.onFinish) {
                    props.onFinish(form, getFormData())
                }
            },
            onSuccess: () => {
                form.defaults(getFormData())
                if (props.reset) {
                    form.reset()
                }
            }
        })
    }

    defineExpose({
        form
    })
</script>

<template>
    <form class="w-full" @submit.prevent="submit">
        <slot name="inputs" :inputs="inputs" :form="form">
            <slot v-for="input in inputs" :name="input.key" :input="input" :form="form" :focus="input.key === firstKey">
                <div class="w-full mb-6">
                    <FormInput :input="input" :form="form" :focus="input.key === firstKey"/>
                </div>
            </slot>
        </slot>
        <slot name="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            <PrimaryButton>
                Save
            </PrimaryButton>
        </slot>
    </form>
</template>
