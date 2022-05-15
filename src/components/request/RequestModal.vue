<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: fError}">
      <label for="fio">Fullname</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Phone</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Amounts</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur">
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="done">Finished</option>
        <option value="cancelled">Cancelled</option>
        <option value="active">Active</option>
        <option value="pending">In Process</option>
      </select>
    </div>

    <button type="submit" class="btn primary" :disabled="isSubmitting">Create</button>
  </form>
</template>

<script>
  import { useRequestForm } from '../../use/request-form'
  import { useStore } from 'vuex'

  export default {
    emits: ['created'],
    setup (_, { emit }) {
      const store = useStore()

      const submit = async values => {
        console.log('values', values)
        await store.dispatch('requests/create', values)
        emit('created')
      }

      return {
        ...useRequestForm(submit)
      }
    }
  }
</script>

<style scoped>

</style>
