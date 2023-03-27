<template>
    <v-dialog v-model="TodoDialog" persistent width="600">
        <v-card>
            <v-card-title class="text-h5">
                Add a New Todo
            </v-card-title>
            <v-card-text>
                <v-form class="w-100 d-flex flex-row flex-wrap">
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
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-accent-2" variant="text" @click="ClearAndClose">
                    Cancel
                </v-btn>
                <v-btn color="primary" variant="text" @click="Save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
// Core
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-dom';
// Models
import { Todo } from '../store/todo/models/todo.model';
import { TodoState } from '../store/todo/models/todo.state.enum';
import { v4 as uuidv4 } from 'uuid';
// Validation
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators'

//#region [Store]

const Store = useStore();
const TodoDialog = computed({
    get: (): boolean => { return Store.getters["application/TodoDialog"] as boolean },
    set: (value: boolean): void => { Store.commit("application/SetTodoDialog", value) }
});
const Tags = computed(() => Store.getters["todo/Tags"] as string[]);

//#endregion


const form = reactive({
    Description: '',
    Tags: [],
    State: TodoState.Todo,
    Id: uuidv4(),
    Title: ''
} as Todo);

const rules = {
    Title: { required },
}
const v$ = useVuelidate(rules, form)

onMounted(() => {
    Store.dispatch("todo/FetchTags");
})

async function Save() {
    const result = await v$.value.$validate();
    if (!result) return;
    Store.dispatch("todo/AddNewTodo", {
        Id: form.Id,
        Description: form.Description,
        State: form.State,
        Tags: form.Tags,
        Title: form.Title
    } as Todo);
    ClearAndClose();
}
function ClearAndClose() {
    form.Id = uuidv4();
    form.Title = '';
    form.Tags = [];
    v$.value.$reset();
    TodoDialog.value = false;
}
function OpenTagDialog() {
    Store.commit("application/SetTagDialog", true);
}

</script>