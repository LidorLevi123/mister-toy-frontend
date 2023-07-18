<template>
	<AppHeader />
	<RouterView />
</template>

<script>
import AppHeader from './cmps/AppHeader.vue';

export default {
	
	created() {
		this.$store.dispatch({ type: "loadToys" })
	},

	components: { 
		AppHeader 
	}
}
</script>
