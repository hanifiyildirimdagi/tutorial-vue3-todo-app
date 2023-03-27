<template>
    <v-app-bar class="px-3" flat density="compact">
        <v-btn color="primary" icon="mdi-menu" class="d-block d-lg-none"></v-btn>
        <v-spacer></v-spacer>

        <v-tabs centered density="compact" class="d-none d-lg-block">
            <v-tab to="/"> TO-DO LIST
            </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>

        <v-btn color="primary" class="d-none d-lg-block" size="small" variant="outlined" rounded="pill"
            @click="OpenTodoDialog">Add
            New</v-btn>
        <v-btn color="primary" size="32" variant="tonal" class="d-block d-lg-none" @click="OpenTodoDialog">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>
</template>


<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { RouteConstants } from '../../constants/route.constants';

const links = RouteConstants.filter(x => x.alias != "Detail");
const Store = useStore();

function OpenTodoDialog() {
    Store.commit("application/SetTodoDialog", true)
}
</script>