<template>
  <app-loader v-if="loading" />
  <app-page :back="true" v-else-if="request" title="Request">
    <p><strong>Owner name</strong>: {{ request.fio }}</p>
    <p><strong>Phone</strong>: {{ request.phone }}</p>
    <p><strong>Amount</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Status</strong>: <app-status :type="request.status" /></p>

    <div class="form-control">
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="done">Finished</option>
        <option value="cancelled">Cancelled</option>
        <option value="active">Active</option>
        <option value="pending">In Process</option>
      </select>
    </div>

    <button v-if="hasChanges" class="btn" @click="update">Update</button>
    <button class="btn danger" @click="remove">Remove</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Request with ID {{ $route.params.id }} not found.
  </h3>
</template>

<script>
import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from "vuex";
import {currency} from "../utils/currency";
import AppPage from "../components/ui/AppPage";
import AppLoader from "../components/ui/AppLoader";
import AppStatus from "../components/ui/AppStatus";
import router from "../router";

export default {
  components: { AppPage, AppLoader, AppStatus },
  setup () {
    const loading = ref(false)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const status = ref()
    const request = ref(null)

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('requests/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('requests/removeOne', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = { ...request.value, status: status.value, id: route.params.id }
      await store.dispatch('requests/updateOne', data)
      request.value.status = status.value
    }

    return {
      loading,
      request,
      currency,
      update,
      remove,
      status,
      hasChanges
    }
  }
}
</script>

<style scoped>

</style>
