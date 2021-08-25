<template>
  <div>
    <h1>Shopify Login page(install)</h1>
    <br />
    <v-form ref="form" class="mb-4" autocomplete="off">
      <v-text-field
        v-model="storeUrl"
        label="Shopify Store URL"
        required
        outlined
      ></v-text-field>
    </v-form>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {}
</script>