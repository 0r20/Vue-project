<template>
	<question-item v-for="q in questions" :key="q.title" :question="q"></question-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import questionItem from '@/components/question/questionItem.vue'

export default defineComponent({
	components: {
		questionItem
	},
	setup() {
		const questions = [
			{ 
				title: 'Что такое Vue?',
				body: 'Vue.js — JavaScript-фреймворк с открытым исходным кодом для создания пользовательских интерфейсов. Легко интегрируется в проекты с использованием других JavaScript-библиотек. Может функционировать как веб-фреймворк для разработки одностраничных приложений в реактивном стиле.'
			},
			{ 
				title: 'Что такое React?',
				body: 'React — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций. React может использоваться для разработки одностраничных и мобильных приложений.'
			},
		]
		return { 
			questions
		}
	}
})
</script>
<style lang="">
	
</style>