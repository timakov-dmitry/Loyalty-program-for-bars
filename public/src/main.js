//libs
import './background-magic';
import './jquery-3.2.1.slim.min';

//vue
import Vue from 'vue';
import VueCookie from 'vue-cookie';
import VueRouter from 'vue-router';

Vue.use(VueCookie);
Vue.use(VueRouter);

//components
import newUserForm from './components/new-user-form.vue';
import existUserForm from './components/exist-user-form.vue';
import images from './components/images.vue';
import askForm from './components/ask-form.vue';
import carousel from './components/carousel.vue';

Vue.component('new-user-form', newUserForm);
Vue.component('exist-user-form', existUserForm);
Vue.component('images', images);
Vue.component('carousel', carousel);

const routes = [
  { path: '/new-user', component: newUserForm },
  { path: '/exist-user', component: existUserForm },
  { path: '/images', component: images },
  { path: '/', component: askForm },
];
const router = new VueRouter({ routes });

let app = new Vue({
  router,
  created: function () {
    const imageCode = this.$route.query.imageid;
    if (imageCode) this.$cookie.set('new-image', imageCode, 1);
  },
}).$mount('#app');
