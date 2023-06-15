<template>
  <body class="bg-neutral-400">
    <div>
      <h1 class="bg-neutral-400">Edit User</h1>
      <form @submit.prevent="handleEdit">
        <label for="fname">First Name:</label>
        <input type="text" id="fname" v-model="formData.fname" required>
        
        <label for="lname">Last Name:</label>
        <input type="text" id="lname" v-model="formData.lname" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </body>
  </template>
  
  <script>
  import { useQuery, useMutation } from '@vue/apollo-composable';
  import { gql } from 'graphql-tag';
  
  export default {
    name: 'EditUser',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { result } = useQuery(gql`
        query GetUser($id: Int!) {
          user_by_pk(id: $id) {
            id
            fname
            lname
            email
          }
        }
      `, {
        id: parseInt(props.id),
      });
      
      const UPDATE_USER = gql`
        mutation updateUser($id: Int!, $fname: String!, $lname: String!, $email: String!) {
          update_users_by_pk(pk_columns: { id: $id }, _set: { fname: $fname, lname: $lname, email: $email }) {
            id
            fname
            lname
            email
          }
        }
      `;
      
      const { mutate: updateUser } = useMutation(UPDATE_USER);
      
      const formData = reactive({
        fname: '',
        lname: '',
        email: '',
      });
      
      watch(result, () => {
        if (result.value) {
          const user = result.value.user_by_pk;
          formData.fname = user.fname;
          formData.lname = user.lname;
          formData.email = user.email;
        }
      });
      
      const handleEdit = async () => {
        try {
          await updateUser({
            id: parseInt(props.id),
            fname: formData.fname,
            lname: formData.lname,
            email: formData.email,
          });
          
          console.log('User updated successfully');
          
          // Optionally, navigate back to the user list or show a success message
        } catch (error) {
          console.error('Error updating user:', error);
          
          // Optionally, show an error message to the user
        }
      };
      
      return {
        formData,
        handleEdit,
      };
    },
  };
  </script>
  