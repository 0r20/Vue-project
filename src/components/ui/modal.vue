<template>
	<div class="modal-backdrop" @click="$emit('close')"></div>
	<div class="modal">
		<h3 v-if="title">{{ title }}</h3>
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	emits: ['close'],
	props: { 
		title: {
			type: String,
		}
	}	
})
</script>

<style lang="">
	
</style>