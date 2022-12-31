<template>
  <div class="page__wrapper">
      <div
        v-for="page of totalPages"
        @click="$emit('changePage', page)"
        :key="page"
        class="page"
        :class="{
          'current': currentPage === page
        }"
      >
        {{ page }}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    border: 1px solid #000;
    padding: 10px;
    margin-right: 3px;
    cursor: pointer;
  }

  .current {
    border: 2px solid green;
    color: green;
  }
</style>