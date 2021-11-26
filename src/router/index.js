import * as VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Preview from "../views/Preview.vue";
import List from '../views/List.vue';

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
        },
        {
            path: "/preview",
            name: "preview",
            component: Preview,
        },
        {
            path: "/list",
            name: "list",
            component: List,
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/'
        }
    ]
});