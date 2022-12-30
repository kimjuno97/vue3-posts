<script setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push({ name: 'About' });
};

const person = inject('person');
console.log('person.name', person.name);

const position = reactive({
	x: 100,
	y: 1000,
});
</script>

<template>
	<h2>Home View</h2>
	<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
	<hr class="my-4" />
	<h2>{{ $person.name }}</h2>
	<button class="btn btn-primary" @click="person.say">Click Person</button>
	<br />
	<h2>{{ position }}</h2>
</template>

<script>
export default {
	created() {
		console.log('??', this.$person);
	},
};
</script>

<style lang="scss" scoped></style>
