<template>
  <div id="app">
    <v-app app>
      <v-app-bar color="indigo darken-1" app>
        <v-app-bar-nav-icon>
        <v-icon color="white">mdi-arrow-left</v-icon>    
        </v-app-bar-nav-icon>
        <v-toolbar-title class="white--text"
          >Sender (phone number)</v-toolbar-title>
      </v-app-bar>
      <v-container class="fill-height">
        <v-row class="fill-height pb-14" align="end">
          <v-col>
            <div v-for="(item, index) in chat" :key="index" 
                :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]">
              <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
              <v-avatar :color="item.from == 'user' ? 'indigo': 'red'" size="36">
                <span class="white--text">{{ item.from[0] }}</span>
              </v-avatar>
              <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-card >
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row justify="center" no-gutters>
              <v-col :cols="10">
                <div class="d-flex flex-row align-center">
                  <v-text-field
                  v-model="msg" placeholder="Type Something" @keypress.enter="send" flat rounded
                    background-color="blue-grey lighten-5"
                    color="tertiary"
                  ></v-text-field>
                  <v-btn
                      icon
                      large
                      fab
                      @click="send"
                    >
                      <v-icon>mdi-send</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
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
      data: {
        chat: [
        ],
        msg: null,
      },
      methods: {
        send: function(){
          this.chat.push(
          {
            from: "user",
            msg: this.msg
          })
          this.msg = null
          this.addReply()
        },
        addReply(){
          this.chat.push({
            from: "sushant",
            msg: "Hmm"
          })
        }
      }
    })
  },
}
</script>
