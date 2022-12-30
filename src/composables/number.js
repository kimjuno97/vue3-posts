import { computed, unref } from 'vue';

export default function useNumber(number) {
	const isOdd = computed(() => unref(number) % 2 === 1);
	const isEven = computed(() => !isOdd.value);

	return {
		isOdd,
		isEven,
	};
}
