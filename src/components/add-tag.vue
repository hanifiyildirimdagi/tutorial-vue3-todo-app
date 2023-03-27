<template>
    <v-dialog v-model="TagDialog" persistent width="400">
        <v-card>
            <v-card-title class="text-h5">
                Add a New Tag
            </v-card-title>
            <v-card-text>
                <v-form class="w-100 d-flex flex-row flex-wrap">
                    <v-col cols="12 pa-0">
                        <v-text-field label="Tag" v-model="form.name" placeholder="Tag" variant="filled"
                            @input="v$.name.$touch" @blur="v$.name.$touch"
                            :error-messages="(v$.name.$errors.map(e => e.$message) as string[])"></v-text-field>
                    </v-col>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-accent-2" variant="text" @click="ClearAndClose">
                    Close
                </v-btn>
                <v-btn color="primary" variant="text" @click="Save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { required, alpha } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { onMounted } from '@vue/runtime-dom';

const Store = useStore();
const TagDialog = computed({
    get: (): boolean => { return Store.getters["application/TagDialog"] as boolean },
    set: (value: boolean): void => { Store.commit("application/SetTagDialog", value) }
});



const form = reactive({
    name: '',
})

const rules = {
    name: { required, alpha }
}
const v$ = useVuelidate(rules, form)

onMounted(() => {
    Store.dispatch("todo/FetchTags");
});

async function Save() {
    await v$.value.$validate();
    if (v$.value.$invalid) return;
    Store.dispatch("todo/AddNewTag", form.name);
    ClearAndClose();
}

function ClearAndClose()
{
    form.name = '';
    v$.value.$reset();
    TagDialog.value = false;
}

</script>