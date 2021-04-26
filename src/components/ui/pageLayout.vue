<template>
	<div class="card">
		<h1 class="card-title">
			{{ title }}
			<slot name="header" />
		</h1>
		<slot />	
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	props: { 
		title: { 
			type: String, 
			required: true,
		}
	},
	setup(props) {
		document.title = props.title
	}
})
</script>

<style lang="">
	
</style>