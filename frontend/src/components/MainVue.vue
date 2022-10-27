<template>
  <div>
    <div v-for="user in this.$store.state.user.users" :key="user">
      <p>{{ user.username }}</p>
      <small>{{ `${user.name.first} ${user.name.last}` }}</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("SET_USER_DATA");
  },
};
</script>

<style></style>
