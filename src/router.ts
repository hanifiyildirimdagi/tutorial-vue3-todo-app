import * as VueRouter from "vue-router";
import {RouteConstants} from "./constants/route.constants";

export const ApplicationRouter = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: RouteConstants
});