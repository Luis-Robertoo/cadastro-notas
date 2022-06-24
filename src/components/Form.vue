<template>  
  <div>
    <h1>Cadastro de Notas</h1>
    <form ref="formCad">
      <v-row>
        <v-col col="3">
          <input value="text" v-model="form.cnpj" placeholder="CNPJ do estabelecimento">
        </v-col>

      </v-row>
      


      <input type="button" value="seila" @click="teste()"/>
    </form>
    {{form.cnpj}}
  </div>
</template>

<script>
export default {
  name: 'FormularioNotas',


  data(){
    return {
      form: {
        cnpj: null,
        canalCompra: null,
        dataCompra: null,
        numNota: null,
        file: null,
        produtos: {
          p1:0,
          p2:0,
          p3:0
        }
      }
    }
  },
  methods:{
    teste(){
      console.log('aqui')
    }
  }
}





</script>