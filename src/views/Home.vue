<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <button @click="ping">
      Console Ping
    </button>

    <button @click="errorPing">
      Console Error
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import back from '@/services/back.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    async ping () {
      const result = await back.ping()
      console.log(result)
    },
    async errorPing () {
      const result = await back.errorPing()
      console.log(result)
    }
  }
}
</script>
