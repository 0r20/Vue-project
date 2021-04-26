<template>
	<the-navbar></the-navbar>
	<div class="container with-nav">
		<app-message></app-message>
		<slot/>
	</div>
</template>

<script lang="ts">
import AppMessage from '@/components/ui/alert.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import { defineComponent} from 'vue'

export default defineComponent({
  components: { TheNavbar, AppMessage },
})
</script>
