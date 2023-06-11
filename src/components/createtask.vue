<template>
  <div>
    <h2>Add Todo</h2>
    <form @submit="submitForm">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" required />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const ADD_TODO = gql`
  mutation AddTodo($userId: Int!, $title: String!, $description: String!) {
    insert_todos_one(object: { user_id: $userId, title: $title, description: $description }) {
      id
      title
      description
      completed
    }
  }
`;

const title = ref('');
const description = ref('');

const { mutate: addTodo } = useMutation(ADD_TODO);

const submitForm = async (event) => {
  event.preventDefault();

  try {
    const result = await addTodo({
      userId: 1, // Replace with the actual user ID
      title: title.value,
      description: description.value,
    });
    console.log('Todo added successfully:', result);
    title.value = ''; // Reset the form field
    description.value = ''; // Reset the form field

    // Emit an event or call a method in the parent component (userlist.vue) to update the user's todo list
    // Example: this.$emit('todoAdded', result.data.insert_todos_one)
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};
</script>
