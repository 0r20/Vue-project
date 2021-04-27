<template>
  <loader v-if="loading" ></loader>
  <page-layout v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modalToggle" >Создать</button>
    </template>

    <request-filter v-model="filter" ></request-filter>

    <request-table :requests="requests" ></request-table>

  </page-layout>

  <teleport to="body">
    <modal-component v-if="modal" title="Создать заявку" @close="modalToggle" >
      <request-form @created="modal = false" ></request-form>
    </modal-component>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex'
import pageLayout from '@/components/ui/pageLayout.vue';
import requestTable from '@/components/request/requestTable.vue'
import modalComponent from '@/components/ui/modal.vue'
import requestForm from '@/components/request/requestForm.vue';
import requestFilter, { IFilter } from '@/components/request/requestFilter.vue';
import loader from '@/components/ui/loader.vue'
import { IRequest } from '@/store/modules/request.module';

export default defineComponent({
  components: { 
    pageLayout, 
    requestTable, 
    modalComponent, 
    requestForm, 
    loader, 
    requestFilter
  },
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref<IFilter | null>(null)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    watch(filter, (value) => {
      console.log(value)
    })

    const requests = computed(() => {
      return store
        .getters['request/requests']
        .filter((request: IRequest) => {
          if (filter.value?.name) {
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter((request: IRequest) => {
          if (filter.value?.status) {
            return request.status.includes(filter.value.status)
          }
          return request
        })
    })

    const modalToggle = () => {
      modal.value = !modal.value
    }

    return {
      modal,
      modalToggle,
      requests,
      loading,
      filter
    }
  }
});
</script>