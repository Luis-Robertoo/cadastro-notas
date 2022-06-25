<template>
  <v-app>
    <v-main>
      <FormularioNotas/>
    </v-main>
  </v-app>
</template>

<script>
import FormularioNotas from './components/Form.vue';

export default {
  name: 'App',

  components: {
    FormularioNotas,
  },

  data: () => ({
    //
  }),
};
</script>
