<template>
    <div>
      <h2 class="text-bold text-black">User Tasks</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          {{ task.title }}
          <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useQuery, useMutation } from '@apollo/client';
  import { gql } from 'graphql-tag';
  
  export default {
    data() {
      return {
        tasks: [],
      };
    },
    apollo: {
      tasks: {
        query: gql`
          query GetUserTasks($userId: UUID!) {
            todos(where: { user_id: { _eq: $userId } }) {
              id
              title
              description
            }
          }
        `,
        variables() {
          return {
            userId: this.$route.params.userId, // Assumes you're using Vue Router to get the user ID from the route params
          };
        },
      },
    },
    methods: {
      async deleteTask(taskId) {
        try {
          const { data } = await this.$apollo.mutate({
            mutation: gql`
              mutation DeleteTask($taskId: UUID!) {
                delete_todos_by_pk(id: $taskId) {
                  id
                }
              }
            `,
            variables: {
              taskId,
            },
          });
          if (data.delete_todos_by_pk) {
            // Task successfully deleted, update the local tasks array
            this.tasks = this.tasks.filter(task => task.id !== taskId);
          }
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  