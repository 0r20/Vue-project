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
    		<tr>
    			<td>asd</td>
    			<td>asd</td>
    			<td>asd</td>
    			<td>asd</td>
    			<td>asd</td>
    			<td>asd</td>
    		</tr>
    	</tbody>
	</table>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
	props: { 
		requests: Array
	}
})
</script>

<style lang="">
	
</style>