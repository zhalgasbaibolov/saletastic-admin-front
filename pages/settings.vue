<template>
  <div>
    <h2>Shopify Settings</h2>
    <v-form ref="form" class="mb-4" autocomplete="off">
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
    <v-form ref="form" lazy-validation autocomplete="off">
      <v-text-field
        v-model="settings.twilio.accountSid"
        label="Account SID"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.authToken"
        type="password"
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
/* eslint-disable no-console */
export default {
  data: () => ({
    settings: {
      memberstackId: '',
      twilio: {},
      shopify: {},
    },
  }),
  created() {
    this.loadSettings()
  },
  mounted() {
    window.test = this
    this.loadSettings()
  },
  methods: {
    loadSettings() {
      this.$axios.get('/api/settings').then((res) => {
        console.log(res)
        this.settings = (res && res.data) || null
      })
    },
    saveTwilio() {
      this.$axios
        .$post('api/settings/twilio', this.settings.twilio)
        .then(() => {
          alert('twilio settings saved')
        })
        .catch(() => {
          alert('error on saving')
        })
    },
    reloadTwilio() {},
    saveShopify() {
      this.$axios
        .$post('api/settings/shopify', this.settings.shopify)
        .then(() => {
          alert('shopify settings saved')
        })
        .catch(() => {
          alert('error on saving')
        })
    },
    reloadShopify() {},
  },
}
</script>
<style scoped>
.v-card {
  padding: 8px;
}
</style>