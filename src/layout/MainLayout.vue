<template>
	<the-navbar></the-navbar>
	<div class="container with-nav">
		<div class="card">
			<slot/>
		</div>
	</div>
</template>

<script lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
import { defineComponent} from 'vue'

export default defineComponent({
  components: { TheNavbar },
})
</script>
