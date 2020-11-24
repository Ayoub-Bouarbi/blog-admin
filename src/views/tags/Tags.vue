<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Tags" link="tags.create" :isShow='true'></title-bar>
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
                                                    <th>Tag Name</th>
                                                    <th>Slug</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="$apollo.loading" class="loading apollo">Loading...</tbody>
                                            <tbody v-else>
                                                <tr v-for="tag in tags" :key="tag.id">
                                                    <td>{{ tag.id }}</td>
                                                    <td>{{ tag.name }}</td>
                                                    <td>{{ tag.slug }}</td>
                                                    <td>
                                                        <button class="item" data-toggle="tooltip" @click="edit(tag)"
                                                            data-placement="top" title="Edit">
                                                            <i class="zmdi zmdi-edit"></i>
                                                        </button>
                                                        <button class="item" data-toggle="tooltip" @click="remove(tag)"
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
    import GET_TAGS from '@/graphql/queries/tags.gql';
    import DELETE_TAG from '@/graphql/mutations/deleteTag.gql';


    export default {
        data() {
            return {
                tags: []
            }
        },
        components: {
            TitleBar,
            AppHeader,
            AppSidebar
        },
        apollo: {
            tags: {
                query: GET_TAGS,
            }  
        },
        methods: {
            edit(tag) {
                this.$router.push({
                    name: 'tags.edit',
                    params: {
                        'id': tag.id
                    }
                });
            },
            remove(tag) {
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
                                mutation: DELETE_TAG,
                                variables: {
                                    id: tag.id,
                                },
                            })
                            .then((res) => {
                                this.$swal('Deleted', 'Tag Deleted Successfully', 'success')
                                let index = this.tags.findIndex(ta => ta.id == tag.id);
                                this.tags.splice(index, 1);
                            })
                            .catch(e => {
                                this.$toast.error(e.message, 'Opps!');
                            });
                    }
                });
            }
        },
    }
</script>