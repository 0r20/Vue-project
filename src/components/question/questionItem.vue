<template>
	<div class="question" @click="toggle">
		<div class="question-title">{{ question.title }}</div>
		<div class="question-body" v-if="isOpen" >{{ question.body }}</div> 
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	props: {
		question: {
			type: Object, 
			required: true
		}
	},
	setup() {
		const isOpen = ref(false)

		const toggle = () => isOpen.value = !isOpen.value

		return { 
			isOpen,
			toggle
		}
	}
})
</script>

<style lang="">
	
</style>