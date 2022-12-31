<template>
  <div v-if="posts.length > 0">
    <h3>Список постов:</h3>
    <transition-group name="posts">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @delete="$emit('delete', post)"
      />
    </transition-group>
  </div>
  <h4 v-else style="color: red">
    Список пользователь пуст
  </h4>
</template>

<script>
import PostItem from '@/components/PostItem';
export default {

  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      require: true,
    }
  },
}
</script>

<style scoped>
  .posts-enter-active,
  .posts-leave-active {
    transition: all .5s ease;
  }
  .posts-enter-from,
  .posts-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .posts-move {
    transition: transform 0.4s ease;
  }
</style>