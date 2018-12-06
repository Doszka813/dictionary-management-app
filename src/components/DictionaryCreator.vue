<template>
  <div class="forms">
    <h3>{{dictionary.name}}</h3>
    <v-form v-if="!isNameAdded" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model.trim="dictionary.name" :counter="20" label="Name" required>
      </v-text-field>
      <br>
      <v-btn color="primary" :disabled="!valid" @click="submitName">Create</v-btn>
      <v-btn color="error" @click="clear">Clear</v-btn>
      <router-link to="/dictionaries">
        <v-btn color="warning" darken-1><v-icon>arrow_back</v-icon>Back</v-btn>
      </router-link>
    </v-form>
    <v-form v-if="isNameAdded" ref="form" lazy-validation>
      <v-text-field v-model.trim="pair.domain" label="Domain" required></v-text-field>
      <v-text-field v-model.trim="pair.range" label="Range" required></v-text-field>
      <br>
      <v-btn color="primary" :disabled="!valid" @click="addPair">Add<v-icon>add</v-icon>
      </v-btn>
      <br>
      <br>
      <v-btn color="primary" :disabled="!valid" @click="submit">Submit</v-btn>
      <v-btn color="error" @click="clear">Clear</v-btn>
      <v-btn color="warning" darken-1 @click="isNameAdded = !isNameAdded"><v-icon>arrow_back</v-icon>Back</v-btn>
      <br>
      <br>
      <div id="preview" v-if="dictionary.pairs.length>0">
        <table>
          <tr>
            <th></th>
            <th>
              <h2>Domain</h2>
            </th>
            <th>
              <h2>Range</h2>
            </th>
          </tr>
          <tr v-for="(pair, index) in dictionary.pairs" :key="index">
            <td>{{index+1}}</td>
            <td>{{pair.domain}}</td>
            <td>{{pair.range}}</td>
          </tr>
        </table>
      </div>
    </v-form>
  </div>
</template>

<script>
import { dictionaries } from './dictionaries';

export default {
  name: 'DictionaryCreator',
  data() {
    return {
      dictionaries: dictionaries,
      dictionary: {
        id: dictionaries.length,
        name: '',
        pairs: []
      },
      pair: {
        domain: '',
        range: ''
      },
      isNameAdded: false,
    }
  },
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    submitName() {
      this.isNameAdded = !this.isNameAdded;
    },
    addPair() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.dictionary.pairs.push(this.pair);
          this.pair = {};
        } else {}
      });
    },
    submit() {
      this.dictionaries.push(this.dictionary);
      this.$router.push('/dictionaries');
    }
  }
}
</script>

<style scoped>
.forms {
  margin: 40px auto;
  width: 600px;
}

a {
  text-decoration: none;
}

table {
  margin: 40px auto;
  border-collapse: collapse;
}

tr {
  text-align: left;
  border-bottom: 1px solid white;
}

th,
td {
  padding: 0 40px 0 0;
  padding-top: 15px;
}
</style>
