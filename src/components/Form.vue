<template>  
  
    <v-form ref="formCad" class="pa-2 ma-2">
      <v-container>
        <v-card-title :class="['size-5rem']">
          Cadastro de Notas
        </v-card-title>
        <v-card>
          <v-row class="pa-2 ma-2" aling="center">
            <v-col col="3">
              <v-text-field
                v-model="form.cnpj"
                placeholder="CNPJ do estabelecimento"
              ></v-text-field>
            </v-col>

            <v-col col="5">
             <v-select
                :items="canalCompra"
                v-model="form.canalCompra"
                label="Canal de compra do produto"
                solo
              ></v-select>
            </v-col>


          </v-row>
          <v-row aling="center">
            <v-col>
              {{ form}}
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-form>
    
  
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
      },
      canalCompra: [
        'Site',
        'Varejo',
        'Telefone'
      ]
    }
  },
  methods:{
    teste(){
      console.log('aqui')
    }
  }
}





</script>