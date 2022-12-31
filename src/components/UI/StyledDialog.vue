<template>
  <div class="dialog" v-if="show" @click="hideDialog">
      <div class="dialog__content" @click.stop>
        <slot></slot>
      </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'styled-dialog',
  mixins: [
      toggleMixin
  ]
}
</script>

<style scoped>
  .dialog {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog__content {
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-width: 300px;
    min-height: 50px;
    padding: 20px;
  }

</style>