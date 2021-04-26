<template>
	<div class="container">
		<app-message></app-message>
		<slot />
	</div>
</template>

<script lang="ts">
import AppMessage from '@/components/ui/alert.vue'
import { defineComponent} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { error } from '@/utils/error'

export default defineComponent({
	setup() {	
		const store = useStore()
		const route = useRoute()

		if (route.query?.message === 'auth') {
			store.dispatch('setMessage', { 
				value: error(route.query.message),
				type: "warning"
			})
		}
	},
	components: {AppMessage}
})
</script>