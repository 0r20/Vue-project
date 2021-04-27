<template>
	<loader v-if="loading"></loader>
	<page-layout v-else-if="request" title="Заявка" back> 
		<p><strong>Имя владельца: </strong>{{ request.fio }}</p>
		<p><strong>Телфон: </strong>{{ request.phone }}</p>
		<p><strong>Сумма: </strong>{{ currency(request.amount) }}</p>
		<p><strong>Статус: </strong> <status-badge :type="request.status"></status-badge></p>

		<button class="btn danger" @click="remove" >Удалить</button>
	</page-layout>
	<h3 v-else class="text-center text-white">Заявки с Id = {{ id }} не существует</h3>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import pageLayout from '@/components/ui/pageLayout.vue';
import loader from '@/components/ui/loader.vue'
import statusBadge from '@/components/ui/status.vue'
import { currency } from '@/utils/currency'

export default defineComponent({
	components: {
		pageLayout,
		loader,
		statusBadge
	},
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const loading = ref(false)
	
    	onMounted(async () => {
    	  loading.value = true
    	  await store.dispatch('request/loadById', route.params.id)
    	  loading.value = false
    	})	

		const remove = async () => {
			try { 
				await store.dispatch('request/remove', route.params.id)
				router.push('/')
			} catch (e){}
		}

		const request = computed(() => store.getters['request/request'])

		return { 
			request,
			loading,
			id: route.params.id,
			currency,
			remove
		}
	}
})
</script>

<style lang="">
	
</style>