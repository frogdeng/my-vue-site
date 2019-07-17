<template>
  <div class="hello">
    <div class="container">
      <a href="#" @click="singout" class="btn btn-lg btn-primary btn-block">登出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{
    singout(){
      const api = `${process.env.APIPATH}/logout`;
      const vm = this
      this.$http.post(api).then((response) => {
          vm.$router.push('/login')
        
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
