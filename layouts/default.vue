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
        <v-list-item data-ms-content="!members">
          <v-list-item-action>
            <v-icon color="green darken-2">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-btn
              color="primary"
              data-ms-membership="60f7b76fc2135000047acf81"
            >
              SIGN UP
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="#/ms/login" data-ms-content="!members">
          <v-list-item-action>
            <v-icon color="blue darken-2">mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-btn
              color="primary"
            >
              SIGN IN
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="#" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="green darken-2">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <h3 data-ms-member="email"></h3>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/home" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="red darken-2">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Main page`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/shopify-login"  style="display: none;">
          <v-list-item-action>
            <v-icon color="red darken-2">mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Shopify Login(install)`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="#/ms/profile" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="purple darken-2">mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Profile`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="settings" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="teal darken-2">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Settings`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/chat" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="blue-grey darken-2">mdi-chat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Chat`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/smsmailing" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="orange darken-2">mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`SMS Marketing`" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="#/ms/logout" data-ms-content="members">
          <v-list-item-action>
            <v-icon color="red darken-2">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Sign Out`" />
          </v-list-item-content>
        </v-list-item>
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
      <span>&copy; {{ new Date().getFullYear() }} Saletastic</span>
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
