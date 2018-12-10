<template>
  <div class="container">
    <div v-if="dictionaries.length<1">
      <h1>The List is empty, please <router-link to="/addDictionary">add </router-link>a dictionary</h1>
    </div>
    <div v-if="dictionaries.length>0">
      <h1>{{title}}
        <v-badge id="counter" color="info" overlap>
          <span slot="badge" dark medium>{{dictionaries.length}}</span>
          <v-icon color="black" large>
          library_books
          </v-icon>
        </v-badge>
      </h1>
      <v-tabs dark slider-color="blue">
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
              <router-link :to="{path: '/dictionary/' + dictionary.id }">
                <v-btn color="blue darken-1" dark><v-icon left>edit</v-icon>Edit</v-btn>
              </router-link>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import { dictionaryService } from '../services/dictionaryService'

export default {
  name: 'DictionariesManager',
  data() {
    return {
      title: 'Available Dictionaries',
      dictionaries: [],
      service: dictionaryService,
    }
  },
  created() {
    this.dictionaries = this.service.getAll();
  }
}

</script>

<style scoped>
#counter {
  margin-left: 15px;
  font-size: 14px;
}

#card {
  width: 700px;
  margin: 0 auto;
}
</style>
