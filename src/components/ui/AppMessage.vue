<template>
  <div v-if="message" :class="['alert', message.type]">
    <p
      v-if="title"
      class="alert-title">
      {{ title }}
    </p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()

    const TITLE_MAP = {
      primary: 'Success!',
      danger: 'Error!',
      warning: 'Attention!'
    }

    const message = computed(() => store.state.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    return {
      message,
      title,
      close: () => store.commit('CLEAR_MESSAGE')
    }
  }
}
</script>

<style scoped>

</style>
