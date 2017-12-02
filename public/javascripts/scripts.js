var VueCookie = require('vue-cookie');
//Vue.use(VueCookie);

Vue.component('new-user-form', {
  data() {
    return {
      login: ''
    };
  },
  template: `
        <div>
            <label>Логин</label>
            <input v-model="login" type="text">
            <button v-on:click="saveNewUser">Отправить</button>
        </div>
        `,
  methods: {
    saveNewUser: function() {
      //console.log(this.$route.query.code);

      axios.post('/users', {
        login: this.login,
//                image: this.$route.query.code
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    newUserFormShow: false,
    askFormShow: true
  },
  methods: {
    newUser: function() {
      this.$cookie.set('test', 'Hello world!', 1);
      this.newUserFormShow = true;
      this.askFormShow = false
    },
    existUser: function() {
      console.log('ekwns2');
    }
  }
});





