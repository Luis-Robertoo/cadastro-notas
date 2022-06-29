import {http} from './config'

export default {

    cadastrarNotas: (form) => {
        
        return http.post('enviando', {...form})
    },
}