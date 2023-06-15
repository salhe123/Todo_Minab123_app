<template>
  <div class="bg-neutral-400">
    <div class="hover:bg-neutral-400 text-red-600 font-bold py-2 px-4 rounded ml-5 pt-3">
      <router-link :to="{ name: 'UserList' }">Home</router-link>
    </div>
  </div>
  <div class="bg-neutral-400 text-center">
    <h1 class="pb-36">Add User</h1>
    <form @submit="submitForm" class="inline-block rounded-lg bg-white p-4">
      <div class="mb-4">
        <input class="bg-red-200 rounded-lg px-4 py-2 w-full" type="text" id="fname" placeholder="Firstname" v-model="firstName" />
      </div>
      <div class="mb-4">
        <input class="bg-red-200 rounded-lg px-4 py-2 w-full" type="email" id="email" placeholder="Email" v-model="email" />
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add User</button>
    </form>
    <div v-if="success" class="text-green-500 mt-4">User added successfully</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const firstName = ref('');
const email = ref('');
const success = ref(false);

const { mutate } = useMutation(gql`
  mutation InsertUsers($id: Int, $email: String, $fname: String) {
    insert_users(objects: { id: $id, email: $email, fname: $fname }) {
      affected_rows
    }
  }
`);

const submitForm = async (event) => {
  event.preventDefault();

  if (firstName.value && email.value) {
    const variables = {
      email: email.value,
      fname: firstName.value,
    };

    try {
      const response = await mutate(variables);

      if (response.data.insert_users.affected_rows > 0) {
        // User added successfully
        success.value = true;
        console.log('User added successfully');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  } else {
    console.warn('Please fill in all fields');
  }
};
</script>
