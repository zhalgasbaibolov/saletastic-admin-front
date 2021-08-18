<template>
  <div style="padding-bottom: 80px">
    <h2 style="margin-bottom: 10px">Shopify Settings</h2>
    <v-form ref="form" class="mb-4" autocomplete="off">
      <v-text-field
        v-model="settings.shopify.storeMyShopify"
        label="Shopify admin URL"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.externalUrl"
        label="Shopify store URL"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.storeAPIkey"
        label="Store API admin key"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.storePassword"
        label="Store API admin secret"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.accessToken"
        label="Store API access token"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.shopify.priceRuleId"
        label="Price rule id"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.joinWord"
        label="Join word"
        required
        outlined
      >
        <h3 slot="prepend">Join</h3>
      </v-text-field>
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
        : str.split('/')[0]
    },
    removeNotDigits(str) {
      return str ? str.replaceAll(/\D/g, '') : str
    },
    loadSettings() {
      this.$axios.get('/api/settings').then((res) => {
        console.log(res)
        if (res && res.data) {
          const settings = res.data
          settings.twilio.senderNumber =
            settings.twilio.senderNumber.replaceAll(/\D/g, '')
          settings.twilio.joinWord = settings.twilio.joinWord.replace(
            'join ',
            ''
          )
          this.settings = settings
        }
      })
    },
    saveTwilio() {
      this.settings.twilio.senderNumber =
        'whatsapp:+' + this.removeNotDigits(this.settings.twilio.senderNumber)

      this.settings.twilio.joinWord =
        'join ' + this.settings.twilio.joinWord.replace('join ', '')

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