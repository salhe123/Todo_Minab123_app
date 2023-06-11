<template>
  <div>
    <h2>Add User</h2>
    <form @submit="submitForm">
      <div>
        <label for="fname">First Name:</label>
        <input type="text" id="fname" v-model="firstName" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const ADD_USER = gql`
  mutation AddUser($fname: String!, $email: String!) {
    insert_users_one(object: { fname: $fname, email: $email }) {
      id
      fname
      email
    }
  }
`;

const firstName = ref('');
const email = ref('');

const { mutate: addUser } = useMutation(ADD_USER);

const submitForm = async (event) => {
  event.preventDefault();

  try {
    const { data } = await addUser({ fname: firstName.value, email: email.value });
    console.log('User added successfully:', data.insert_users_one);
    firstName.value = ''; // Reset the form field
    email.value = ''; // Reset the form field
    // Emit an event to notify the userlist.vue component about the new user added
    emit('userAdded', data.insert_users_one);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
</script>
