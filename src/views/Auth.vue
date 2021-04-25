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
import { defineComponent } from 'vue'
import { useLoginForm } from '@/use/loginForm'

export default defineComponent({
	setup() {
		return {...useLoginForm()}
	}

})
</script>

<style lang="">
	
</style>