<template>
  <div>
    <h1>{{ user.fname }}'s Todos</h1>
    <ul>
      <li v-for="todo in user.users_todos" :key="todo.id">
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
        <p>Completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
      </li>
    </ul>
    <button @click="handleBack">Back</button>
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
  userId: $route.params.id,
});

const user = result.value?.users_by_pk;

// Handle navigation back to UserList.vue
const handleBack = () => {
  router.push({ name: 'UserList' });
};
</script>
