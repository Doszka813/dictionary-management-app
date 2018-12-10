import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import DictionariesList from '@/components/DictionariesList'
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
      name: 'DictionariesList',
      component: DictionariesList
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
