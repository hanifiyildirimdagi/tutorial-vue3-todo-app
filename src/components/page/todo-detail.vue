<template>
    work {{ form }} --- {{ Tags }}
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import { Todo } from "../../store/todo/models/todo.model";
import { onMounted,onActivated } from "@vue/runtime-dom";
import { reactive, computed } from "@vue/reactivity";

const route = useRoute();
const Store = useStore();
const Tags = computed(() => Store.getters["todo/Tags"] as string[]);

let form = reactive({});

onMounted(() => {
    Store.dispatch("todo/FetchTags");
    const Id = route.query["id"] as string;
    const items = Store.getters["todo/Items"] as Todo[];
    const item = items.find(x => x.Id == Id);
    form = reactive({ ...item });
});

</script>