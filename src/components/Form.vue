<template>  
    <v-container aling="center" width="450" color="primary">
      <v-form ref="formCad" class="pa-1 ma-1" aling="center">

          <v-card
            elevation="2"
            outlined
          >
            <h1 class="text-center" >
              Cadastro de Notas
            </h1>

            <v-row class="pt-2 px-1 mx-1 mt-1" >
              <v-col cols="3" class="pa-1">
                <v-text-field
                  v-model="form.cnpj"
                  placeholder="CNPJ do estabelecimento"
                  label="CNPJ do estabelecimento"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-1">
              <v-select
                  :items="canalCompra"
                  v-model="form.canalCompra"
                  label="Canal de compra do produto"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="2" class="pa-1">
              <v-text-field
                  v-model="form.dataCompra"
                  label="Data de compra"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="pa-1">
                <v-text-field
                  v-model="form.numNota"
                  placeholder="Número do cupom fiscal"
                  label="Número do cupom fiscal"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-sheet height="190">
                  <v-calendar

                  >
                  </v-calendar>
              </v-sheet>
            </v-row>

            <v-row class="px-1 ma-1">
              <v-col cols="4" class="pa-1">
                <v-select
                  :items="produtos"
                  v-model="prodSelecionado"
                  label="Selecione os produtos comprados"
                  placeholder="Selecione os produtos comprados"
                  outlined
                  :rules="[prodSelecionado != null ? true : 'Selecione um produto']"
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-1">
                <v-text-field
                  :rules="rulesQtdMinima"
                  v-model="qtdProduto"
                  placeholder="Quantidade"
                  label="Quantidade"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="pa-1">
                <v-btn 
                  @click="addProduto()" 
                  block
                  elevation="2"
                  x-large
                  color="grey"
                >
                  Adicionar Produto
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="px-1 ma-1">
              <v-col cols="7" class="pa-1">
                <v-data-table
                  :headers="cabecalhos"
                  :items="form.produtos"
                  class="elevation-2"
                  hide-default-footer
                  dense
                >
                  <template v-slot:item.nome="{ item }">
                    <v-icon
                      small
                      @click="deletar(item)"
                    >
                      mdi-delete
                    </v-icon>
                    {{ item.nome }}
                  </template>
                </v-data-table>
              </v-col>
              <v-col cols="5" class="pa-1">
                <v-text-field
                  v-model="form.valorTotalNota"
                  placeholder="Valor total de produtos nessa nota"
                  label="Valor total de produtos nessa nota"
                  outlined
                ></v-text-field>
                <v-file-input
                  class="mb-0 pb-0"
                  :rules="rulesfileSize"
                  v-model="form.file"
                  accept=".pdf, image/jpeg, image/jpg"
                  placeholder="Upload cupom fiscal"
                  prepend-inner-icon="mdi-magnify"
                  prepend-icon=""
                  label="Upload cupom fiscal"
                  outlined
                  :show-size="true"
                  messages="Extensões aceitas: PDF, JPEG, JPG. com tamanho máximo de 2MB"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row class="px-1 ma-1">
              <v-col class="pa-1">
                <v-btn 
                    @click="enviar()" 
                    block
                    elevation="2"
                    x-large
                    color="grey"
                  >
                  Enviar
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
           {{ form }}
      </v-form>
    </v-container>
    
    
  
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
        produtos: [
          {nome: 'Barra 150g', quantidade: 2},
          {nome: 'Meio amargo 70g', quantidade: 3},
          {nome: 'Amargo 100g', quantidade: 1},
        ],
        valorTotalNota: null
      },
      canalCompra: [
        'Site',
        'Varejo',
        'Telefone'
      ],
      produtos: [
        'Barra 150g',
        'Ovo 300g',
        'Meio amargo 70g',
        'Amargo 100g',
        'Meio amargo 200g',
      ],
      prodSelecionado: {},
      qtdProduto: null,
      cabecalhos: [
        {text: 'Produto', align: 'left', value: 'nome', sortable: false},
        {text: 'Quantidade', align: 'center', value: 'quantidade', sortable: false},
      ],
      rulesfileSize: [value => !value || value.size < 2000000 || 'O arquivo é maior que 2 MB!'],
      rulesQtdMinima: [v => (v && v > 0) || 'Minimo de 1 produto'],
    }//v => (v && v.length <= 10) || 'Name must be less than 10 characters'
  },
  methods:{
    
    addProduto(){
      if(this.qtdProduto != null && this.qtdProduto >= 0 && this.prodSelecionado != null){
        this.form.produtos.push({nome:this.prodSelecionado, quantidade:this.qtdProduto})
        this.qtdProduto = null
        this.prodSelecionado = null
      }
    },
    deletar(item){
      this.form.produtos.splice(this.form.produtos.indexOf(item), 1)
    }
  }
}





</script>