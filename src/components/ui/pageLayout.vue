<template>
	<div class="breadcrumbs" v-if="back" >
		<router-link to="/" class="text-white" >
			Вернуться к списку заявок
		</router-link>
	</div>
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
		},
		back: { 
			type: Boolean,
			required: false,
		}
	},
	setup(props) {
		document.title = props.title
	}
})
</script>

<style lang="">
	
</style>