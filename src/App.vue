<template>
  <component :is="layoutName" v-if="layoutName" >
    <router-view/>
  </component>
</template>

<script lang="ts">

import { defineComponent,computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from '@/layout/MainLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'

export default defineComponent({
  setup() {
    const route = useRoute()

    return { 
      layoutName: computed(() => route.meta.layout + '-layout')
    }
  },
  components: { MainLayout, AuthLayout}
})

</script>