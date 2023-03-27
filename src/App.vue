<template>
  <v-app id="inspire">
    <app-header />

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-sheet min-height="70vh" rounded="lg">
              <router-view v-slot="{ Component }">
                <transition name="fade">
                  <component :is="Component" />
                </transition>
              </router-view>
            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
    <add-todo />
    <app-global-drawer />
    <add-tag />
  </v-app>
</template>

<script setup lang="ts">
// Core
import { useStore } from 'vuex';
// Components
import AppHeader from './components/layout/app-header.vue';
import AppGlobalDrawer from './components/layout/app-global-drawer.vue';
import AddTag from './components/add-tag.vue';
// Models
import AddTodo from './components/add-todo.vue';


const Store = useStore();



</script>
