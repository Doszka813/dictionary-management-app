<template>
  <v-app dark id="app">
    <v-toolbar >
      <v-toolbar-title><router-link to='/'>Dictionary Management</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          <router-link to='/dictionaries'>Dictionaries</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to='/addDictionary'>Add Dictionary <v-icon dark standard>add</v-icon></router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'App'
  }

</script>

<style>
@import 'css/style.css';

body {
  margin: 0 auto;
}
  
#app {
  text-align: center;
}

</style>
