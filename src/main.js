import { createApp, provide, h } from 'vue';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import './style.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloclient from './ApolloClient';
import router from './routers'; 
import AddUser from './components/AddUser.vue'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloclient);
  },
  render: () => h(App),
});
app.component('AddUser',AddUser)
app.use(router); 
app.mount('#app');
