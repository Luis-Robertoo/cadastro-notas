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
                  :rules="rules.obrigatorio"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-1">
              <v-select
                  :items="canalCompra"
                  v-model="form.canalCompra"
                  label="Canal de compra do produto"
                  outlined
                  :rules="rules.obrigatorio"
                  required
                ></v-select>
              </v-col>
              <v-col cols="2" class="pa-1">
              <v-text-field
                  v-model="form.dataCompra"
                  label="Data de compra"
                  outlined
                  :rules="rules.obrigatorio"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="pa-1">
                <v-text-field
                  v-model="form.numNota"
                  placeholder="Número do cupom fiscal"
                  label="Número do cupom fiscal"
                  outlined
                  :rules="rules.obrigatorio"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="px-1 ma-1">
              <v-col cols="4" class="pa-1">
                <v-select
                  item-text="nome"
                  item-value="id"
                  :items="produtos"
                  v-model="prodSelecionado"
                  label="Selecione os produtos comprados"
                  placeholder="Selecione os produtos comprados"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-1">
                <v-text-field
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
                  :rules="rules.obrigatorio"
                  required
                ></v-text-field>
                <v-file-input
                  class="mb-0 pb-0"
                  :rules="[rules.fileSize, rules.obrigatorio]"
                  v-model="form.file"
                  accept=".pdf, image/jpeg, image/jpg"
                  placeholder="Upload cupom fiscal"
                  prepend-inner-icon="mdi-magnify"
                  prepend-icon=""
                  label="Upload cupom fiscal"
                  outlined
                  required
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
          
      </v-form>
    </v-container>
</template>

<script>

import listarProdutos from '../services/produtos'
import salvarNota from '../services/notas'

export default {
  name: 'FormularioNotas',

  mounted(){
    this.GetProdutos()
  },
  computed: {
    totalItens:{
      
      return 42
    }
  },

  data(){
    return {
      form: {
        cnpj: null,
        canalCompra: null,
        dataCompra: null,
        numNota: null,
        file: null,
        produtos: [],
        valorTotalNota: null
      },
      canalCompra: [
        'Site',
        'Varejo',
        'Telefone'
      ],
      produtos: [],
      prodSelecionado: null,
      qtdProduto: null,
      cabecalhos: [
        {text: 'Produto', align: 'left', value: 'nome', sortable: false},
        {text: 'Quantidade', align: 'center', value: 'quantidade', sortable: false},
      ],
      headListados:[
        {text: 'Feito', value: 'done', sortable: false},
        {text: 'Texto', value: 'title', sortable: false},
        {text: 'Identificador', value: 'id', sortable: false}
      ],
      rules:{
        obrigatorio: [v => !!v || 'Campo Obrigatorio'],
        fileSize: [v => !v || v.size < 2000000 || 'O arquivo é maior que 2 MB!'],
        QtdMinima: [v => (v && v > 0) || 'Minimo de 1 produto'],
        selecione: [v => (v && typeof(v) != Number) || 'Selecione uma opção']
      },
      listados: [],
      
    }
  },
  methods:{
    
    addProduto(){
      if(this.qtdProduto != null && this.qtdProduto >= 0 && this.prodSelecionado != null){
        let nomeProduto = this.produtos.filter(ele => ele.id === this.prodSelecionado)[0].nome
        
        this.form.produtos.push({nome:nomeProduto, id:this.prodSelecionado, quantidade:this.qtdProduto})
        this.qtdProduto = null
        this.prodSelecionado = null
      }
    },

    deletar(item){
      this.form.produtos.splice(this.form.produtos.indexOf(item), 1)
    },
 
    GetProdutos(){
      listarProdutos.listarProdutos().then(resp => {
        resp != null ? this.produtos = resp.data : null
      })
    },

    enviar(){
      
      if(this.$refs.formCad.validate()){
        console.log(this.form, this.totalItens)
      }
      //salvarNota.cadastrarNotas(this.form).then(ele => {
        //console.log(ele)
      //})
    }
  }
}





</script>