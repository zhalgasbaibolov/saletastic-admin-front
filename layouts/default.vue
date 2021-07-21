<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="false"
      fixed
      app
    >
      <v-list>
        <template data-ms-content="!members">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-btn
                color="primary"
                data-ms-membership="60f7b76fc2135000047acf81"
              >
                sign up
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#/ms/login">
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="`Sign In`" />
            </v-list-item-content>
          </v-list-item>
        </template>
        <template data-ms-content="members">
          <v-list-item to="#">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <h3 data-ms-member="email"></h3>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#/ms/profile">
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="`Profile`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="settings">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="`Profile`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#/ms/logout">
            <v-list-item-action>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="`Sign Out`" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/chat">
            <v-list-item-action>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="`Chat`" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="false" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      title: 'Admin panel',
    }
  },
}
</script>
