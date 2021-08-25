
<template>
    <div id="app">
  <v-app id="inspire">
    
    <v-data-table
    v-model="selected"
    :headers="headers"
      :items="phoneNumbers"
      :single-select="singleSelect"
      item-key="number"
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
              
              <!-- <v-text-field
              v-model="message.to"
                  type="text"
              class = "ma-3"
                label="Enter your phone number"
                required
                outlined
              ></v-text-field> -->
              <v-textarea
              id
                  v-model="message"
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
                  @click="dialog = false; sendMessage()"
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
      message: "",
      loading: false,
        dialog: false,
        singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Phone Numbers',
          align: 'start',
          sortable: false,
          value: 'number',
        },
        { text: 'Data source', value: 'source' },
      ],
      phoneNumbers: [
        {
          number: '+77075002029',
          source: 'from Whatsapp DB'
        },
        {
          number: '+77078629827',
          source: 'from Shopify DB'
        },
        {
          number: '+77079481010',
          source: 'from Shopify DB'
        }
      ],
    }
    },
    methods: {
    sendMessage() {
      try {
        const msg = this.message;
        this.selected.map((x) => {
          const smsNumber = x.number.toString();
          const sendPost = axios.post(
          "/twilioapi/send/sms",
          this.message = {
            to: smsNumber,
            message: msg
          }
        );
        return sendPost;
        });
      
      } catch (err) {
        console.log(err);
      }
    }
}
}
</script>