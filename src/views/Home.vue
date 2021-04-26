<template>
  <loader v-if="loading" ></loader>
  <page-layout v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modalToggle" >Создать</button>
    </template>
    <request-table :requests="requests" ></request-table>
  </page-layout>

  <teleport to="body">
    <modal-component v-if="modal" title="Создать заявку" @close="modalToggle" >
      <request-form @created="modal = false" ></request-form>
    </modal-component>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import pageLayout from '@/components/ui/pageLayout.vue';
import requestTable from '@/components/request/requestTable.vue'
import modalComponent from '@/components/ui/modal.vue'
import requestForm from '@/components/request/requestForm.vue';
import loader from '@/components/ui/loader.vue'

export default defineComponent({
  components: { pageLayout, requestTable, modalComponent, requestForm, loader},
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests'])

    const modalToggle = () => {
      modal.value = !modal.value
    }

    return {
      modal,
      modalToggle,
      requests,
      loading
    }
  }
});
</script>