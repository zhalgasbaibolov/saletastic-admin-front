<template>
  <div>
    <h2>Shopify Settings</h2>
    <v-form ref="form" class="mb-4">
      <v-text-field
        v-model="settings.shopify.storeMyShopify"
        label="shopify admin url"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.externalUrl"
        label="shopify store url"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.storeAPIkey"
        label="Store API admin key"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.storePassword"
        label="Store API admin secret"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.accessToken"
        label="Store API access token"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.apiVersion"
        label="api version"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.priceRuleId"
        label="price rule id"
        required
      ></v-text-field>
      <v-btn color="primary" class="mr-4" @click="saveShopify">
        Save changes
      </v-btn>
      <v-btn @click="reloadShopify"> Reload </v-btn>
    </v-form>

    <h2>Twilio Settings</h2>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="settings.twilio.joinWord"
        label="how to join"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.accountSid"
        label="Account SID"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.authToken"
        label="Token"
        required
      ></v-text-field>
      <v-btn color="primary" class="mr-4" @click="saveTwilio">
        Save changes
      </v-btn>
      <v-btn @click="reloadTwilio"> Reload </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    settings: {
      twilio: {},
      shopify: {},
    },
  }),
  mounted() {
    window.test = this
  },
  methods: {
    saveTwilio() {},
    reloadTwilio() {},
    saveShopify() {},
    reloadShopify() {},
  },
}
</script>
<style scoped>
.v-card {
  padding: 8px;
}
</style>