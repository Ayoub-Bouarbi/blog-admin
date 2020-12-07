<template>
    <div>
        <!-- HEADER DESKTOP-->
        <header class="header-desktop2">
            <div class="section__content section__content--p30">
                <div class="container-fluid">
                    <div class="header-wrap2">
                        <div class="logo d-block d-lg-none">
                            <router-link :to="{name: 'login'}">
                                <img src="../static/logo-white.png" alt="CoolAdmin" />
                            </router-link>
                        </div>
                        <div class="header-button-item js-item-menu" @click="show = !show" :class="{'show-dropdown': show}">
                            <i class="zmdi zmdi-settings"></i>
                            <div class="setting-dropdown js-dropdown">
                                <div class="account-dropdown__body">
                                    <div class="account-dropdown__item">
                                        <router-link :to="{name: 'account'}">
                                            <i class="zmdi zmdi-account"></i>Account</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>

    export default {
        name: 'AppHeader',
        data() {
            return {
                show: false
            }
        },
    }

</script>
