<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Add Category" :isShow="false"></title-bar>
            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body card-block">
                                <div class="form-group">
                                    <label for="categoryName" class=" form-control-label">Category Name</label>
                                    <input type="text" id="categoryName" v-model="name"
                                        placeholder="Enter Category Name" class="form-control">
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
    import createCategory from '@/graphql/mutations/createCategory.gql';

    export default {
        data() {
            return {
                name: '',
            }
        },
        components: {
            TitleBar,
            AppHeader,
            AppSidebar
        },
        methods: {
            onCancel() {
                this.$router.push({
                    name: 'categories'
                });
            },
            onSave() {
                this.$apollo.mutate({
                    mutation : createCategory,
                    variables: {
                        name: this.name
                    }
                })
                .then((res) => {
                    this.$toast.success('Category Created Successfully','OK');
                    this.name = '';
                })
                .catch(e => {
                    this.$toast.error(e, 'Opps!');
                });
            }
        },
    }
</script>
