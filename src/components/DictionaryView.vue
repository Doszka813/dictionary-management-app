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
        <th></th>
      </tr>
      <tr v-for="(pair, index) in dictionaries[id].pairs" :key="index">
        <td>{{index+1}}</td>
        <td>{{pair.domain}}</td>
        <td>{{pair.range}}</td>
        <td @click="editPair(index)">
          <v-icon>edit</v-icon>
        </td>
        <td @click="removePair(index)">
          <v-icon dark>delete</v-icon>
        </td>
      </tr>
    </table>
    <v-form class="form" v-if="addNewPair" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model.trim="pair.domain" label="Domain" required></v-text-field>
      <v-text-field v-model.trim="pair.range" label="Range" required></v-text-field>
      <br>
      <v-btn color="primary" :disabled="!valid" @click="addPair">Add
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn color="primary" :disabled="!valid" @click="addNewPair = !addNewPair">Submit</v-btn>

    </v-form>
    <br>
    <v-btn v-if="!addNewPair" @click="addNewPair = !addNewPair" color="blue darken-2" dark>
      <v-icon dark left>add</v-icon>Add row</v-btn>
    <br>
    <br>
    <router-link to="/dictionaries">
      <v-btn>
        <v-icon left>arrow_back</v-icon>Back</v-btn>
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
      addNewPair: false,
      pair: {
        domain: '',
        range: ''
      }
    }
  },
  methods: {
    removePair(index) {
      this.dictionaries[this.id].pairs.splice(index, 1);
    },
    addPair() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.dictionaries[this.id].pairs.push(this.pair);
          this.pair = {};
        } else {}
      });
    },
  }
}
</script>

<style scoped>
h1 {
  margin-top: 30px;
}

table {
  font-size: 20px;
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

.form {
  margin: 40px auto;
  width: 600px;
}


</style>
