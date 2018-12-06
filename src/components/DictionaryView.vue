<template>
  <div class="dictionary">
    <h1>{{dictionaries[id].name}}</h1>
    <table>
      <tr>
        <th>
        </th>
        <th>
          <h2>Domain</h2>
        </th>
        <th>
          <h2>Range</h2>
        </th>
      </tr>
      <tr v-for="(pair, index) in dictionaries[id].pairs" :key="index">
        <td>{{index+1}}</td>
        <td>{{pair.domain}}</td>
        <td>{{pair.range}}</td>
      </tr>
    </table>
    <router-link to="/dictionaries">
      <v-btn color="blue darken-2" dark>
        <v-icon dark left>arrow_back</v-icon>Back
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { dictionaries } from './dictionaries'

export default {
  name: 'DictionaryView',
  data() {
    return {
      dictionaries: dictionaries,
      id: this.$route.params.id,
    }
  },
}
</script>

<style scoped>
h1 {
  margin-top: 30px;
}

table {
  margin: 40px auto;
  border-collapse: collapse;
}

td {
  text-align: left;
  border-bottom: 1px solid white;
}

th, td {
  padding: 0 40px;
  padding-top: 15px;
}

a {
  text-decoration: none;
}

</style>
