import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/Home.vue';
import Account from '../views/users/Account.vue';
import Tags from '../views/tags/Tags.vue';
import AddTag from '../views/tags/Add.vue';
import EditTag from '../views/tags/Edit.vue';
import Categories from '../views/categories/Categories.vue';
import AddCategory from '../views/categories/Add.vue';
import EditCategory from '../views/categories/Edit.vue';
import Users from '../views/users/Users.vue';
import AddUser from '../views/users/Add.vue';
import EditUser from '../views/users/Edit.vue';
import Posts from '../views/posts/Posts.vue';
import AddPost from '../views/posts/Add.vue';
import EditPost from '../views/posts/Edit.vue';
import Comments from '../views/comments/Comments.vue';
import Login from '../views/auth/Login.vue';
import store from '../store';

Vue.use(VueRouter)

const routes = [{
        path: '/account',
        name: 'account',
        component: Account,
        meta: {middlewareAuth: true}
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {middlewareAuth: true}
    },
    {
        path: '/tags',
        name: 'tags',
        component: Tags,
        meta: {middlewareAuth: true}
    },
    {
        path: '/tags/create',
        name: 'tags.create',
        component: AddTag,
        meta: {middlewareAuth: true}
    },
    {
        path: '/tags/edit/:id',
        name: 'tags.edit',
        component: EditTag,
        meta: {middlewareAuth: true}
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
        meta: {middlewareAuth: true}
    },
    {
        path: '/categories/create',
        name: 'categories.create',
        component: AddCategory,
        meta: {middlewareAuth: true}
    },
    {
        path: '/categories/edit/:id',
        name: 'categories.edit',
        component: EditCategory,
        meta: {middlewareAuth: true}
    },
    {
        path: '/posts',
        name: 'posts',
        component: Posts,
        meta: {middlewareAuth: true}
    },
    {
        path: '/posts/create',
        name: 'posts.create',
        component: AddPost,
        meta: {middlewareAuth: true}
    },
    {
        path: '/posts/edit/:id',
        name: 'posts.edit',
        component: EditPost,
        meta: {middlewareAuth: true}
    },
    {
        path: '/comments',
        name: 'comments',
        component: Comments,
        meta: {middlewareAuth: true}
    },
    {
        path: '/users',
        name: 'users',
        component: Users,
        meta: {middlewareAuth: true}
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: AddUser,
        meta: {middlewareAuth: true}
    },
    {
        path: '/users/edit/:id',
        name: 'users.edit',
        component: EditUser,
        meta: {middlewareAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {middlewareVisitor: true}
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '/admin',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.middlewareAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login',
            });
            
            return;
        }
    }else if (to.matched.some(record => record.meta.middlewareVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'home',
            });
            
            return;
        }
    }
    next();
})

export default router
