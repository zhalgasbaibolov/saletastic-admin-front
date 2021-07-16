<template>
    <div id="app">
        <v-app id="inspire">
            <div class="text-center">
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                        Login
                    </v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-tabs
                                color="cyan"
                                dark
                                slider-color="yellow"
                                fixed-tabs
                                >
                                <v-tab ripple>
                                    Register
                                </v-tab>
                                <v-tab ripple>
                                    Login
                                </v-tab>
                                <v-tab ripple>
                                    Reset
                                </v-tab>
                                <v-tab-item>
                                    <v-card flat>
                                    <v-card-text>Here register form</v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card flat>
                                    <v-card-text>Here login form</v-card-text>
                                    </v-card>
                                </v-tab-item>  
                                <v-tab-item>
                                    <v-card flat>
                                    <v-card-text>Here reset form</v-card-text>
                                    </v-card>
                                </v-tab-item>  
                                </v-tabs>

                        </v-card>
                        <v-card>
                            <v-divider></v-divider>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="dialog.value = false"
                                    >Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </v-app>
    </div>
</template>


<script type="JavaScript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js"></script>
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup() {
        new Vue({
            el: '#app',
            vuetify: new Vuetify(),
        })
    },
})
</script>