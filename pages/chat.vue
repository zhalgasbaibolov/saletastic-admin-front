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
                  <template v-for="(item, index) in parents">
                    <v-list-item :key="`parent${index}`" :value="item.id">
                      <v-list-item-avatar color="grey lighten-1 white--text">
                        <v-icon> mdi-account </v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          v-text="'hello'"
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
                <v-card-title> john doe </v-card-title>
                <v-divider></v-divider>
                <v-card height="450">
                  <div>
                    <ul class="pages">
                      <li class="chat page">
                        <div class="chatArea">
                          <ul ref="messages" class="messages">
                            <li
                              v-for="(msg, index) in messages"
                              :key="index"
                              class="message"
                            >
                              <i :title="msg.date">
                                {{ msg.date.split('T')[1].slice(0, -2) }} </i
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
import socket from '~/plugins/socket.io.js'
export default {
  data() {
    return {
      message: '',
      messages: [],
      activeChat: 1,
      parents: [
        {
          id: 1,
          title: 'john doe',
          active: true,
        },
        {
          id: 2,
          title: 'scarlett',
          active: false,
        },
        {
          id: 3,
          title: 'scarlett',
          active: false,
        },
      ],
    }
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
  },
  watch: {
    messages: 'scrollToBottom',
  },
  beforeMount() {
    socket.on('msg', (message) => {
      this.messages.push(message)
    })
  },

  mounted() {
    this.scrollToBottom()
    socket.emit(
      'register-token',
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ3NjM1OGNmYjc4NzdhZTdjYWE4ZDdjNTY3YjYwZjdhY2YzZmQ0MjQifQ.eyJpZCI6IjYwZjdmMWRhMDM0ODFjMDAwNGNkYTlhMSIsImVtYWlsIjoia2FybnVybWF4QG1haWwucnUiLCJzaXRlIjoiNjBmN2I2YTU5MGU3NDIwMDA0ZjAzODYyIiwiaWF0IjoxNjI3NjIxMTgyLCJleHAiOjE2MjgyMjU5ODJ9.OHTY5x-wgZHRyKfWlRxztDFXleIU8dEyzsmLMPzVQSSQJ8ZruK4k4DGq00-ndiJzxEBzzk3pqEPOLdyGoQY6_HEHjizxFaKPk_tjlde-FPr59qWGcD11Lehm4EGdlM4RDIO_CwwSWGxzywAxWKBQ2LZ2llhHQZd4pkVX8fwUVr5gcVvlECjo3nhBfFWgbueOxbDU5RBvZa-69tWTdHIDWusylWDR6_g-pwPk9Mew8yMIYvi5QbZkl4tJOtWPS4B3BwqUIclMLR7R5drHLcI5IG5lFz_Hh5azEs8URlZKRscgkhZNaZ1cT8SHvkeZ-WqkF0iJqq9eV44EwfxLeLv1Vf4b6oMyWKF_4P7BRevVUFUWdgaTI9kTmgbzSCy3-vxFqNKJm-jIoGO7FhSxRDtpB5Jc92usCGR8YtWfRdaFOiUqKZTAvsHqot6Z753quP9yYe9h0iO3Ee6qKeTOSGV7C-IHsyqmjeqOjGafTKkr1XrVj8HaNDaxjRpnwjYZ6IBB6NDq2Qij3cEqBRfAUtxFcV7sXPa5B7YRmr3tNGDcz74Lla3RJJpAcjAZqP6_C86hrPeiSaHFwQkuGh4y0lfLZMAdi2-C3myQlhzwt4jKSs7f8vD1tlpdXqVppe2Pm607MoKNIY7ZL6t7-GP_GKTUEdxnwPM-9OATOFTiY39EfrA'
    )
  },

  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim(),
      }
      this.messages.push(message)
      this.message = ''
      socket.emit('msg', message)
    },
    scrollToBottom() {
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