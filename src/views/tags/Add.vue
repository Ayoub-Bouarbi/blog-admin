<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Add Tag" :isShow="false"></title-bar>
            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body card-block">
                                <div class="form-group">
                                    <label for="tagName" class=" form-control-label">Tag Name</label>
                                    <input type="text" id="tagName" v-model="name" placeholder="Enter Tag Name"
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
    import CREATE_TAG from '@/graphql/mutations/createTag.gql';

    export default {
        data() {
            return {
                name: ''
            }
        },
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        methods: {
            onSave() {   
                this.$apollo.mutate({
                    mutation: CREATE_TAG, 
                    // Parameters
                    variables: {
                        name: this.name,
                    }
                })
                .then((res) => {
                    this.$toast.success('Tag Created Successfully','OK');
                    this.name = '';
                })
                .catch(e => {
                    this.$toast.error(e.message, 'Opps!');
                });
            },
            onCancel() {
                this.$router.push({
                    name: 'tags'
                });
            }
        },
    }
</script>
