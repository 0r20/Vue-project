<template>
  <page-layout title="Список заявок">
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
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex'
import pageLayout from '@/components/ui/pageLayout.vue';
import requestTable from '@/components/request/requestTable.vue'
import modalComponent from '@/components/ui/modal.vue'
import requestForm from '@/components/request/requestForm.vue';

export default defineComponent({
  components: { pageLayout, requestTable, modalComponent, requestForm},
  setup() {
    const store = useStore()
    const modal = ref(false)

    const requests = computed(() => store.getters['request/requests'])

    const modalToggle = () => {
      modal.value = !modal.value
    }

    return {
      modal,
      modalToggle,
      requests
    }
  }
});
</script>