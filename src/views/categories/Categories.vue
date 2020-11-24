<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Categories" link="categories.create" :isShow='true'></title-bar>
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
                                                    <th>Category Name</th>
                                                    <th>Slug</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="$apollo.loading" class="loading apollo">Loading...</tbody>
                                            <tbody v-else>
                                                <tr v-for="category in categories" :key="category.id">
                                                    <td>{{ category.id }}</td>
                                                    <td>{{ category.name }}</td>
                                                    <td>{{ category.slug }}</td>
                                                    <td>
                                                        <button class="item" data-toggle="tooltip"
                                                            @click="edit(category)" data-placement="top" title="Edit">
                                                            <i class="zmdi zmdi-edit"></i>
                                                        </button>
                                                        <button class="item" data-toggle="tooltip"
                                                            @click="remove(category)" data-placement="top"
                                                            title="Delete">
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
    import TitleBar from '@/components/TitleBar';
    import AppHeader from '@/partials/AppHeader';
    import AppSidebar from '@/partials/AppSidebar';
    import deleteCategory from '@/graphql/mutations/deleteCategory.gql';
    import categories from '@/graphql/queries/categories.gql';

    export default {
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        data() {
            return {
                categories: []
            }
        },
        apollo: {
            categories: {
                query: categories
            }
        },
        methods: {
            edit(category) {
                this.$router.push({
                    name: 'categories.edit',
                    params: {
                        'id': category.id
                    }
                });
            },
            remove(category) {
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
                                mutation: deleteCategory,
                                variables: {
                                    id: category.id
                                }
                            })
                            .then((res) => {
                                this.$swal('Deleted', "Category Deleted Successfully", 'success');
                                let index = this.categories.findIndex(cat => cat.id == category.id);
                                this.categories.splice(index, 1);
                            }).catch((e) => {
                                this.$toast.error(e.message, 'Opps!');
                            });
                    }
                });
            },

        },
    }
</script>