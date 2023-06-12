<template>
  <div>
    <UserList />
  </div>
  <footer>
    <div class="bg-neutral-400">
    <div class="text-center pt-28">
      <a href="https://www.figma.com/file/kZF6axTkpCRmHqmCA41k5h/CMS?type=design&node-id=0-1&t=c3y5X6M7L9RE7h9E-0" target="_blank" rel="noopener noreferrer">
        figma
      </a>
      <a href="https://github.com/salhe123/Todo_app" target="_blank" rel="noopener noreferrer">
        github
      </a>
    </div>
  </div>
  </footer>
</template>

<script>
import UserList from './components/UserList.vue';
export default {
  components: {
    UserList,
  },
};
</script>
