<template>
    <div>
        <div>
            <app-header></app-header>
            <app-sidebar></app-sidebar>
        </div>
        <div class="page-container">
            <title-bar title="Add Post" :isShow="false"></title-bar>
            <!-- MAIN CONTENT-->
            <div class="main-content">
                <div class="section__content section__content--p30">
                    <div class="container-fluid">
                        <div class="card">
                            <div class="card-body card-block">
                                <div class="form-group">
                                    <label for="title" class=" form-control-label">Title</label>
                                    <input type="text" name="title" id="title" v-model="post.title"
                                        placeholder="Enter Post Title" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="decription" class=" form-control-label">Decription</label>
                                    <textarea type="text" name="decription" id="decription" v-model="post.description"
                                        placeholder="Enter Post Decription" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label for="tags" class="form-control-label">Tags</label>
                                    <ApolloQuery :query="require('@/graphql/queries/tags.gql')">
                                        <template v-slot="{ result: { data },isLoading }">
                                            <!-- Loading -->
                                            <div v-if="isLoading" class="loading apollo">Loading...</div>
                                            <v-select v-else v-model="post.tags" as="name:id:id" :from="data.tags"
                                                tagging :tag-keys="[9,32,188]"></v-select>
                                        </template>
                                    </ApolloQuery>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="user" class=" form-control-label">Authors</label>
                                            <ApolloQuery :query="require('@/graphql/queries/usersByRole.gql')"
                                                :variables="{role: 1}">
                                                <template v-slot="{ result: { data },isLoading }">
                                                    <!-- Loading -->
                                                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                                                    <select v-else name="user" v-model="post.user_id" class="form-control"
                                                        id="user">
                                                        <option v-for="(author,i) in data.usersByRole" :key="i"
                                                            :value="author.id">
                                                            {{ author.fullname }}</option>
                                                    </select>
                                                </template>
                                            </ApolloQuery>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="category" class=" form-control-label">Categories</label>
                                            <ApolloQuery :query="require('@/graphql/queries/categories.gql')">
                                                <template v-slot="{ result: { data },isLoading }">
                                                    <!-- Loading -->
                                                    <div v-if="isLoading" class="loading apollo">Loading...</div>
                                                    <select v-else name="category" v-model="post.category_id"
                                                        class="form-control" id="category">
                                                        <option v-for="(category,i) in data.categories" :key="i"
                                                            :value="category.id">
                                                            {{ category.name }}</option>
                                                    </select>
                                                </template>
                                            </ApolloQuery>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="body" class=" form-control-label">Body</label>
                                    <quill-editor ref="editor" name="editor" :options="editorOptions"></quill-editor>
                                </div>
                                <div class="checkbox form-group">
                                    <label for="featured" class="form-check-label ">
                                        <input type="checkbox" id="featured" v-model="post.featured" name="featured"
                                            class="form-check-input">
                                        Featured
                                    </label>
                                </div>
                                <div class="checkbox form-group">
                                    <label for="published" class="form-check-label ">
                                        <input type="checkbox" id="published" v-model="post.published" name="published"
                                            class="form-check-input">
                                        Published
                                    </label>
                                </div>
                                <div class="checkbox form-group">
                                    <label for="enable_comments" class="form-check-label ">
                                        <input type="checkbox" id="enable_comments" v-model="post.enable_comments"
                                            name="enable_comments" class="form-check-input">
                                        Enable Comments
                                    </label>
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
    import TitleBar from "@/components/TitleBar";
    import {
        vSelect
    } from '@desislavsd/vue-select';

    import AppHeader from '@/partials/AppHeader';
    import AppSidebar from '@/partials/AppSidebar';
    import CREATE_POST from '@/graphql/mutations/createPost.gql';

    export default {
        data() {
            return {
                editorOptions: {
                    placeholder: 'Type Your Post',
                    readOnly: true,
                    theme: 'snow'
                },
                post: {
                    'title': '',
                    'enable_comments': false,
                    'featured': false,
                    'content': '',
                    'description': '',
                    'published': true,
                    'category_id': 0,
                    'user_id': 0,
                    'tags': [],
                },
            }
        },
        components: {
            TitleBar,
            vSelect,
            AppHeader,
            AppSidebar
        },        methods: {
            onCancel() {
                this.$router.push({
                    name: 'posts'
                });
            },
            onSave() {
                this.post.content = JSON.stringify(this.$refs.editor.quill.getContents());

                this.$apollo.mutate({
                        mutation: CREATE_POST,
                        variables: {
                            'title': this.post.title,
                            'description': this.post.description,
                            'enable_comments': this.post.enable_comments,
                            'featured': this.post.featured,
                            'content': this.post.content,
                            'published': this.post.published,
                            'category_id': this.post.category_id,
                            'user_id': this.post.user_id,
                            'tags': this.post.tags,
                        }
                    })
                    .then((res) => {
                        this.$toast.success('Post Created Successfully', 'OK');
                    }).catch((e) => {
                        this.$toast.error(e.message, 'Opps!!');
                    });

            }
        },
    }
</script>
<style lang="css">
    .ql-toolbar.ql-snow+.ql-container.ql-snow {
        min-height: 500px;
    }
</style>