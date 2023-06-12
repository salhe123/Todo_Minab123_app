<template>
  
  <div class="bg-neutral-400">
    <div class= "text-end pt-5">
 <RouterLink class="inline-block mr-5 bg-zinc-950 rounded text-white" :to="{ name: 'AddUser'}"><svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
</svg></RouterLink>
  </div>
  
  <div>
    <h1 class="stroke-zinc-600 text-black ml-5 text-lg">Users</h1>
    <ul class="grid grid-cols-3 gap-1">
      <li class="ml-5 pt-5" v-for="user in result && result.users" :key="user.id"> 
          <button @click="handleDelete(user.id)"> <svg class="w-2 ml-10 pt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

</button>
       <RouterLink :to="{ name: 'ShowTask', params: { id: user.id } }"> <svg class="w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
</svg>
{{ user.fname }}</RouterLink>
        <button @click="handleDelete(user.id)"> <svg class="w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></button>
      </li>
    </ul>
  </div>
  </div>
</template>

<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const { result, refetch } = useQuery(gql`
  query GetUsers {
    users {
      id
      fname
    }
  }
`);

const DELETE_USER = gql`
  mutation DeleteUser($userId: Int!) {
    delete_users_by_pk(id: $userId) {
      id
    }
  }
`;

const { mutate: deleteUser } = useMutation(DELETE_USER, {
  update(cache, { data: { delete_users_by_pk } }) {
    cache.modify({
      fields: {
        users(existingUsers = [], { readField }) {
          return existingUsers.filter((user) => user.id !== readField('id', delete_users_by_pk));
        },
      },
    });
  },
});

// Function to handle the delete operation
const handleDelete = async (userId) => {
  try {
    // Delete todos associated with the user
    await deleteTodosByUserId(userId);

    // Delete the user
    await deleteUser({ userId });

    console.log('User deleted:', userId);
    refetch();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const deleteTodosByUserId = async (userId) => {
  const DELETE_TODOS_BY_USER_ID = gql`
    mutation DeleteTodosByUserId($userId: Int!) {
      delete_todo(where: { user_id: { _eq: $userId } }) {
        affected_rows
      }
    }
  `;

  const { mutate } = useMutation(DELETE_TODOS_BY_USER_ID);
  await mutate({ userId });
};

</script>