<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Posts" link="posts.create" :isShow="true"></title-bar>
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
                                                    <th>Title</th>
                                                    <th>Author</th>
                                                    <th>Published</th>
                                                    <th>Comments</th>
                                                    <th>Featured</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="$apollo.loading" class="loading apollo">Loading...</tbody>
                                            <tbody v-else>
                                                <tr v-for="post in posts" :key="post.id">
                                                    <td>{{ post.id }}</td>
                                                    <td>{{ post.title | shortenText(20) }}</td>
                                                    <td>{{ post.user.fullname }}
                                                    </td>
                                                    <td v-if="post.published == 1"><span
                                                            class="badge badge-info">Published</span></td>
                                                    <td v-else><span class="badge badge-danger">Not
                                                            Published</span>
                                                    </td>
                                                    <td v-if="post.enable_comments == 1"><span
                                                            class="badge badge-info">Enabled</span></td>
                                                    <td v-else><span class="badge badge-danger">Disabled</span>
                                                    </td>
                                                    <td v-if="post.featured == 1"><span
                                                            class="badge badge-info">Yes</span></td>
                                                    <td v-else><span class="badge badge-danger">No</span></td>
                                                    <td>
                                                        <button class="item" data-toggle="tooltip" @click="edit(post)"
                                                            data-placement="top" title="Edit">
                                                            <i class="zmdi zmdi-edit"></i>
                                                        </button>
                                                        <button class="item" data-toggle="tooltip" @click="remove(post)"
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
    import GET_POSTS from '@/graphql/queries/posts.gql';
    import DELETE_POST from '@/graphql/mutations/deletePost.gql';


    export default {
        data() {
            return {
                posts: []
            }
        },
        components: {
            TitleBar,
            AppHeader,
            AppSidebar
        },
        apollo: {
            posts: {
                query: GET_POSTS
            }
        },
        filters: {
            shortenText: function (value, length) {
                if (!value) return;

                return value.substring(0, length) + '...';
            }
        },
        methods: {
            edit(post) {
                this.$router.push({
                    name: 'posts.edit',
                    params: {
                        'id': post.id
                    }
                });
            },
            remove(post) {
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
                                mutation: DELETE_POST,
                                variables: {
                                    id: post.id
                                }
                            })
                            .then((res) => {
                                this.$swal('Deleted', 'Post Deleted Successfully', 'success');
                                let index = this.posts.findIndex(po => po.id == post.id);
                                this.posts.splice(index, 1);
                            })
                            .catch((e) => {
                                this.$toast.error(e.message, 'Opps!!');
                            });
                    }
                });
            },
        },
    }
</script>