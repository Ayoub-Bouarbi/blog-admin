<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Comments" :isShow='false'></title-bar>
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="au-card">
                                    <!-- DATA TABLE-->
                                    <div class="table-responsive table-feature">
                                        <table class="table table-data3">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Comment</th>
                                                    <th>User Name</th>
                                                    <th>Approved</th>
                                                    <th>Added Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="$apollo.loading" class="loading apollo">Loading...</tbody>
                                            <tbody v-else>
                                                <tr v-for="comment in comments" :key="comment.id">
                                                    <td>{{ comment.id }}</td>
                                                    <td>{{ comment.content }}</td>
                                                    <td>{{ comment.user.username }}</td>
                                                    
                                                    <td v-if="comment.approved == 1"><span
                                                            class="badge badge-info">Approved</span></td>
                                                    <td v-else><span class="badge badge-danger">Not
                                                            Approved</span>
                                                    </td>
                                                    <td>{{ comment.created_at }}</td>
                                                    <td>
                                                        <button class="item" v-if="!comment.approved"
                                                            data-toggle="tooltip" @click="approve(comment)"
                                                            data-placement="top" title="Delete">
                                                            <i class="zmdi zmdi-delete"></i>
                                                        </button>
                                                        <button class="item" data-toggle="tooltip"
                                                            @click="remove(comment)" data-placement="top"
                                                            title="Delete">
                                                            <i class="zmdi zmdi-delete"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- END DATA TABLE-->
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
    import TitleBar from '@/components/TitleBar';
    import AppHeader from '@/partials/AppHeader';
    import AppSidebar from '@/partials/AppSidebar';

    import GET_COMMENTS from '@/graphql/queries/comments.gql';
    import DELETE_COMMENT from '@/graphql/mutations/deleteComment.gql';

    export default {
        name: 'Comments',
        data() {
            return {
                comments: [],
            }
        },
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        apollo: {
            comments: {
                query: GET_COMMENTS
            }
        },
        methods: {
            approve(comment) {
                axios.post('/api/comments/approve',{ 'id': comment.id })
                    .then((res) => {
                        this.$toast.success('Comment Approved Successfully','OK');
                        this.comments.forEach(us => {
                            if (us.id == comment.id) {
                                comment.approved = true;
                            }
                        })
                    }).catch((e) => {
                        this.$toast.error(e,'Opps!');
                    });
            },
            remove(comment) {
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
                            mutation: DELETE_COMMENT,
                            variables: {
                                id: comment.id
                            }
                        })
                        .then((res) => {
                            this.$swal('Deleted', "Comment Deleted Successfully", 'success')
                            let index = this.comments.findIndex(com => com.id == comment.id);
                            this.comments.splice(index, 1);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                    }
                });
            },
        },
    }
</script>