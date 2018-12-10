<template>
  <v-container color="blue-grey" v-if="dictionary">
    <h1 id="dictionaryName" :class="{'active': editName}">{{dictionary.name}}
      <v-icon @click="editName = !editName">edit</v-icon>
    </h1>
    <v-form v-if="editName">
      <v-text-field class="form" v-model.trim="dictionary.name" :counter="20" label="Edit Name">
      </v-text-field>
      <v-icon @click="saveName">done_outline</v-icon>
    </v-form>
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
        <th>
        </th>
      </tr>
      <tr v-for="(pair, index) in dictionary.pairs" :key="index">
        <td>{{index+1}}</td>
        <td :class="{'active': editPairs}">{{pair.domain}}
          <v-form v-if="editPairs">
            <v-text-field v-model.trim="pair.domain" required></v-text-field>
          </v-form>
        </td>
        <td :class="{'active': editPairs}">{{pair.range}}
          <v-form v-if="editPairs">
            <v-text-field v-model.trim="pair.range" required></v-text-field>
          </v-form>
        </td>
        <span @click="removePair(index)">
          <v-icon>delete_forever</v-icon>
        </span>
        <span v-if="pair.errors.indexOf('DUPLICATE') !== -1">
          <v-icon color="yellow">error_outline</v-icon> DUPLICATE
        </span>
        <span v-if="pair.errors.indexOf('FORK') !== -1">
          <v-icon color="orange">error_outline</v-icon> FORK
        </span>
        <span v-if="pair.errors.indexOf('CHAIN') !== -1">
          <v-icon color="red">error_outline</v-icon> CHAIN
        </span>
        <span v-if="pair.errors.indexOf('CYCLE') !== -1">
          <v-icon color="#b30000">error_outline</v-icon> CYCLE
        </span>
      </tr>
    </table>
    <v-form class="form" v-if="addNewPair" ref="form">
      <v-text-field v-model.trim="pair.domain" label="Domain"></v-text-field>
      <v-text-field v-model.trim="pair.range" label="Range"></v-text-field>
      <br>
      <v-btn color="blue darken-1" dark @click="addPair"><v-icon left>add</v-icon>Add
      </v-btn>
      <v-btn color="blue darken-1" dark @click="addNewPair = !addNewPair">Cancel</v-btn>
    </v-form>
    <br>
    <v-btn v-if="!addNewPair" @click="addNewPair = !addNewPair" color="blue darken-1" dark>
      <v-icon dark left>add</v-icon>Add row
    </v-btn>
    <v-btn v-if="editPairs" color="blue darken-1" dark @click="save"><v-icon>done_outline</v-icon></v-btn>
    <v-btn v-if="!editPairs" color="blue darken-1" dark @click="editPair"><v-icon left>edit</v-icon> Edit rows</v-btn>
    <br>
    <v-btn color="error" @click="removeDictionary()">Delete</v-btn>
    <router-link v-if="!editPairs" to="/dictionaries">
      <v-btn color="blue darken-1" dark>
        <v-icon left>save</v-icon>Save
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
import { dictionaryValidationService } from '../services/dictionaryValidationService'
import { dictionaryService } from '../services/dictionaryService'

export default {
  name: 'DictionaryView',
  data() {
    return {
      validationService: dictionaryValidationService,
      service: dictionaryService,
      dictionary: dictionaryService.getById(this.$route.params.id),
      addNewPair: false,
      editName: false,
      editPairs: false,
      pair: {
        domain: '',
        range: '',
        errors: [],
      },
    }
  },
  created() {
    this.dictionaries = this.service.getAll();
  },
  methods: {
    removePair(index) {
      this.dictionary.pairs.splice(index, 1);
      if (this.dictionary.pairs.length < 1) {
        this.removeDictionary(this.dictionary.id);
        this.$router.push('/dictionaries');
      };
      this.validate();
      this.service.update(JSON.stringify(this.dictionary));
    },
    editPair(index) {
      this.editPairs = !this.editPairs;
      this.validate();
      this.service.update(JSON.stringify(this.dictionary));
    },
    save() {
      this.service.update(JSON.stringify(this.dictionary));
      this.editPairs = !this.editPairs;
    },
    saveName() {
      this.service.update(JSON.stringify(this.dictionary));
      this.editName = !this.editName;
    },
    addPair() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.dictionary.pairs.push(this.pair);
          this.pair = {
            errors: []
          };
          this.validate();
          this.service.update(JSON.stringify(this.dictionary));
        } else {}
      });
    },
    removeDictionary() {
      this.service.removeById(this.dictionary.id);
      this.$router.push('/dictionaries');
    },
    validate() {
      this.dictionary.pairs.forEach(pair => pair.errors = []);
      const addError = (pairIndex, errorType) => this.dictionary.pairs[pairIndex].errors.push(errorType)

      this.validationService.findDuplicates(this.dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "DUPLICATE"));

      this.validationService.findForks(this.dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "FORK"));

      this.validationService.findChains(this.dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "CHAIN"));


      this.validationService.findCycles(this.dictionary.pairs)
        .forEach(errorPairIndex => addError(errorPairIndex, "CYCLE"));
    }
  }
}
</script>

<style>
.form {
  margin: 40px auto;
  width: 600px;
}

.active {
  color: grey;
}

span {
  padding-top: 15px
}
</style>
