<template>
    <div class="page-wrapper">
        <div class="page-content--bge5">
            <div class="container">
                <div class="login-wrap">
                    <div class="login-content">
                        <div class="login-logo">
                            <a href="#">
                                <img src="../../assets/images/icon/logo.png" alt="CoolAdmin">
                            </a>
                        </div>
                        <div class="login-form">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input class="au-input au-input--full" v-model="email" type="email" name="email"
                                    placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input class="au-input au-input--full" v-model="password" type="password"
                                    name="password" placeholder="Password">
                            </div>
                            <div class="login-checkbox">
                                <label>
                                    <a href="#">Forgotten Password?</a>
                                </label>
                            </div>
                            <button class="au-btn au-btn--block au-btn--green m-b-20" @click="submit">sign
                                in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

import LOGIN from '@/graphql/mutations/login.gql';
import {onLogin} from '@/vue-apollo.js';

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            submit() {
                this.$apollo.mutate({
                    mutation: LOGIN,
                    variables: {
                        input: {
                            username: this.email,
                            password: this.password
                        }
                    }
                })
                .then(({ data }) => {
                    onLogin(this.$apollo.provider.defaultClient,data.adminLogin.access_token);
                    this.$store.dispatch('storeUserData',data.adminLogin.user);
                })
                .then((res) => {
                    this.$router.push('/');                    
                    this.$toast.success('Successfully Logged In!', 'OK');
                });
                
            }
        },
    }

</script>
