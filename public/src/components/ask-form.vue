<template lang="html">
<section class="input-form">
<a href="/#/new-user">
  <div class="button-fill grey">
    <div class="button-text">Я первый раз</div>
    <div class="button-inside">
      <div class="inside-text">Начнем</div>
    </div>
  </div>
  </a><a href="/#/exist-user">
  <div class="button-fill orange">
    <div class="button-text">Я уже был</div>
    <div class="button-inside">
      <div class="inside-text">Вспомним</div>
    </div>
  </div>
</a>
</section>
</template>

<script>
  export default {
    data: function() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
    section.input-form {
        height: 250px;
        width: 70%;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    * {
        font-family: 'Open Sans', sans-serif;
    }
    .button-fill {
        text-align: center;
        background: #ccc;
        display: inline-block;
        position: relative;
        text-transform: uppercase;
        margin: 25px;
    }
    .button-fill.grey {
        background: #445561;
        color: white;
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
