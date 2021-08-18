<template>
  <div style="padding-bottom: 80px">
    <h2>Settings</h2>
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

      <!-- <v-select
        v-model="select"
        :hint="`${select.state}, ${select.abbr}`"
        :items="items"
        item-text="state"
        item-value="abbr"
        label="Select"
        persistent-hint
        return-object
        single-line
      ></v-select> -->
      <v-text-field
        v-model="settings.shopify.priceRuleId"
        label="price rule id"
        required
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.joinWord"
        label="join word"
        required
      ></v-text-field>
      <v-btn color="primary" class="mr-4" @click="saveShopify">
        Save changes
      </v-btn>
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
    select: { state: 'Florida', abbr: 'FL' },
    items: [
      { state: 'Florida', abbr: 'FL' },
      { state: 'Georgia', abbr: 'GA' },
      { state: 'Nebraska', abbr: 'NE' },
      { state: 'California', abbr: 'CA' },
      { state: 'New York', abbr: 'NY' },
    ],
  }),
  created() {
    this.loadSettings()
  },
  mounted() {
    window.test = this
    this.loadSettings()
  },
  methods: {
    removeProtocol(str) {
      return str && str.startsWith('http')
        ? new URL(str).host
        : str.replaceAll('/', '')
    },
    removeNotDigits(str) {
      return str ? str.replaceAll(/\D/g, '') : str
    },
    loadSettings() {
      this.$axios.get('/api/settings').then((res) => {
        console.log(res)
        if (res && res.data) this.settings = res.data
      })
    },
    saveTwilio() {
      this.settings.twilio.senderNumber = this.removeNotDigits(
        this.settings.twilio.senderNumber
      )
      this.$axios
        .$post('api/settings/twilio', this.settings.twilio)
        .then(() => {
          alert('twilio settings saved')
        })
        .catch(() => {
          alert('error on saving')
        })
    },
    saveShopify() {
      this.saveTwilio()
      this.settings.shopify.externalUrl = this.removeProtocol(
        this.settings.shopify.externalUrl
      )
      this.$axios
        .$post('api/settings/shopify', this.settings.shopify)
        .then(() => {
          alert('shopify settings saved')
        })
        .catch(() => {
          alert('error on saving')
        })
    },
  },
}
</script>
<style scoped>
.v-card {
  padding: 8px;
}
</style>