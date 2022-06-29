import {http} from './config'

export default {

    listarProdutos: () => {
        return http.get('produtos')
    },
}