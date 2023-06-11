<template>
    <div>
      <h2 class="text-end">User</h2>
      <div>
        <h1 class="text-bold text-black ml-20 pt-10 bg-gray-500">User List</h1>
        <ul>
          <li v-for="user in userList" :key="user.id">
            <h3>{{ user.fname }}</h3>
            <ul>
              <li v-for="todo in user.todos" :key="todo.id">
                {{ todo.title }} - {{ todo.description }}
              </li>
            </ul>
            <button @click="deleteUser(user.id)">Delete</button>
            <button @click="editUser(user)">Edit</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useQuery, useMutation } from '@vue/apollo-composable';
  import { gql } from 'graphql-tag';
  
  const GET_USERS = gql`
    query GetUsers {
      users {
        id
        fname
        email
        todos {
          id
          title
          description
          completed
        }
      }
    }
  `;
  
  const DELETE_USER = gql`
    mutation DeleteUser($userId: Int!) {
      delete_users_by_pk(id: $userId) {
        id
      }
    }
  `;
  
  const { result, refetch } = useQuery(GET_USERS);
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
  
  const userList = ref([]);
  
  const handleDelete = async (userId) => {
    try {
      await deleteUser({ userId });
      console.log('User deleted:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  onMounted(async () => {
    await refetch();
    if (result.value) {
      userList.value = result.value.users;
    }
  });
  
  const editUser = (user) => {
    // Implement your logic for editing the user here
    console.log('Editing user:', user);
  };
  </script>
  