<template>
	<div class="vue-query">
		<div v-if="isLoading">
			<p>Loading...</p>
		</div>
		<div v-else-if="data">
			<p>title: {{ data.title }}</p>
			<p>description: {{ data.description }}</p>
		</div>
	</div>
</template>
<script setup lang="ts" name="vue-query">
	import { ref } from 'vue';
	import { useQuery } from 'vue-query';

	const productId = ref(1);
	async function fetchProduct() {
		return await fetch(
			`https://dummyjson.com/products/${productId.value}`
		).then((res) => res.json());
	}

	const {isLoading, data} = useQuery(
		// ['product', productId.value],
		'product',
		fetchProduct,
	);
</script>

<style scoped lang="scss">
	@import url('./index.scss');
</style>


	