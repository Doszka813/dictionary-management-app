<template>
  <div class="dictionary" v-if="dictionary">
    <h1 id="dictionaryName" :class="{'active': editName}">{{dictionary.name}}<v-icon @click="editName = !editName"
        id="icon" :class="{'active': editName, 'inactive': !editName}">edit</v-icon>
    </h1>
    <v-form v-if="editName">
      <v-text-field class="form" v-model.trim="dictionary.name" :counter="20" label="Edit Name"
        v-validate="'required | min:4 | max:20'">
      </v-text-field>
      <v-icon @click="editName = !editName">done_outline</v-icon>
    </v-form>
    <v-btn color="primary" @click="validate()">Validate</v-btn>
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
        <td>
          <v-icon v-if="editPairs" @click="editPairs = !editPairs">done_outline</v-icon>
        </td>
        <td @click="removePair(index)">
          <v-icon dark>clear</v-icon>
        </td>
        <td v-if="pair.errors.indexOf('DUPLICATE') !== -1">
          <v-icon color="yellow">error_outline</v-icon> DUPLICATE
        </td>
        <td v-if="pair.errors.indexOf('FORK') !== -1">
          <v-icon color="orange">error_outline</v-icon> FORK
        </td>
        <td v-if="pair.errors.indexOf('CHAIN') !== -1">
          <v-icon color="red">error_outline</v-icon> CHAIN
        </td>
        <td v-if="pair.errors.indexOf('CYCLE') !== -1">
          <v-icon color="#b30000">error_outline</v-icon> CYCLE
        </td>
      </tr>
    </table>
    <v-form class="form" v-if="addNewPair" ref="form">
      <v-text-field v-model.trim="pair.domain" label="Domain" required></v-text-field>
      <v-text-field v-model.trim="pair.range" label="Range" required></v-text-field>
      <br>
      <v-btn color="primary" @click="addPair">Add
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn color="primary" @click="addNewPair = !addNewPair">Cancel</v-btn>

    </v-form>
    <br>
    <v-btn v-if="!addNewPair" @click="addNewPair = !addNewPair" color="blue darken-2" dark>
      <v-icon dark left>add</v-icon>Add row
    </v-btn>
    <v-btn color="primary" @click="editPair(index)">Edit rows<v-icon id="icon" :class="{'active': editName, 'inactive': !editName}">edit</v-icon></v-btn>
    <br>
    <v-btn color="error" @click="removeDictionary()">Delete</v-btn>
    <router-link to="/dictionaries">
      <v-btn>
        <v-icon left>arrow_back</v-icon>Back
      </v-btn>
    </router-link>
  </div>
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
    removeDictionary(id) {
      this.service.removeById(id);
    },
    validate() {
      this.dictionary.pairs.forEach(pair => pair.errors = []);
      const addError = (pairIndex, errorType) => this.dictionary.pairs[pairIndex].errors.push(errorType)

      this.validationService.findDuplicates(this.dictionary.pairs)
          .forEach(errorPairIndex => addError(errorPairIndex, "DUPLICATE"));

      let forks = this.validationService.findForks(this.dictionary.pairs);
      forks.forEach(forkIndex =>  this.dictionary.pairs[forkIndex].errors.push("FORK"));
      let chains = this.validationService.findChains(this.dictionary.pairs);
      chains.forEach(chainIndex => this.dictionary.pairs[chainIndex].errors.push("CHAIN"));
      let cycles = this.validationService.findCycles(this.dictionary.pairs);
      cycles.forEach(cycleIndex => this.dictionary.pairs[cycleIndex].errors.push("CYCLE"))
    }
  }
}
</script>

<style>
#icon {
  font-size: 20px;
  position: relative;
  left: 10px;
}

.form {
  margin: 40px auto;
  width: 600px;
}

.active {
  color: gray;
}

.inactive {
  color: rgb(67, 121, 139);
}
</style>
