import {http} from './config'

export default {

    listar: () => {
        return http.get('todos')
    },

    enviar: (dado, feito) => {
        return http.post('todos', {title: dado , done: feito})
    }
}