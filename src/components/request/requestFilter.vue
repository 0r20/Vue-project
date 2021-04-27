<template>
	<div class="filter">
		<div class="form-control">
			<input autocomplete="off" id="name" v-model="name" type="text" placeholder="Начните вводить имя">
		</div>
		<div class="form-control">
			<select id="status" v-model="status">
				<option value="" disabled selected>Выберите статус</option>
				<option value="done">Завершен</option>
				<option value="cancelled">Отменен</option>
				<option value="active">Активен</option>
				<option value="pending">Выполняется</option>
			</select> 
		</div>
		<button class="btn danger" v-if="isActive" @click="onResetForm">Очистить</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

export interface IFilter {
	name: string;
	status: string;
}

export default defineComponent({
	emits: ['update:modelValue'],
	props: { 
		modelValue: {
			type: Object
		}
	},
	setup(_, {emit}) {
		const name = ref()
		const status = ref('')

		watch([name, status], ([wname, wstatus]) => {
			emit('update:modelValue', { 
				name: wname,
				status: wstatus
			})
		})

		const isActive = computed(() => name.value || status.value)

		const onResetForm = () => {
			name.value = ''
			status.value = ''
		}

		return { 
			name, 
			status,
			isActive,
			onResetForm
		}
	}
})
</script>

<style lang="">
	
</style>