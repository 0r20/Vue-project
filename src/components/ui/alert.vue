<template>
	<div :class="['alert', message?.type]" v-if="message" >
		<p class="alert-title">{{ title }}</p>
		<p>{{ message?.value }}</p>
		<span class="alert-close" @click="onClose" >&times;</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
	setup() {
		const store = useStore()

		const TITLE_MAP = {
			danger: "Ошибка",
			primary: "Успешно",
			warning: "Внимание"
		}

		const message = computed(() => store.state.message) 
		const title = computed(() => message.value ? TITLE_MAP[message.value.type as keyof typeof TITLE_MAP] : null)

		return { 
			message,
			title,
			onClose: () =>  store.commit('clearMessage')
		}
	}
})
</script>

<style lang="">
	
</style>