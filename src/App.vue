<template>
  <div
    id="app"
    class="classApp"
  >
    <img src="./assets/logo.png">
    <img
      class="img-cover"
      src="./assets/test.jpg"
    >
    <img
      class="img-cover"
      src="/static/images/a1.jpg"
    >
  </div>
</template>

<script>

import _ from './utils'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      data: new Map(),
      test: [1, 2, 3],
      t: { a: 1, b: 2 }
    }
  },
  methods: {
    getData () {
      const { a, b } = this.t
    }
  }
}
</script>

<style >
.classApp {
  color: #000;
}
.img-cover {
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
