<template>
  <app-loader v-if="loading" />
  <app-page title="Applications list" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Create</button>
    </template>

    <request-filter v-model="filter" />
    <request-table :requests="requests" />

    <teleport to="body">
      <app-modal v-if="modal" title="Create request" @close="modal = false">
        <request-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import {useStore} from "vuex";

import AppPage from "../components/ui/AppPage";
import RequestTable from "../components/request/RequestTable";
import RequestModal from "../components/request/RequestModal";
import RequestFilter from "../components/request/RequestFilter";
import AppModal from "../components/ui/AppModal";
import AppLoader from "../components/ui/AppLoader";

export default {
  name: 'Home',
  components: {
    AppLoader,
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    RequestFilter
  },
  setup () {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('requests/load')
      loading.value = false
    })

    const requests = computed(() => {
      return store.getters['requests/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio.toLowerCase().includes(filter.value.name.toLowerCase())
          }
          return request
        })
        .filter(request => {
          if (filter.value.status) {
            return filter.value.status === request.status
          }
          return request
        })
    })

    return {
      modal,
      requests,
      loading,
      filter
    }
  }
}
</script>
