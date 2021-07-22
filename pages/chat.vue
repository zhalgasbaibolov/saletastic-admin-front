<template>
    <div id="app">
    <v-app>
        <v-container
          class="fill-height pa-0 "
        >
          <v-row class="no-gutters elevation-4">
            <v-col
              cols="12" sm="3"
              class="flex-grow-1 flex-shrink-0"
              style="border-right: 1px solid #0000001f;"
            >
              <v-responsive
                class="overflow-y-auto fill-height"
                height="500"
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
                          <v-list-item-subtitle v-text="'hi'"></v-list-item-subtitle>
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
                height="500"
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
                    <template>
                      <div
                        class="d-flex flex-row-reverse"
                      >
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-hover>
                              <v-chip
                                color="primary"
                                dark
                                style="height:auto;white-space: normal;"
                                class="pa-4 mb-2"
                                v-on="on"
                              >Hello!
                                <sub
                                  class="ml-2"
                                  style="font-size: 0.5rem;"
                                >11:12 PM</sub>
                              </v-chip>
                            </v-hover>
                          </template>
                        </v-menu>
                      </div>
                    </template>
                  </v-card-text>
                  <v-card-text class="flex-shrink-1">
                      <v-text-field
                              v-model="message"
                              append-outer-icon="mdi-send"
                              filled
                              clear-icon="mdi-close-circle"
                              clearable
                              label="Message"
                              type="text"
                              @click:append="toggleMarker"
                              @click:append-outer="sendMessage"
                              @click:clear="clearMessage"
                            ></v-text-field>
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
export default ({
  data: () => ({
        password: 'Password',
        show: false,
        message: 'Hey!',
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
        id: 3,
        title: "scarlett",
        active: false
      },
      {
        id: 4,
        title: "scarlett",
        active: false
      },
      {
        id: 5,
        title: "scarlett",
        active: false
      },
      {
        id: 6,
        title: "scarlett",
        active: false
      },
      {
        id: 7,
        title: "scarlett",
        active: false
      },
      {
        id: 8,
        title: "scarlett",
        active: false
      },
      {
        id: 9,
        title: "scarlett",
        active: false
      },
      {
        id: 10,
        title: "scarlett",
        active: false
      },
      {
        id: 11,
        title: "scarlett",
        active: false
      },
      {
        id: 12,
        title: "scarlett",
        active: false
      },
      {
        id: 13,
        title: "scarlett",
        active: false
      },
      {
        id: 14,
        title: "scarlett",
        active: false
      }
    ],
    messages: [
    ],
    messageForm: {
      content: "",
      me: true,
      created_at: "11:11am"
    }
  }),
  computed: {
    icon() {
      return this.icons[this.iconIndex]
    },
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker
    },
    sendMessage() {
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage() {
      this.message = ''
    },
    resetIcon() {
      this.iconIndex = 0
    },
  },
})
</script>
