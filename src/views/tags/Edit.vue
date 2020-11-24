<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Edit Tag" :isShow="false"></title-bar>
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
    import GET_TAG from '@/graphql/queries/tag.gql';
    import UPDATE_TAG from '@/graphql/mutations/updateTag.gql';

    export default {
        data() {
            return {
                'name': ''
            }
        },
        components: {
            TitleBar,
            AppSidebar,
            AppHeader
        },
        apollo: {
            data: {
                query: GET_TAG,
                variables() {
                    return {
                        id: this.$route.params.id
                    }
                },
                result({ data }) {
                    this.name = data.tag.name;
                }

            }
        },
        methods: {
            onSave() {
                this.$apollo.mutate({
                        mutation: UPDATE_TAG,
                        variables: {
                            id: this.$route.params.id,
                            name: this.name
                        }
                    })
                    .then((res) => {
                        this.$toast.success('Tag Updated Successfully', 'OK');
                    }).catch((e) => {
                        this.$toast.error(e, 'Opps!');
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