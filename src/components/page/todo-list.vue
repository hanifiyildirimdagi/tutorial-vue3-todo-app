
<template>
    <v-card>
        <v-card-title class="d-flex flex-wrap align-center">
            <v-col cols="12" md="2" class="pa-0 ma-0 text-center">To-Do List</v-col>
            <v-col cols="12" md class="d-flex pa-0 ma-0">
                <v-text-field v-model="form.search" prepend-inner-icon="mdi-magnify" hide-details variant="solo" rounded
                    placeholder="Search according to the title..." label="Search" single-line></v-text-field>
            </v-col>
            <v-col cols="12" md="2" class="py-0 ma-0 justify-center">
                <v-switch :label="form.completed ? 'Completeds' : 'Todos'" v-model="form.completed" hide-details></v-switch>
            </v-col>
        </v-card-title>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="TodoItems" item-key="Id"
            :search="form.search" class="d-none d-md-block">
            <template v-slot:item.Check="item">
                <v-checkbox hide-details :model-value="item.item.value.State == 1" @change="ChangeState(item.item.value.Id)"
                    :name="item.item.value.Id"></v-checkbox>
            </template>
            <template v-slot:item.Title="item">
                {{ item.item.value.Title }}
                <!-- <router-link :to="'detail?id=' + item.item.value.Id">{{ item.item.value.Title }}</router-link> -->
            </template>
            <template v-slot:item.Tags="item">
                <v-chip v-for="tag in item.item.value.Tags" :key="tag" size="small" class="mr-2">{{ tag }}</v-chip>
            </template>
            <template v-slot:item.State="item">
                <v-chip size="small" class="mr-2" :color="item.item.value.State ? 'success' : 'primary'">{{
                    item.item.value.State == 0 ? "Todo" : "Completed" }}</v-chip>
            </template>
            <template v-slot:item.Id="item">
                <div class="w-100 d-flex flex-wrap align-center">
                    <v-btn icon="mdi-pencil" variant="text" color="primary" size="small"
                        @click="Edit($event, item.item.value.Id)"></v-btn>
                    <v-btn icon="mdi-delete" variant="text" color="red-accent-2" size="small"
                        @click="Delete($event, item.item.value.Id)"></v-btn>
                </div>
            </template>
        </v-data-table>
        <div class="w-100 d-flex flex-column d-block d-md-none">
            <v-card v-for="item in TodoItems" :key="item.Id" class="border mt-4">
                <v-card-actions class="justify-end py-0">
                    <v-checkbox hide-details class="flex-shrink-1 mr-auto" v-bind:model-value="item.State == 1"
                        @change="ChangeState(item.Id)"></v-checkbox>
                    <v-btn icon="mdi-pencil" variant="text" color="primary" size="x-small"
                        @click="Edit($event, item.Id)"></v-btn>
                    <v-btn icon="mdi-delete" variant="text" color="red-accent-2" size="x-small"
                        @click="Delete($event, item.Id)"></v-btn>
                </v-card-actions>
                <v-card-title class="d-flex flex-wrap align-center">
                    <p class="ma-0 flex-grow-1" v-if="item.State == 0"> {{ item.Title }}</p>
                    <s class="ma-0 flex-grow-1" v-else>{{ item.Title }}</s>
                </v-card-title>
                <v-card-text>
                    <v-chip size="small" v-for="tag in item.Tags" :key="tag"> <router-link :to="'detail?id=' + item.Id">{{
                        item.Title }}</router-link></v-chip>
                </v-card-text>
            </v-card>
        </div>
    </v-card>
</template>

<script setup lang="ts">
// Core
import { computed, reactive } from '@vue/reactivity';
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-dom';
// Components
import EditTodo from '../edit-todo.vue';
// Models
import { Todo } from '../../store/todo/models/todo.model';
import { TodoState } from '../../store/todo/models/todo.state.enum';


const Store = useStore();
const TodoItems = computed(() => (Store.getters["todo/Items"] as Todo[]).filter(x => x.State == (form.completed ? TodoState.Completed : TodoState.Todo)));

//#region [ Table ]
const form = reactive({ search: '', completed: false });
const itemsPerPage = 10;
const headers: {
    title?: string,
    align?: string,
    sortable?: boolean,
    key?: string,
    width?: number
}[] = [
        {
            key: "Check",
            align: "left",
            title: "",
            sortable: false,
            width: 50
        },
        {
            key: "Title",
            align: "left",
            title: "Todo Title",
            sortable: true
        },
        {
            key: "Tags",
            align: "left",
            title: "Tags",
            sortable: false
        },
        {
            key: "State",
            align: "left",
            title: "State",
            sortable: false,
            width: 100
        },
        {
            key: "Id",
            align: "left",
            title: "",
            sortable: false,
            width: 150
        }
    ];
//#endregion

function Delete(event: Event, id: string): void {
    Store.dispatch("todo/DeleteTodo", id);
}
function Edit(event: Event, id: string): void {
    Store.commit("todo/SetEditItemId", id);
    Store.dispatch("application/OpenGlobalDrawer", EditTodo);
}
async function ChangeState(id: string) {
    const item = TodoItems.value.find(x => x.Id == id);
    if (!item) return;
    await new Promise((resolve) => {
        setTimeout(resolve, 500);
    })
    item.State = item.State == TodoState.Todo ? TodoState.Completed : TodoState.Todo;
    await Store.dispatch("todo/UpdateTodo", item);
}

onMounted(() => {
    Store.dispatch("todo/FetchTodo");
});


</script>