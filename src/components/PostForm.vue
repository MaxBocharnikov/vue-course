<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <styled-input
        v-focus
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Название поста"
    />
    <styled-input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание"
    />
    <styled-button
        style="align-self: flex-end"
        @click="createPost"
    >
      Создать
    </styled-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },

  methods: {
    createPost() {
        this.post.id = Date.now();
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: '',
        }
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
</style>