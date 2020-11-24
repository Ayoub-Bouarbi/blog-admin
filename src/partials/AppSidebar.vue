<template>
    <div>
        <!-- MENU SIDEBAR-->
        <aside class="menu-sidebar2">
            <div class="logo">
                <router-link :to="{name: 'home'}">
                    <img src="../assets/images/icon/logo-white.png" alt="Cool Admin" />
                </router-link>
            </div>
            <div class="menu-sidebar2__content js-scrollbar1">
                <div class="account2">
                    <div class="image img-cir img-120">
                        <img :src="$store.getters.getUser.avatar != null ? 'http://blog_api.test/storage/uploads/' + $store.getters.getUser.avatar : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R'" alt="John Doe" />
                    </div>
                    <h4 class="name">{{ $store.getters.getUser.username }}</h4>
                    <a @click="signOut">Sign out</a>
                </div>
                <nav class="navbar-sidebar2">
                    <ul class="list-unstyled navbar__list">
                        <li>
                            <router-link :to="{name: 'home'}" class="js-arrow" tag="a">
                                <i class="fa fa-tachometer"></i>
                                Dashboard
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'tags'}" class="js-arrow" tag="a">
                                <i class="fa fa-tags"></i>
                                Tags
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'categories'}" class="js-arrow" tag="a">
                                <i class="fa fa-th"></i>
                                Categories
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'posts'}" class="js-arrow" tag="a">
                                <i class="fa fa-list-alt"></i>
                                Posts
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'comments'}" class="js-arrow" tag="a">
                                <i class="fa fa-comments"></i>
                                Comments
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'users'}" class="js-arrow" tag="a">
                                <i class="fa fa-users"></i>
                                Users
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- END MENU SIDEBAR-->
    </div>
</template>
<script>

    import LOGOUT_USER from '@/graphql/mutations/logout.gql';
    import {onLogout} from '@/vue-apollo.js';
    
    export default {
        name: 'AppSidebar',
        methods: {
            signOut(){ 
                this.$apollo.mutate({
                    mutation: LOGOUT_USER
                })
                .then(({ data }) => {
                    onLogout(this.$apollo.provider.defaultClient);
                    this.$store.dispatch('logout');
                    this.$router.push({name: 'login'});
                })
            }
        },
    }

</script>
<style lang="css">
    .account2 a{
        cursor: pointer;
    }
</style>
