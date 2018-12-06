<template>
  <div>
    <h1>{{title}}
      <v-badge id="counter" color="info" left overlap>
        <span slot="badge" dark medium>{{dictionaries.length}}</span>
        <v-icon color="white" large>
          library_books
        </v-icon>
      </v-badge>
    </h1>
    <v-tabs v-model="active" color="gray" dark slider-color="blue">
      <v-tab v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        {{ dictionary.name }}
      </v-tab>
      <v-tab-item v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        <v-card flat>
          <v-card-text id="card">
            <h2>
              <router-link :to="{path: '/dictionary/' + dictionary.id }">{{ dictionary.name.toUpperCase() }}</router-link>
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
            <v-btn color="error" @click="removeDictionary(index)">Delete</v-btn>
            <router-link :to="{path: '/dictionary/' + dictionary.id }">
              <v-btn color="dark">Edit</v-btn>
            </router-link>
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
      dictionaries: dictionaries,
    }
  },
  methods: {
    removeDictionary(id) {
      this.dictionaries.splice(id, 1);
    }
  }
}

</script>

<style scoped>
#counter {
  float: right;
}
h1 {
  padding: 30px;
}

table {
  font-size: 20px;
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
