<template>
  <div>
    <h1>{{title}}</h1>
    <v-tabs v-model="active" color="gray" dark slider-color="blue">
      <v-tab v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        {{ dictionary.name }}
      </v-tab>
      <v-tab-item v-for="(dictionary, index) in dictionaries" :key="index" ripple>
        <v-card flat>
          <v-card-text>
            <h2>
              <router-link to="/dictionary/:id">{{dictionary.name.toUpperCase() }}</router-link>
            </h2>
            <DictionaryView/>
            <!-- <table>
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
            </table> -->
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { dictionaries } from './dictionaries'
import { DictionaryView } from './DictionaryView.vue'

export default {
  name: 'DictionariesManager',
  components: {
    DictionaryView
  },
  data() {
    return {
      title: 'Available Dictionaries',
      dictionaries: dictionaries
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
}

td {
  text-align: left;
  border-bottom: 1px dotted gray;
}

th, td {
  padding: 0 40px;
  padding-top: 15px;
}

a {
  text-decoration: none;
}
</style>
