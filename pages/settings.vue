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
        label="Price rule id"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="settings.twilio.joinWord"
        label="Join word"
        required
      >
        <h3 slot="prepend">join</h3>
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
      sandboxUser: true,
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
      const twilioSettings = { ...this.settings.twilio }
      twilioSettings.senderNumber =
        'whatsapp:+' + this.removeNotDigits(twilioSettings.senderNumber)

      twilioSettings.joinWord =
        'join ' + twilioSettings.joinWord.replace('join ', '')

      this.$axios
        .$post('api/settings/twilio', twilioSettings)
        .then(() => {
          console.log('twilio settings saved')
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
          console.log('shopify settings saved')
          alert('success')
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