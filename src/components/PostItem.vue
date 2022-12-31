<template>
 <div class="post">
   <div>
     <div><strong>id:</strong> {{ post.id }}</div>
     <div><strong>Название:</strong> {{ post.title }}</div>
     <div><strong>Описание:</strong> {{ post.body }}</div>
   </div>
   <div class="post__btns">
     <styled-button
         @click="$router.push(`/posts/${ post.id }`)"
     >
       Открыть
     </styled-button>
    <styled-button
      @click="$emit('delete')"
    >
      Удалить
    </styled-button>
   </div>
 </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

 .post__btns {
   display: flex;
 }

</style>