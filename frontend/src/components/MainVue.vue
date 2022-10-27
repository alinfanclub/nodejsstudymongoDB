<template>
  <div>
    <p>main</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  created() {
    this.$store.dispatch("SET_USER_DATA");
  },
};
</script>

<style></style>
