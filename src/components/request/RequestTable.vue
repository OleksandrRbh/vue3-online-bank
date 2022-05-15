<template>
  <h4 v-if="requests.length === 0" class="text-center">No requests yet</h4>
  <table v-else class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(r, idx) in requests" :key="r.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ r.fio }}</td>
      <td>{{ r.phone }}</td>
      <td>{{ currency(r.amount) }}</td>
      <td><app-status :type="r.status" /></td>
      <td>
        <router-link v-slot="{ navigate }" custom :to="{ name: 'Request', params: { id: r.id }}">
          <button class="btn" @click="navigate">Open</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import {currency} from "../../utils/currency";
  import AppStatus from "../ui/AppStatus";

  export default {
    props: ['requests'],
    components: {
      AppStatus
    },
    setup () {
      return { currency }
    }
  }
</script>

<style scoped>

</style>
