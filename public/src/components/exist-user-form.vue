<template lang="html">
<div>
  <section class="input-form">
    <h2>Укажи свой никнейм</h2>
    <ul class="input-list style-1 clearfix">
      <li>
        <input type="text" placeholder="Eldar-First" v-model="login">
      </li>
      <li class="pull-left">
        <a href="#" v-on:click="checkUser">
            <div class="button-fill orange">
                <div class="button-text">Войти</div>
                <div class="button-inside">
                    <div class="inside-text">Войти</div>
                </div>
            </div>
        </a>
      </li>
      <li v-if="isShowError">
        <p class="error-message" >{{errorText}}</p>
      </li>
    </ul>
  </section>
</div>
</template>

<script>
  export default {
    data() {
      return {
        login: '',
        isShowError: false,
        errorText: ''
      };
    },
    methods: {
      checkUser: function() {
        const imageCode = this.$cookie.get('new-image');
        const tryToAddImageToUser = () => {
          this.$cookie.set('login', this.login, 365);
          return imageCode ? axios.post('/images/add-new', {imageCode, login: this.login}) : Promise.resolve('Нет нового фото');
        };
        const goToImagesPage = (image) => {
          this.$cookie.set('last-image-index', image.index, 3);
          this.$cookie.delete('new-image');
          this.$router.push('images');
        };

        axios.get(`/users`, {
          params:{
            login: this.login
          }
        })
          .then(tryToAddImageToUser)
          .then(goToImagesPage)
          .catch(error => {
            this.errorText = error.response.data || error.message;
            this.isShowError = true;
            console.error(error);
          });
      }
    },
    created: function () {
        const login = this.$cookie.get('login');
        if (login) this.login = login;
    },
  }
</script>

<style scoped>
    .pull-left {
        text-align: left;
    }
    section.input-form {
        height: 280px;
        width: 70%;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .error-message {
        color: red;
    }
    section {
        margin-bottom: 60px;
        padding: 30px;
        background-color: rgba(216, 207, 193, 0.28);
    }
    h2 {
        margin-bottom: 30px;
        color: white;
    }
    label {
        display: block;
    }
    input[type="text"] {
        display: block;
        margin: 0;
        width: 100%;
        font-family: "Open Sans", sans-serif;
        font-size: 25px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        -webkit-border-radius: none;
        -moz-border-radius: none;
        -ms-border-radius: none;
        -o-border-radius: none;
        border-radius: none;
    }
    input[type="text"]:focus {
        outline: none;
    }
    ul.input-list {
        list-style: none;
        margin: 0 -10px;
        padding: 0;
    }
    ul.input-list li {
        display: block;
        padding: 0 10px;
        width: 50%;
        float: left;
    }
    @media all and (max-width: 800px) {
        ul.input-list {
            margin: 0;
        }
        ul.input-list li {
            padding: 0;
            width: 100%;
            float: none;
            margin-bottom: 10px;
        }
    }
    .style-1 input[type="text"] {
        padding: 12px;
        border: solid 1px gainsboro;
        -webkit-transition: box-shadow 0.3s, border 0.3s;
        -moz-transition: box-shadow 0.3s, border 0.3s;
        -o-transition: box-shadow 0.3s, border 0.3s;
        transition: box-shadow 0.3s, border 0.3s;
    }
    .style-1 input[type="text"]:focus, .style-1 input[type="text"].focus {
        border: solid 1px #707070;
        -webkit-box-shadow: 0 0 5px 1px #969696;
        -moz-box-shadow: 0 0 5px 1px #969696;
        box-shadow: 0 0 5px 1px #969696;
    }
    .button-fill {
        text-align: center;
        background: #ccc;
        display: inline-block;
        position: relative;
        text-transform: uppercase;
    }
    .button-fill.orange {
        background: #f26b43;
        color: #fff;
    }
    .button-fill.orange .button-inside {
        color: #f26b43;
    }
    .button-fill.orange .button-inside.full {
        border: 1px solid #f26b43;
    }
    .button-text {
        padding: 0 25px;
        line-height: 56px;
        letter-spacing: .1em;
    }
    .button-inside {
        width: 0px;
        height: 54px;
        margin: 0;
        float: left;
        position: absolute;
        top: 1px;
        left: 50%;
        line-height: 54px;
        color: #445561;
        background: #fff;
        text-align: center;
        overflow: hidden;
        -webkit-transition: width 0.5s, left 0.5s, margin 0.5s;
        -moz-transition: width 0.5s, left 0.5s, margin 0.5s;
        -o-transition: width 0.5s, left 0.5s, margin 0.5s;
        transition: width 0.5s, left 0.5s, margin 0.5s;
    }
    .button-inside.full {
        width: 100%;
        left: 0%;
        top: 0;
        margin-right: -50px;
        border: 1px solid #445561;
    }
    .inside-text {
        text-align: center;
        position: absolute;
        right: 50%;
        letter-spacing: .1em;
        text-transform: uppercase;
        -webkit-transform: translateX(50%);
        -moz-transform: translateX(50%);
        -ms-transform: translateX(50%);
        transform: translateX(50%);
    }
</style>