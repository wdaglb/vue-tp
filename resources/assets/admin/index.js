import Vue from 'vue'
import axios from 'axios'
import Page from './views/index'
import './css/main.scss'

// Vue.prototype.$http = axios

new Vue({
    el: '#app',
    render: h => h(Page)
})
