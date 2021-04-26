<template>
	<form @submit.prevent="onSubmit">
		<div :class="['form-control', { invalid: fError }]">
			<label for="fio">ФИО</label>
			<input 
				v-model="fio" 
				@blur="fBlur"
				type="text" 
				id="fio"
				placeholder="Введите..."
			>
			<small v-if="fError">{{ fError }}</small>
		</div>
		<div :class="['form-control', { invalid: pError }]">
			<label for="phone">Телефон</label>
			<input 
				v-model="phone" 
				@blur="pBlur"
				type="text" 
				id="phone"
				placeholder="Введите..."
			>
			<small v-if="pError">{{ pError }}</small>
		</div>
		<div :class="['form-control', { invalid: aError }]">
			<label for="amount">Сумма</label>
			<input 
				v-model="amount" 
				@blur="aBlur"
				type="text" 
				id="fio"
				placeholder="Введите..."
			>
			<small v-if="aError">{{ aError }}</small>
		</div>
		<div class="form-control">
			<label for="status">Статус</label>
			<select id="status" v-model="status">
				<option value="done">Завершен</option>
				<option value="cancelled">Отменен</option>
				<option value="active">Активен</option>
				<option value="pending">Выполняется</option>
			</select>
		</div>
		<button class="btn primary" type="submit" :disabled="isSubmitting">Подтвердить</button>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRequestForm } from '@/use/requestForm'
import { IRequest } from '@/store/modules/request.module'
import { useStore } from 'vuex'

export default defineComponent({
	emits: ['created'],
	setup(_, { emit }) {

		const store = useStore()

		const submit = (values: IRequest) => {
			store.dispatch('request/create', values)
			emit('created', values)
		}

		return { 
			...useRequestForm(submit)
		}
	}
})
</script>

<style lang="">
	
</style>