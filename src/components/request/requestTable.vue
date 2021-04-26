<template>
	<h4 v-if="requests.length === 0" class="text-center" >Заявок пока нет</h4>	
	<table v-else class="table">
			<thead>
				<tr>
					<th>#</th>
					<th>ФИО</th>
					<th>Телфон</th>
					<th>Сумма</th>
					<th>Статус</th>
					<th>Действие</th>
				</tr>
			</thead>
    	<tbody>
    		<tr v-for="(r, idx) in requests" :key="r.id">
    			<td>{{ idx + 1 }}</td>
    			<td>{{ r.fio }}</td>
    			<td>{{ r.phone }}</td>
    			<td>{{ r.amount }}</td>
    			<td>{{ r.status }}</td>
    			<td> 
					<router-link custom v-slot="{ navigate }" :to="{ name: 'Request', params: { id: r.id } }" >
						<button class="btn primary" @click="navigate">Открыть</button>
					</router-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import { IRequest } from '@/store/modules/request.module'
export default defineComponent({
	props: { 
		requests: { 
			type: Array as PropType<IRequest[]>,
		}
	}
})
</script>

<style lang="">
	
</style>