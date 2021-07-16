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
                                    <v-card class="pa-4" flat>
                                    <div>
                                    <v-text-field
                                        label="Please type your email"
                                    ></v-text-field>
                                    <v-text-field label="Please type your password" 
                                        ></v-text-field>
                                    <v-text-field label="Confirm password" 
                                        ></v-text-field>
                                    </div>
                                    </v-card>
                                </v-tab-item>
                                <v-tab-item>
                                    <v-card class="pa-4" flat>
                                    <div>
                                    <v-text-field
                                        label="Please type your email"
                                    ></v-text-field>
                                    <v-text-field label="Please type your password" 
                                        ></v-text-field>
                                    </div>
                                    </v-card>
                                </v-tab-item>  
                                <v-tab-item>
                                    <v-card class="pa-4" flat>
                                    <div>
                                    <v-text-field
                                        label="Forgot your password? Please type your email"
                                    ></v-text-field>
                                    </div>
                                    </v-card>
                                </v-tab-item>  
                                </v-tabs>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-card-actions class="justify-end">
                                            <v-btn
                                                text
                                                @click="dialog.value = false"
                                                >Submit
                                            </v-btn>
                                            </v-card-actions>
                                            <v-card-actions class="justify-end">
                                            <v-btn
                                                text
                                                @click="dialog.value = false"
                                                >Close
                                            </v-btn>
                                            </v-card-actions>
                                        </v-col>
                                    </v-row>
                                </v-container>
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