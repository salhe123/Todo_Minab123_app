<template>
  <div>
    <h1 class="stroke-zinc-600 text-black ml-5 text-lg">User's Todo List</h1>
    <ul class="ml-5 pt-5" v-if="selectedUser && selectedUser.todos">
      <li v-for="todo in selectedUser.todos" :key="todo.id">
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
        <p>Status: {{ todo.completed ? 'Completed' : 'Incomplete' }}</p>
      </li>
    </ul>
    <div v-else>
      <p>No user selected or user has no todos.</p>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { gql } from 'graphql-tag';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const userId = parseInt(route.params.id);

const { result } = useQuery(gql`
  query GetUserTodos($userId: Int!) {
    user(id: $userId) {
      id
      fname
      todos {
        id
        title
        description
        completed
      }
    }
  }
`, {
  userId: computed(() => userId.value), // Use userId.value to access the reactive value
});

const selectedUser = computed(() => result.value?.user);

</script>
