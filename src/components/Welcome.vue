<template>
  <div class="welcome">
    <h1>{{msg}}</h1>
    <h3>You can add a new dictionary or review <router-link to="/dictionaries">existing ones</router-link>.</h3>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to the Dictionary Management App'
    }
  }
}
</script>

<style>
@import '../css/style.css';
</style>
