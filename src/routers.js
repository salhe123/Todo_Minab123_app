import { createRouter, createWebHistory } from "vue-router";
import UserList from './components/UserList.vue';
import ShowTask from '@/components/ShowTask.vue';
import AddUser from './components/AddUser.vue';  
import EditUser from './components/EditUser.vue'   

const routes = [
    {
      path: '/',
      name: 'UserList',
      component: UserList,
    },
       {
          path: '/AddUser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: '/ShowTask/:id',
          name: 'ShowTask',
          component: ShowTask,
          props: true
        },
        
      {
        path:'/EditUser/:id',
        name:'EditUser',
        component:EditUser
      }
      
    
   
  ];
const router=createRouter(
    {
        history:createWebHistory(),
        routes
    }
);
export default router