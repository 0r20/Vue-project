<template >
	<nav class="navbar">
		<h3>Online bank</h3>
		<ul class="navbar-menu">
			<li>
				<router-link to="/">Заявки</router-link>
			</li>
			<li>
				<router-link to="/help">Помощь</router-link>
			</li>
			<li>
				<a href="#">Сообщения</a>
			</li>
			<li>
				<a @click.prevent="onLogout">Выход</a>
			</li>		
		</ul>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
	setup() {
		const store = useStore()
		const router = useRouter()

		const onLogout = () => {
			store.commit('auth/logout')
			router.push('/auth')
		}
		return { 
			onLogout
		}
	}	
})
</script>
<style lang="">
	
</style>