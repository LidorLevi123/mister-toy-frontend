<template>
	<AppHeader />
	<RouterView />
	<UserMsg />
</template>

<script>
import AppHeader from './cmps/AppHeader.vue';
import UserMsg from './cmps/UserMsg.vue'

export default {
	
	created() {
		this.$store.dispatch({ type: "loadToys" })
	},

	components: { 
		AppHeader,
		UserMsg
	}
}
</script>
