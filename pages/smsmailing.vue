
<template>
  <div id="app">
    <v-app id="inspire">    
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="phoneNumbers"
        :single-select="singleSelect"
        item-key="numbers"
        show-select
        class="elevation-1"
        fixed-header
        height="450px"
      > 
        <template #top>
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
              <template #activator="{ on, attrs }">
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
                          v-model="editedItem.numbers"
                          class = "ma-1"
                          outlined                        
                          label="Type phone number"
                          placeholder="Example: +916231234567"
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
        <template #[`item.actions`]="{ item }">
          <v-btn
            class="mx-2"
            outlined
            fab
            dark
            x-small
            color="blue"
            @click="editItem(item)"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
          class="mx-2"
          outlined
          fab
          dark
          x-small
          color="red"
          @click="deleteItem(item)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
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
                  color="primary"
                  dark
                  class="mb-2"
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
                :rules="rules"
                counter="160"
                hint="SMS text limit is 160 characters"
                >
                </v-textarea>
        
                <v-divider></v-divider>
        
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn
                      type="submit"
                      color="primary"
                      dark
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
          value: 'numbers',
        },
        { text: 'Data source', value: 'source' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      phoneNumbers: [],
      editedIndex: -1,
      editedItem: {
        numbers: '',
        source: 'Added by User',
      },
      defaultItem: {
        numbers: '',
        source: 'Added by User',
      },
      rules: [v => v.length <= 160 || 'Max 160 characters'],
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

  // created () {
  //   this.initialize()
  // },
  mounted () {
    this.getAllcontacts()
  },
  methods: {
    
    getAllcontacts () {
      axios.get('twilioapi/get/contacts')
            .then(response =>{
              const numbers = response.data.map((x) => ({
                    numbers: '+' + x.phone,
                    source: 'from Whatsapp DB'
                  }) 
               )
              // console.log(numbers)
                this.phoneNumbers = numbers
              
            })
            .catch(e => {
                console.log(e)
            })
    },
    sendMessage() {
      try {
        const msg = this.message;
        this.selected.map((x) => {
          const smsNumber = x.numbers;
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
    // initialize () {
    //   this.phoneNumbers = [
    //     {
    //       numbers: '+77075002029',
    //       source: 'whatsapp',
    //     },
    //   ]
    // },

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