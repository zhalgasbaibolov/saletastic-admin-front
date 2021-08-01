<template>
  <div id="app">
    <v-app>
      <v-container class="pa-0 ma-0">
        <v-row class="no-gutters elevation-4">
          <v-col
            cols="12"
            sm="3"
            class="flex-grow-1 flex-shrink-0"
            style="border-right: 1px solid #0000001f"
          >
            <v-responsive class="overflow-y-auto fill-height">
              <v-list subheader>
                <v-list-item-group v-model="activeChat">
                  <template v-for="(item, index) in chats">
                    <v-list-item :key="item.whatsappNumber" :value="item">
                      <v-list-item-avatar color="grey lighten-1 white--text">
                        <v-icon> mdi-account </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.profileName"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="getWhatsappNumber(item.whatsappNumber)"
                        ></v-list-item-subtitle>
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
          <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
            <v-responsive
              v-if="activeChat"
              class="overflow-y-hidden fill-height"
              height="600"
            >
              <v-card flat class="d-flex flex-column fill-height">
                <v-card-title> {{ getActiveChatUserName() }} </v-card-title>
                <v-divider></v-divider>
                <v-card height="450">
                  <div>
                    <ul class="pages">
                      <li class="chat page">
                        <div class="chatArea">
                          <ul ref="messages" class="messages">
                            <li
                              v-for="(msg, index) in filteredMessages"
                              :key="index"
                              :class="{
                                'support-msg': isActive,
                                message: true,
                                test: true,
                              }"
                            >
                              <i :title="msg.date">
                                {{ getDateInfo(msg.date) }} </i
                              >: {{ msg.text }}
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
                  placeholder="Type here..."
                  filled
                  outlined
                  @keyup.enter="sendMessage"
                />
              </v-card>
            </v-responsive>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>
 
<script>
/* eslint-disable no-console */
import socket from '~/plugins/socket.io.js'
export default {
  data() {
    return {
      message: '',
      messages: [],
      chats: [],
      activeChat: null,
    }
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
    filteredMessages() {
      if (!this.activeChat) return []
      return this.messages.filter(
        (m) => m.whatsappNumber === this.activeChat.whatsappNumber
      )
    },
  },
  watch: {
    messages: 'scrollToBottom',
  },
  beforeMount() {
    socket.on('msg', (message) => {
      this.pushToMessages(message)
    })
    socket.on('last-messages', (arr) => {
      console.log('last-messages', arr)
      this.pushToMessages(...arr)
    })
  },

  mounted() {
    window.test = this
    this.scrollToBottom()
    socket.emit('register-token', window.MemberStack.getToken())
  },

  methods: {
    pushToMessages(...arr) {
      console.log('push to messages', ...arr)
      for (const m of arr) {
        const exist = this.chats.find(
          (ch) => ch.whatsappNumber === m.whatsappNumber
        )
        if (!exist) {
          this.chats.push(m)
        }
        this.messages.push(m)
      }
    },
    getActiveChatUserName() {
      if (!this.chats || !this.chats.length) return 'no chats'
      return this.activeChat ? this.activeChat.profileName : 'no selected chat'
    },
    getWhatsappNumber(whNumber) {
      if (!whNumber || !whNumber.length) return ''
      return whNumber.substring(whNumber.indexOf(':') + 1)
    },
    getDateInfo(dt) {
      if (!dt) return 'no date'
      dt = new Date(dt)
      if (isNaN(dt.getTime())) dt = new Date()
      return dt.toLocaleString()
    },
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim(),
        whatsappNumber: this.activeChat.whatsappNumber,
        profileName: this.activeChat.profileName,
        accountSid: this.activeChat.accountSid,
        owner: 'support',
      }
      this.pushToMessages(message)
      this.message = ''
      socket.emit('msg', message)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs && this.$refs.messages)
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
  },
}
</script>
<style scoped>
.support-msg {
  text-align: right;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}
html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
html,
input {
  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  word-wrap: break-word;
}
ul li {
  padding: 0.5rem 1rem;
}
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
  border: 10px solid #3b8070;
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