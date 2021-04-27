<template>
	<p :class="['badge', className]">
		{{ text }}
	</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
	props: { 
		type: {
			type: String,
			required: true,
			validator(value: string) {
				return ['active', 'cancelled', 'done', 'pending'].includes(value)
			}
		}
	},
	setup(props: { type: string }) {
		const classesMap = {
			active: 'primary',
			cancelled: 'danger',
			done: 'primary',
			pending: 'warning',
		}

		const textMap = {
			active: 'Активен',
			cancelled: 'Отменен',
			done: 'Завершен',
			pending: 'Выполняется',
		}

		const className = ref(classesMap[props.type as keyof typeof classesMap])
		const text = ref(textMap[props.type as keyof typeof textMap])

		return { 
			className,
			text
		}
	}
})
</script>

<style lang="">
	
</style>