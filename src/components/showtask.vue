<template>
  <div>
    <h1 class="stroke-zinc-600 text-black ml-5 text-lg">User Todos</h1>
    <div v-if="result && result.user">
      <h2>{{ fname }}</h2>
      <ul>
        <li v-for="todo in result.user.todos" :key="todo.id">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
          <p>{{ todo.completed ? 'Completed' : 'Not Completed' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const fname = route.props.fname;

const { result, refetch } = useQuery(gql`
  query GetUserTodos($id: Int!) {
    user(id: $id) {
      id
      todos {
        id
        title
        description
        completed
      }
    }
  }
`, {
  variables() {
    return {
      id: computed(() => parseInt(route.params.id)),
    };
  },
});

onMounted(() => {
  refetch();
});
</script>
