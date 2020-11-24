<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Edit User" :isShow="false"></title-bar>
            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body card-block">
                                <div class="form-group">
                                    <label for="firstname" class=" form-control-label">Full Name</label>
                                    <input type="text" v-model="user.fullname" id="fullname"
                                        placeholder="Enter your Full Name" class="form-control">
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="username" class=" form-control-label">Username</label>
                                            <input type="text" id="username" v-model="user.username"
                                                placeholder="Enter Username" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="phone" class=" form-control-label">Phone</label>
                                            <input type="text" v-model="user.phone" id="phone"
                                                placeholder="Enter your Phone" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="userType" class=" form-control-label">User Type</label>
                                            <select name="userType" v-model="user.role" class="form-control"
                                                id="userType">
                                                <option :value="0">ADMIN</option>
                                                <option :value="1">AUTHOR</option>
                                                <option :value="2">USER</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="email" class=" form-control-label">Email</label>
                                    <input type="email" id="email" v-model="user.email" placeholder="Enter Your Email"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-primary btn-sm" @click="onSave">
                                    <i class="fa fa-dot-circle-o"></i> Submit
                                </button>
                                <button class="btn btn-danger btn-sm" @click="onCancel">
                                    <i class="fa fa-ban"></i> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
    import TitleBar from '../../components/TitleBar';
    import AppHeader from '../../partials/AppHeader';
    import AppSidebar from '../../partials/AppSidebar';
    import UPDATE_USER from '@/graphql/mutations/updateUser.gql';
    import GET_USER from '@/graphql/queries/user.gql';


    export default {
        name: 'AddUsers',
        data() {
            return {
                user: {
                    'firstname': '',
                    'lastname': '',
                    'username': '',
                    'email': '',
                    'phone': '',
                    'role': 2,
                },
            }
        },
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        apollo: {
            user: {
                query: GET_USER,
                variables() {
                    return {
                        id: this.$route.params.id
                    }
                },

            }
        },
        methods: {
            onCancel() {
                this.$router.push({
                    name: 'users'
                });
            },
            onSave() {
                this.$apollo.mutate({
                        mutation: UPDATE_USER,
                        variables: {
                            id: this.$route.params.id,
                            fullname: this.user.fullname,
                            username: this.user.username,
                            email: this.user.email,
                            phone: this.user.phone,
                            role: this.user.role,
                        }
                    })
                    .then((res) => {
                        this.$toast.success('User Update Successfully', 'OK');
                    })
                    .catch(e => {
                        this.$toast.error(e, 'Opps!');
                    });
            }
        },
    }
</script>