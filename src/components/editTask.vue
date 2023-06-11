<template>
    <div>
      <h2 class="text-bold text-black">Edit Task</h2>
      <form @submit="updateTask">
        <label>Title</label>
        <input v-model="taskTitle" type="text" placeholder="Enter task title" />
  
        <label>Description</label>
        <textarea v-model="taskDescription" placeholder="Enter task description"></textarea>
  
        <button type="submit">Update Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useMutation, useQuery } from '@apollo/client';
  import { gql } from 'graphql-tag';
  import { useRouter } from 'vue-router';
  
  const GET_TASK = gql`
    query GetTask($taskId: UUID!) {
      todo_by_pk(id: $taskId) {
        id
        title
        description
      }
    }
  `;
  
  const UPDATE_TASK = gql`
    mutation UpdateTask($taskId: UUID!, $title: String!, $description: String!) {
      update_todo_by_pk(pk_columns: { id: $taskId }, _set: { title: $title, description: $description }) {
        id
        title
        description
      }
    }
  `;
  
  export default {
    setup() {
      const router = useRouter();
      const taskId = router.currentRoute.value.params.taskId;
  
      const { data: { todo_by_pk: task } = {}, error, loading } = useQuery(GET_TASK, {
        variables: { taskId },
      });
  
      const [updateTask] = useMutation(UPDATE_TASK, {
        update(cache, { data: { update_todo_by_pk: updatedTask } }) {
          // Update the cached task with the updated task details
          cache.modify({
            id: cache.identify(updatedTask),
            fields: {
              title() {
                return updatedTask.title;
              },
              description() {
                return updatedTask.description;
              },
            },
          });
  
          // Redirect back to the UserTaskView
          router.push({ name: 'UserTaskView', params: { userId: updatedTask.userId } });
        },
      });
  
      const taskTitle = ref(task ? task.title : '');
      const taskDescription = ref(task ? task.description : '');
  
      const updateTask = () => {
        // Call the mutation to update the task
        updateTask({
          variables: {
            taskId,
            title: taskTitle.value,
            description: taskDescription.value,
          },
        });
      };
  
      return {
        task,
        loading,
        error,
        taskTitle,
        taskDescription,
        updateTask,
      };
    },
  };
  </script>
  