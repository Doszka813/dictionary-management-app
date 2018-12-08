<template>
  <div class="welcome">
    <h1>{{msg}}</h1>
    <p>You can add a new dictionary or review existing ones</p>
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
