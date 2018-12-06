<template>
  <div>
    <h1>{{title}}</h1>
    <v-tabs v-model="active" color="gray" dark slider-color="blue">
      <v-tab v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        {{ dictionary.name }}
      </v-tab>
      <v-tab-item v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        <v-card flat>
          <v-card-text id="card">
            <h2>
              <router-link to="/dictionary/:id">{{ dictionary.name.toUpperCase() }}</router-link>
            </h2>
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
              <tr v-for="(pair, index) in dictionaries[index].pairs" :key="index">
                <td>{{index+1}}</td>
                <td>{{pair.domain}}</td>
                <td>{{pair.range}}</td>
              </tr>
            </table>
            <v-btn color="error" @click="deleteDictionary">Delete</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { dictionaries } from './dictionaries'

export default {
  name: 'DictionariesManager',
  data() {
    return {
      title: 'Available Dictionaries',
      dictionaries: dictionaries
    }
  },
  methods: {
    deleteDictionary() {
    
    }
  }
}
</script>

<style scoped>
h1 {
  padding: 30px;
}

table {
  margin: 40px auto;
  border-collapse: collapse;
}

tr {
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

#card {
  width: 700px;
  margin: 0 auto;
}
</style>
