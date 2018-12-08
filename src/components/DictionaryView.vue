<template>
  <div class="dictionary">
    <h1 id="dictionaryName" :class="{'active': editName}">{{dictionaries[id].name}}<v-icon @click="editName = !editName"
        id="icon" :class="{'active': editName, 'inactive': !editName}">edit</v-icon>
    </h1>
    <v-form v-if="editName">
      <v-text-field class="form" @keyup.enter="submit" v-model.trim="dictionaries[id].name" :counter="20" label="Edit Name"
        v-validate="'required | min:4 | max:20'">
      </v-text-field>
      <v-icon @click="editName = !editName">done_outline</v-icon>
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
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(pair, index) in dictionaries[id].pairs" :key="index">
        <td>{{index+1}}</td>
        <td :class="{'active': editPairs}">{{pair.domain}}
          <br>
          <v-form v-if="editPairs">
            <v-text-field v-model.trim="pair.domain" required></v-text-field>
          </v-form>
        </td>
        <td :class="{'active': editPairs}">{{pair.range}}
          <br>
          <v-form v-if="editPairs">
            <v-text-field v-model.trim="pair.range" required></v-text-field>
          </v-form>
        </td>
        <td @click="editPair(index)">
          <v-icon :class="{'active': editName, 'inactive': !editName}" >edit</v-icon>
        </td>
        <td @click="removePair(index)">
          <v-icon dark>clear</v-icon>
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
      <v-icon dark left>add</v-icon>Add row
    </v-btn>
    <v-btn color="error" @click="removeDictionary(id)">Delete</v-btn>
    <v-btn color="primary" @click="validate()">Validate</v-btn>

    <br>
    <br>
    <router-link to="/dictionaries">
      <v-btn>
        <v-icon left>arrow_back</v-icon>Back
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { dictionaries } from './dictionaries'
import { dictionaryService } from '../services/dictionaryService'

export default {
  name: 'DictionaryView',
  data() {
    return {
      dictionaries: dictionaries,
      service: dictionaryService,
      id: this.$route.params.id,
      addNewPair: false,
      editName: false,
      editPairs: false,
      pair: {
        domain: '',
        range: ''
      }
    }
  },
  methods: {
    removePair(index) {
      this.dictionaries[this.id].pairs.splice(index, 1);

      if(this.dictionaries[this.id].pairs.length < 1) {
        this.removeDictionary(this.id);
      };
    },
    editPair(index) {
      this.editPairs = !this.editPairs;
    },
    addPair() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.dictionaries[this.id].pairs.push(this.pair);
          this.pair = {};
        } else {}
      });
    },
    removeDictionary(id) {
      this.dictionaries.splice(id, 1);
    },
    validate() {
      this.service.findDuplicates(dictionaries[this.id].pairs);
    }
    // findDuplicates (data) {
    //   let duplicates = []
    //   let domains = data.map(el => el.domain);
    //   data.forEach((element, index) => {
    //     let duplicateIdx = domains.indexOf(element.domain, index + 1);
    //     if (duplicateIdx > -1) {
    //       if (element.range === data[duplicateIdx].range
    //         &&  duplicates.indexOf(duplicateIdx) === -1) {
    //           if(duplicates.indexOf(index) === -1){
    //             duplicates.push(index)
    //           }
    //           duplicates.push(duplicateIdx)           
    //       }
    //     }
    //   })
    //   console.log(duplicates)
    // }
  }
}
</script>

<style>
#icon {
  font-size: 20px;
  position: relative;
  top: -7px;
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
