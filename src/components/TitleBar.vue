<template>
    <!-- BREADCRUMB-->
    <section class="au-breadcrumb m-t-75">
        <div class="section__content section__content--p30">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="au-breadcrumb-content">
                            <div class="au-breadcrumb-left">
                                <ul class="list-unstyled list-inline au-breadcrumb__list">
                                    <li class="list-inline-item active">
                                        <router-link :to="{name: 'home'}" tag="a">Home</router-link>
                                    </li>
                                    <li class="list-inline-item seprate">
                                        <span>/</span>
                                    </li>
                                    <li class="list-inline-item">{{ title }}</li>
                                </ul>
                            </div>
                            <router-link v-if="isShow" :to="{name: link}" tag="button"
                                class="au-btn au-btn-icon au-btn--green">
                                <i class="zmdi zmdi-plus"></i>
                                add item
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- END BREADCRUMB-->
</template>


<script>
    export default {
        name: 'TitleBar',
        props: {
            title: {
                type: String,
                required: true
            },
            link: {
                type: String,
                required: false
            },
            isShow: {
                type: Boolean,
                required: true
            }
        }
    }

</script>

<style scoped>
    ol,
    ul,
    dl {
        margin-bottom: 0;
    }

</style>
