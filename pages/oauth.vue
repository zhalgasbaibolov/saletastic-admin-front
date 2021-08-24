<template>
  <h1>oauth page</h1>
</template>
<script>
/* eslint-disable no-console */

export default {
  beforeMount() {
    localStorage.setItem(
      'shopify-access-token',
      this.$route.query['access-token']
    )
    this.$router.replace('/')
  },
}
</script>