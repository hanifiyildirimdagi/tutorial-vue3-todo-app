<template>
    <v-navigation-drawer v-model="Active" location="right" temporary width="400">
        <component :is="GlobalDrawer.component" v-if="GlobalDrawer.component" />
    </v-navigation-drawer>
</template>


<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { GlobalDrawer } from '../../store/application/models/application.state';

const Store = useStore();

const GlobalDrawer = computed(() => Store.getters["application/GlobalDrawer"] as GlobalDrawer);
const Active = computed({
    get: () => GlobalDrawer.value.active,
    set: (value: boolean) => {
        //Close Drawer
        Store.commit("application/GlobalDrawer_SetActive", value);
        //Remove Component
        Store.commit("application/GlobalDrawer_SetComponent", undefined);
    }
})

</script>