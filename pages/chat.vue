<template>
    <div id="app">
    <v-app>
        <v-container
          class="pa-0 ma-0"
        >
          <v-row class="no-gutters elevation-4">
            <v-col
              cols="12" sm="3"
              class="flex-grow-1 flex-shrink-0"
              style="border-right: 1px solid #0000001f;"
            >
              <v-responsive
                class="overflow-y-auto fill-height"
              >
                <v-list subheader>
                  <v-list-item-group v-model="activeChat">
                    <template v-for="(item, index) in parents">
                      <v-list-item
                        :key="`parent${index}`"
                        :value="item.id"
                      >
                        <v-list-item-avatar color="grey lighten-1 white--text">
                          <v-icon>
                            mdi-account
                          </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-text="'hello'"></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider
                        :key="`chatDivider${index}`"
                        class="my-0"
                      ></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-responsive>
            </v-col>
            <v-col
            cols="auto"
            class="flex-grow-1 flex-shrink-0"
            >
              <v-responsive
                v-if="activeChat"
                class="overflow-y-hidden fill-height"
                height="600"
              >
                <v-card
                  flat
                  class="d-flex flex-column fill-height"
                >
                  <v-card-title>
                    john doe
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card height="450">
                        <div>
                          <ul class="pages">
                            <li class="chat page">
                              <div class="chatArea">
                                <ul ref="messages" class="messages">
                                  <li v-for="(msg, index) in messages" :key="index" class="message">
                                    <i :title="msg.date">
                                      {{ msg.date.split('T')[1].slice(0, -2) }}
                                    </i>: {{ msg.text }}
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                    </v-card>
                      <input
                              v-model="message"
                              class="inputMessage" 
                              type="text" 
                              @keyup.enter="sendMessage"
                              placeholder="Type here..."
                              filled
                              outlined
                            >
                </v-card>
              </v-responsive>
            </v-col>
          </v-row>
        </v-container>
    </v-app>
</div>
</template>
 
<script>
import socket from '~/plugins/socket.io.js'
export default {
  asyncData () {
    return new Promise(resolve =>
      socket.emit('last-messages', messages => resolve({ messages }))
    )
  },
  data () {
    return {
        message: '',
        activeChat: 1,
        parents: [
      {
        id: 1,
        title: "john doe",
        active: true
      },
      {
        id: 2,
        title: "scarlett",
        active: false
      },
      {
        id: 3,
        title: "scarlett",
        active: false
      } 
    ],
    }
  },
  
  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
  },
  watch: {
    messages: 'scrollToBottom'
  },
  beforeMount () {
    socket.on('new-message', (message) => {
      this.messages.push(message)
    })
  },
  
  mounted () {
    this.scrollToBottom()
  },

  methods: {
    sendMessage() {
      if (!this.message.trim()) { return }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim()
      }
      this.messages.push(message)
      this.message = ''
      socket.emit('send-message', message)
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
html, input {
  font-family:
    "HelveticaNeue-Light",
    "Helvetica Neue Light",
    "Helvetica Neue",
    Helvetica,
    Arial,
    "Lucida Grande",
    sans-serif;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  word-wrap: break-word;
}
ul li { padding: 0.5rem 1rem; }
/* Pages */
.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
.page {
  height: 100%;
  position: absolute;
  width: 100%;
}
/* Font */
.messages {
  font-size: 100%;
}
.inputMessage {
  font-size: 100%;
}
.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}
/* Messages */
.chatArea {
  height: 100%;
  padding-bottom: 60px;
}
.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}
.inputMessage {
  border: 10px solid #3B8070;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}
</style>