<template>
  <the-navbar />
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view />
  </div>
</template>

<script>
import AppMessage from '../components/ui/AppMessage'
import TheNavbar from '../components/TheNavbar'
import TheSidebar from "../components/TheSidebar";

export default {
  components: {TheSidebar, TheNavbar, AppMessage }
}
</script>

<style scoped>

</style>
