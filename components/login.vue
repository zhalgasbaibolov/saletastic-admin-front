<template>
    <div id="app">
        <v-app>
            <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
                <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Login
                </v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-tabs
                        v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow
                        fixed-tabs
                        >
                        <v-tabs-slider color="purple darken-4"></v-tabs-slider>
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
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                                <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="px-4">
                                <v-card-text>
                                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                            </v-col>
                                            <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                            </v-col>
                                            <v-spacer></v-spacer>
                                            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                                <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>  
                        <v-tab-item>
                            <v-card flat>
                            <v-card-text>Here reset form</v-card-text>
                            </v-card>
                        </v-tab-item>  
                    </v-tabs>                        
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
            data: () => ({
                dialog: true,
                tab: 0,
                tabs: [
                    {name:"Login", icon:"mdi-account"},
                    {name:"Register", icon:"mdi-account-outline"}
                ],
                valid: true,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                verify: "",
                loginPassword: "",
                loginEmail: "",
                loginEmailRules: [
                v => !!v || "Required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                emailRules: [
                v => !!v || "Required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                show1: false,
                rules: {
                required: value => !!value || "Required.",
                min: v => (v && v.length >= 8) || "Min 8 characters"
                }
            }),
            computed: {
                passwordMatch() {
                return () => this.password === this.verify || "Password must match";
                }
            },
            methods: {
                validate() {
                if (this.$refs.loginForm.validate()) {
                    // submit form to server/API here...
                }
                },
                reset() {
                this.$refs.form.reset();
                },
                resetValidation() {
                this.$refs.form.resetValidation();
                }
            },
        });
    },
})
</script>