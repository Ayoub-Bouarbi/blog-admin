<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Users" link="users.create" :isShow="true"></title-bar>
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="au-card">
                                    <div class="table-responsive table-feature">
                                        <table class="table table-data3">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Full Name</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="$apollo.loading" class="loading apollo">Loading...</tbody>
                                            <tbody v-else>
                                                <tr v-for="user in users" :key="user.id">
                                                    <td>{{ user.id }}</td>
                                                    <td>{{ user.fullname }}</td>
                                                    <td>{{ user.username }}</td>
                                                    <td>{{ user.email }}</td>
                                                    <td v-if="user.role == 0"><span
                                                            class="badge badge-info">Admin</span>
                                                    </td>
                                                    <td v-else-if="user.role == 1"><span
                                                            class="badge badge-info">Author</span></td>
                                                    <td v-else><span class="badge badge-info">User</span></td>
                                                    <td>
                                                        <button class="item" data-toggle="tooltip" @click="edit(user)"
                                                            data-placement="top" title="Edit">
                                                            <i class="zmdi zmdi-edit"></i>
                                                        </button>
                                                        <button class="item" data-toggle="tooltip" @click="remove(user)"
                                                            data-placement="top" title="Delete">
                                                            <i class="zmdi zmdi-delete"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
    import GET_USERS from '@/graphql/queries/users.gql';
    import DELETE_USER from '@/graphql/mutations/deleteUser.gql';

    export default {
        data() {
            return {
                users: []
            }
        },
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        apollo: {
            users: {
                query: GET_USERS
            }
        },
        methods: {
            edit(user) {
                this.$router.push({
                    name: 'users.edit',
                    params: {
                        'id': user.id
                    }
                });
            },
            remove(user) {
                this.$swal({
                    title: 'Are you sure?',
                    text: 'You can\'t revert your action',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes Delete it!',
                    cancelButtonText: 'No, Keep it!',
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if (result.value) {
                        this.$apollo.mutate({
                                mutation: DELETE_USER,
                                variables: {
                                    id: user.id
                                }
                            })
                            .then((res) => {
                                this.$swal('Deleted', 'User Deleted Successfully', 'success')
                                let index = this.users.findIndex(us => us.id == user.id);
                                this.users.splice(index, 1);
                            })
                            .catch((e) => {
                                this.$toast.error(e, 'Opps!!')
                            });
                    }
                });
            },
        },
    }
</script>