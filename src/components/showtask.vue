<template>
  <div class="bg-neutral-400 text-center">
    <h1 class="bg-neutral-400 text-left pt-10 ml-28 font-bold h-14 text-3xl">{{ user && user.fname }}'s Todos:</h1>
    <ul v-if="user && user.users_todos">
      <li class=" pt-20 pb-5" v-for="todo in user && user.users_todos" :key="todo.id">
        <h2 class=" pt-10">Title:{{ todo.title }}</h2>
        <p class=" pt-24 pb-5">{{ todo.description }}</p>
        <p>Completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
      </li>
    </ul>
    <button class="hover:bg-neutral-400 text-red-600 font-bold py-2 px-4 rounded ml-5 pt-3 " @click="handleBack">Back</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const route = useRoute();
const router = useRouter();

const userId = parseInt(route.params.id);

const { result } = useQuery(gql`
  query GetUserTodos($userId: Int!) {
    users_by_pk(id: $userId) {
      fname
      users_todos {
        id
        title
        description
        completed
      }
    }
  }
`, {
  userId
});

const user = result.value?.users_by_pk;

// Handle navigation back to UserList.vue
const handleBack = () => {
  router.push({ name: 'UserList' });
};
</script>
