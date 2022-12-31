<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
        <styled-button @click="$router.push('/posts')">Пользователи</styled-button>
        <styled-button @click="$router.push('/about')">О нас</styled-button>
        <styled-button @click="$router.push('/store')">Посты со стором</styled-button>
        <styled-button @click="$router.push('/composition')">Посты с композицией</styled-button>
    </div>
  </div>
</template>

<script>
import StyledButton from '@/components/UI/StyledButton';
export default {
  components: {StyledButton}
}
</script>

<style scoped>
  .navbar {
    height: 50px;
    background: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar__btns {
    margin-left: auto;
  }

  .navbar__btns button {
    margin-left: 5px;
    margin-top: 0;
  }
</style>