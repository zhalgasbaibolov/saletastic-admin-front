
<template>
    <div id="app">
  <v-app id="inspire">
    
    <v-data-table
    v-model="selected"
    :headers="headers"
      :items="phoneNumbers"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    fixed-header
      height="450px">
      
    </v-data-table>
    <v-row class="pa-2">
      <v-col>
        <v-file-input
          outlined
          accept="/*, .csv"
          label="Import contacts (CSV file only)"
        ></v-file-input>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="blue"
                dark
                height="50"
                width="300"
                v-bind="attrs"
                v-on="on"
                
              >
                Send message
              </v-btn>
            </template>
      
            <v-card @submit.prevent="sendMessage">
                <v-card-title class="text-h6 grey lighten-4">
                Please type your message below
              </v-card-title>
              <v-text-field
              v-model="message.to"
                  type="text"
              class = "ma-3"
                label="Enter your phone number"
                required
                outlined
              ></v-text-field>
              <v-textarea
              id
                  v-model="message.message"
              class = "ma-3"
                outlined
                name="input-7-4"
                label="Message area"
                required
                
              ></v-textarea>
      
              <v-divider></v-divider>
      
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  color="primary"
                  text
                  @click="dialog = false"
                >
                <span
                  role="status"
                  aria-hidden="true"
                  >
                </span>
                  Send message!
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
    
  </v-app>
</div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
        data: () => {
    return {
      message: {
        to: "",
        message: ""
      },
      loading: false,
        dialog: false,
        singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Phone Numbers',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Data source', value: 'source' },
      ],
      phoneNumbers: [
        {
          name: '+77075002029',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002030',
          source: 'from Shopify DB'
        },
        {
          name: '+77075002031',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002033',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002045',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002078',
          source: 'from Shopify DB'
        },
        {
          name: '+77075002077',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002001',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075002758',
          source: 'from Shopify DB'
        },
        {
          name: '+77075002458',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77075001478',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77077892045',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77077832078',
          source: 'from Shopify DB'
        },
        {
          name: '+77071472077',
          source: 'from Whatsapp DB'
        },
        {
          name: '+77073332001',
          source: 'from Whatsapp DB'
        },
        
      ],
    }
    },
    methods: {
    async sendMessage() {
      try {
        let response = await axios.post(
          "/twilioapi/send/sms",
          this.message,
          this.message = {
            to: "",
            message: ""
          },
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
}
}
</script>