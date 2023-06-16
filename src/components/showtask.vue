<template>
  <div class="bg-neutral-400 text-center">
    <div class=" flex justify-end pt-3 mr-3">
  <h1>Task:</h1>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
  <path fill-rule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>
  </div>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
</svg>
  </div>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
</svg>
  </div>
</div>
    <h1 class="bg-neutral-400 text-left pt-10 ml-28 font-bold h-14 text-3xl" v-if="user">{{ user.fname }}'s Todos:</h1>
    <ul v-if="user && user.users_todos">
      <li class="pt-20 pb-5" v-for="todo in user.users_todos" :key="todo.id">
        <h2 class="pt-10">Title: {{ todo.title }}</h2>
        <p class="pt-24 pb-5">{{ todo.description }}</p>
        <p>Completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
      </li>
    </ul>
    <button class="hover:bg-neutral-400 text-red-600 font-bold py-2 px-4 rounded ml-5 pt-3" @click="handleBack">Back</button>
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

const handleBack = () => {
  router.push({ name: 'UserList' });
};
</script>
