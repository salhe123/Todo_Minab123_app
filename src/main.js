import { createApp, provide, h } from 'vue';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import App from './App.vue';
import './style.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloclient from './ApolloClient';
import routers from './routers';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloclient);
  },
  render: () => h(App),
});

app.mount('#app');
app.use(router);
