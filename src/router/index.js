import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import DictionariesManager from '@/components/DictionariesManager'
import DictionaryView from '@/components/DictionaryView'
import DictionaryCreator from '@/components/DictionaryCreator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/dictionaries',
      name: 'Dictionaries',
      component: DictionariesManager
    },
    {
      path: '/dictionary/:id',
      name: 'DictionaryView',
      component: DictionaryView
    },
    {
      path: '/addDictionary',
      name: 'DictionaryCreator',
      component: DictionaryCreator
    }
  ],
  mode: 'history'
})
