<template>
	<form @submit.prevent="onSubmit" >
		<h1>Войти в систему</h1>
		<div :class="['form-control', { invalid: eError }]">
			<label for="email">Email</label>
			<input 
				type="email" 
				v-model="email" 
				@blur="eBlur"
				id="email" 
				placeholder="Input Email"
			>
			<small v-if="eError">{{ eError }}</small>
		</div>
		<div :class="['form-control', { invalid: pError }]">
			<label for="password">Password</label>
			<input 
				type="password" 
				v-model="password" 
				@blur="pBlur"
				id="password" 
				placeholder="Input password"
			>
			<small v-if="pError">{{ pError }}</small>
		</div>
		<button class="btn primary" :disabled="isSubmitting || isTooManyAttempts" type="submit">Submit</button>
		<div class="text-danger" v-if="isTooManyAttempts">Too many attempts. Try again later</div>
	</form>
</template>

<script lang="ts">
import {defineComponent, computed, watch} from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
	setup() {

		const { handleSubmit, isSubmitting, submitCount } = useForm()

		const { value: email, errorMessage: eError, handleBlur: eBlur} = useField(
			'email',
			yup
				.string()
				.trim()
				.required()
				.email()
		)
		const { value: password, errorMessage: pError, handleBlur: pBlur} = useField(
			'password',
			yup
				.string()
				.trim()
				.required()
				.min(6)
		)

		const isTooManyAttempts = computed(() => submitCount.value >= 3)

		watch(isTooManyAttempts, (value) => {
			if (value) {
				setTimeout(() => submitCount.value = 0, 10 * 1000)
			}
		})

		const onSubmit = handleSubmit((values) => {
			console.log(values)
		})

		return { 
			onSubmit, 
			isSubmitting,
			email, 
			password,
			eError,
			pError,
			eBlur,
			pBlur,
			isTooManyAttempts
		}
	}

})
</script>

<style lang="">
	
</style>