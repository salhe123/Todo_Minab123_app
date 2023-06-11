import { createRouter,createWebHistory } from "vue-router";
import AddUser from './components/AddUser.vue';
const routes=[
    {
        path:'/AddUser',
        component:AddUser
    },
];
const router=createRouter(
    {
        history:createWebHistory(),
        routes
    }
);
export default router