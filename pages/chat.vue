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
                  <v-card-text class="flex-grow-1 overflow-y-auto">
                    <v-menu offset-y>
                      <template #activator="{ on }">
                        <ul v-for="(msg, index) in messages" :key="index" class="d-flex flex-row-reverse">
                             <v-card-text
                                class="pa-1 mb-1"
                                v-on="on"
                              >
                               {{ msg.text }}
                                <sub
                                  class="ml-2"
                                  style="font-size: 0.5rem;"
                                >{{ msg.date.split('T')[1].slice(0, -5) }}</sub>
                              </v-card-text>
                        </ul>
                      </template>
                    </v-menu>
                  </v-card-text>
                  <v-card-text>
                      <v-text-field 
                              v-model="message"
                              placeholder="type here..."
                              @click:append="toggleMarker"
                              @keyup.enter="sendMessage"
                              @click:append-outer="sendMessage"
                              append-outer-icon="mdi-send"
                              filled
                              outlined
                              type="text"
                            />
                  </v-card-text>
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
        password: 'Password',
        show: false,
        message: '',
        marker: true,
        iconIndex: 0,
        selectedItem: 1,
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
  // watch: {
  //   messages: ''
  // },
  
  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
  },
  beforeMount () {
    socket.on('new-message', (message) => {
      this.messages.push(message)
    })
  },
  
  mounted () {
    // this.scrollToBottom()
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker
    },
    sendMessage() {
      this.resetIcon()
      this.clearMessage()
      if (!this.message.trim()) { return }
      const message = {
        date: new Date().toJSON(),
        text: this.message.trim()
      }
      this.messages.push(message)
      this.message = ''
      socket.emit('send-message', message)
    },
    // scrollToBottom () {
    //   this.$nextTick(() => {
    //     this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
    //   })
    // },
    clearMessage() {
      this.message = ''
    },
    resetIcon() {
      this.iconIndex = 0
    },
  },
}
</script>
