<template lang="">
	<page-layout title="Помощь">
		<question-list></question-list>
	</page-layout>
</template>

<script>
import pageLayout from '@/components/ui/pageLayout.vue';
import { defineComponent } from 'vue';
import questionList from '@/components/question/questionList'

export default defineComponent({
  components: { pageLayout, questionList },
});
</script>