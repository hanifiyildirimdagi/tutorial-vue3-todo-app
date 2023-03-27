<template>
    <v-card elevation="0" class="d-flex flex-column h-100">
        <v-card-title>Edit Todo</v-card-title>
        <v-card-text v-if="hasData" class="flex-grow-1 d-flex flex-wrap">
            <v-form class="w-100">
                <v-col cols="12 pa-0">
                    <v-text-field label="Title" v-model="form.Title" placeholder="Give a todo title"
                        @input="v$.Title.$touch" @blur="v$.Title.$touch"
                        :error-messages="(v$.Title.$errors.map(e => e.$message) as string[])"
                        variant="filled"></v-text-field>
                </v-col>
                <v-col cols="12 pa-0">
                    <v-select chips label="Tags" v-model="form.Tags" :items="Tags" multiple append-icon="mdi-plus"
                        @click:append="OpenTagDialog"></v-select>
                </v-col>
            </v-form>
            <v-btn color="primary" variant="flat" class="mt-auto w-100" @click="Save">Save</v-btn>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
// Core
import { useStore } from 'vuex';
import { reactive, computed } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
// Validation
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
// Models
import { Todo } from '../store/todo/models/todo.model';

const Store = useStore();

const hasData = computed(() => Store.getters["todo/EditItem"] != undefined)
let item: Todo | undefined;
let form = reactive({...Store.getters["todo/EditItem"] as Todo})

onMounted(() => {
    Store.dispatch("todo/FetchTags");
});

const Tags = computed(() => Store.getters["todo/Tags"] as string[]);

const rules = {
    Title: { required },
    Description: {},
    Tags: {},
    State: {},
    Id: {},
}
const v$ = useVuelidate(rules, form)

function OpenTagDialog() {
    Store.commit("application/SetTagDialog", true);
}
async function Save() {
    const result = await v$.value.$validate();
    if (!result) return;
    await Store.dispatch("todo/UpdateTodo", form);
    Store.commit("application/GlobalDrawer_SetActive", false);
    Store.commit("application/GlobalDrawer_SetComponent", undefined);
    Store.commit("todo/SetEditItemId",undefined);
}
</script>