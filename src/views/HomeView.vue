<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push({ name: 'About' });
};

const person = inject('person');
console.log('person.name', person.name);
</script>

<template>
	<h2>Home View</h2>
	<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
	<hr class="my-4" />
	<h2>{{ $person.name }}</h2>
	<button class="btn btn-primary" @click="person.say">Click Person</button>
</template>

<script>
export default {
	created() {
		console.log('??', this.$person);
	},
};
</script>

<style lang="scss" scoped></style>
