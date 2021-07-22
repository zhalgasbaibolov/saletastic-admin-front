<template>
<div id="app">
  <v-app id="inspire">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
          cols="3"
        >
          <v-title class="pa-2">Chats</v-title>
          <v-card class="ma-1">
            <v-list dense>
              <v-list-item-group
                v-model="selectedItem"
                color="primary"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 1</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 2</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 3</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 4</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 5</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Contact 6</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="9"
        >
          <v-title class="pa-2">  Messages</v-title>
          <v-card class="ma-1">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                    <v-card-title class="text-h5">
                      Contact 1
                    </v-card-title>
                    <v-form>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12">
                            <v-text-field
                              label="Type your message"
                              filled
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                    <v-card-actions>
                      <v-btn text>
                        Send
                      </v-btn>
                    </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</div>
</template>


<script type="JavaScript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>

<script>
export default {
  setup() {
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
      data: () => ({
        selectedItem: 1,
        items: [
          { text: 'Contact 1', icon: 'mdi-account' },
          { text: 'Contact 2', icon: 'mdi-account' },
          { text: 'Contact 3', icon: 'mdi-account' },
          { text: 'Contact 4', icon: 'mdi-account' },
          { text: 'Contact 5', icon: 'mdi-account' },
          { text: 'Contact 6', icon: 'mdi-account' },
          { text: 'Contact 7', icon: 'mdi-account' },
          { text: 'Contact 8', icon: 'mdi-account' },
          { text: 'Contact 9', icon: 'mdi-account' },
          { text: 'Contact 10', icon: 'mdi-account' },
          { text: 'Contact 11', icon: 'mdi-account' },
          { text: 'Contact 12', icon: 'mdi-account' },
        ],
      }),
    })
  },
}
</script>