<template>
	<loader v-if="loading"></loader>
	<page-layout v-else-if="request" title="Заявка" back> 
		<p><strong>Имя владельца: </strong>{{ request.fio }}</p>
		<p><strong>Телфон: </strong>{{ request.phone }}</p>
		<p><strong>Сумма: </strong>{{ currency(request.amount) }}</p>
		<p><strong>Статус: </strong> <status-badge :type="request.status"></status-badge></p>

		<div class="form-control">
			<label for="status">Статус</label>
			<select id="status" v-model="status">
				<option value="done">Завершен</option>
				<option value="cancelled">Отменен</option>
				<option value="active">Активен</option>
				<option value="pending">Выполняется</option>
			</select>
		</div>

		<button class="btn danger" @click="remove" >Удалить</button>
		<button class="btn" @click="update" v-if="hasChanges" >Обновить</button>
	</page-layout>
	<h3 v-else class="text-center text-white">Заявки с Id = {{ id }} не существует</h3>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
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
		const status = ref()
		const loading = ref(false)
	
    	onMounted(async () => {
    	  loading.value = true
    	  await store.dispatch('request/loadById', route.params.id)
		  status.value = store.getters['request/request']?.status
    	  loading.value = false
    	})	

		const remove = async () => {
			try { 
				await store.dispatch('request/remove', route.params.id)
				router.push('/')
			} catch (e){}
		}

		const update = async () => {
			await store.dispatch('request/update', {id: route.params.id, status: status.value})
			request.value.status = status.value
		}

		const hasChanges = computed(() => status.value !== store.getters['request/request']?.status)

		const request = computed(() => store.getters['request/request'])

		return { 
			request,
			loading,
			id: route.params.id,
			currency,
			remove, 
			update,
			status,
			hasChanges
		}
	}
})
</script>

<style lang="">
	
</style>