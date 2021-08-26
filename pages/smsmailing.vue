
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
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>List of Phone Numbers</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialogNew"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add phone number
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        class = "ma-1"
                        outlined
                        v-model="editedItem.number"
                        label="Phone number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
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
      dialogNew: false,
      dialog: false,
      
      dialogDelete: false,
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Phone Number',
          align: 'start',
          sortable: false,
          value: 'number',
        },
        { text: 'Data source', value: 'source' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      phoneNumbers: [],
    editedIndex: -1,
    editedItem: {
      number: '',
      source: 'Added by User',
    },
    defaultItem: {
      number: '',
      source: 'Added by User',
    },
    }
    },
    computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Phone Number' : 'Edit Phone Number'
    },
  },

  watch: {
    dialogNew (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
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
        this.selected = []
      } catch (err) {
        console.log(err);
      }
    },
    initialize () {
      this.phoneNumbers = [
        {
          number: '+77075002029',
          source: 'Whatsapp DB',
         },
       ]
    },

    editItem (item) {
      this.editedIndex = this.phoneNumbers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogNew = true
    },

    deleteItem (item) {
      this.editedIndex = this.phoneNumbers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.phoneNumbers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogNew = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.phoneNumbers[this.editedIndex], this.editedItem)
      } else {
        this.phoneNumbers.push(this.editedItem)
      }
      this.close()
    },
}
}
</script>