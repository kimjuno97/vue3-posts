<template>
	<h2>About View</h2>
	<p>{{ $route.name }}</p>
	<button class="btn btn-primary" @click="$router.push('/')">
		Home으로 이동
	</button>
	<h2>Store</h2>
	<p>counter: {{ store.counter }}</p>
	<p>구조분해할당한 counter: {{ counter }}</p>
	<p>doubleCount: {{ store.dubleCount }}</p>
	<p>구조분해할당한 doubleCount: {{ dubleCount }}</p>
	<p>doubleCountPluseOne: {{ store.dobleCountPlusOne }}</p>
	<p>구조분해할당한 doubleCountPluseOne: {{ dobleCountPlusOne }}</p>
	<button @click="increment()">click</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path : ', route.path);

const store = useCounterStore();

// 반응성 유지방법
const { counter, dobleCountPlusOne, dubleCount } = storeToRefs(store);
// 함수이기 때문에 그냥 빼와도 됨
const { increment } = store;

// 이렇게 사용 가능
increment();
increment();
</script>

<style lang="scss" scoped></style>
