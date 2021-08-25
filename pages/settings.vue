<template>
  <div style="padding-bottom: 80px">
    <h2 style="margin-bottom: 10px">Shopify Settings</h2>
    <v-form ref="form" class="mb-4" autocomplete="off">
      <template v-if="shopifyInfo">
        <v-text-field
          v-model="shopifyInfo.domain"
          label="Shopify Store URL"
          required
          outlined
        ></v-text-field>
      </template>
      <template v-else>
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
      </template>
      <v-divider style="padding-bottom: 30px"></v-divider>
      <v-text-field
        v-model="settings.twilio.joinWord"
        label="Join word"
        required
        outlined
      >
        <h3 slot="prepend">Join</h3>
      </v-text-field>
      <v-btn color="primary" class="mr-4" @click="save"> Save changes </v-btn>
    </v-form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    settings: {
      memberstackId: '',
      twilio: {},
      shopify: {},
      sandboxUser: true,
    },
  }),
  computed: {
    ...mapGetters({
      shopifyInfo: 'shopify/getShop',
    }),
  },
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
      this.$store.dispatch('shopify/loadShopifyInfo').finally(() => {
        this.$axios.get('/api/settings').then((res) => {
          console.log(res)
          if (res && res.data) {
            const settings = res.data || {}
            settings.twilio = settings.twilio || {}
            settings.shopify = settings.shopify || {}

            if (settings.twilio && settings.twilio.senderNumber)
              settings.twilio.senderNumber =
                settings.twilio.senderNumber.replaceAll(/\D/g, '')
            if (settings.twilio && settings.twilio.joinWord)
              settings.twilio.joinWord = settings.twilio.joinWord.replace(
                'join ',
                ''
              )

            this.settings = settings
          }
        })
      })
    },
    save() {
      const settings = JSON.parse(JSON.stringify(this.settings))
      const twilioSettings = settings.twilio
      if (twilioSettings.senderNumber)
        twilioSettings.senderNumber =
          'whatsapp:+' + this.removeNotDigits(twilioSettings.senderNumber)

      twilioSettings.joinWord =
        'join ' + twilioSettings.joinWord.replace('join ', '')

      this.$axios
        .$post('api/settings/save', settings)
        .then(() => {
          console.log('twilio settings saved')
          alert('success')
        })
        .catch(() => {
          alert('error on saving')
        })
    },
    /*
    saveShopify() {
      if (this.settings.shopify && this.settings.shopify.externalUrl)
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
    },*/
  },
}
</script>
<style scoped>
.v-card {
  padding: 8px;
}
</style>