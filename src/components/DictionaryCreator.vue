<template>
  <div class="forms">
    <h3>{{dictionary.name}}</h3>
    <v-form v-if="!isNameAdded" ref="form">
      <v-text-field v-model.trim="dictionary.name" :counter="20" label="Name" name="name" v-validate="{ required: true, min:4, max:20}">
      </v-text-field>
      <br>
      <v-btn color="primary" @click="submitName">Create</v-btn>
      <v-btn color="error" @click="clear">Clear</v-btn>
      <router-link to="/dictionaries">
        <v-btn><v-icon>arrow_back</v-icon>Back</v-btn>
      </router-link>
    </v-form>
    <v-form v-if="isNameAdded" ref="form" lazy-validation>
      <v-text-field v-model.trim="pair.domain" label="Domain" name="domain" v-validate="{ required: true }"></v-text-field>
      <v-text-field v-model.trim="pair.range" label="Range" name="range" v-validate="{ required: true }"></v-text-field>
      <br>
      <v-btn color="primary" @click="addPair">Add<v-icon>add</v-icon>
      </v-btn>
      <br>
      <br>
      <v-btn color="primary" @click="submit">Submit</v-btn>
      <v-btn @click="isNameAdded = !isNameAdded"><v-icon>arrow_back</v-icon>Back</v-btn>
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
import { dictionaryService } from '../services/dictionaryService'

export default {
  name: 'DictionaryCreator',
  data() {
    return {
      service: dictionaryService,
      dictionary: {
        id: 0,
        name: '',
        pairs: []
      },
      pair: {
        domain: '',
        range: '',
        errors: []
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
          this.pair = {
            errors: []
          };
        } else {}
      });
    },
    submit() {
      this.service.add(JSON.stringify(this.dictionary));
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
</style>
