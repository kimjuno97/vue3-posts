import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		dubleCount: state => state.counter * 2,
		dobleCountPlusOne() {
			return this.dubleCount + 1;
		},
	},
	actions: {
		increment() {
			this.counter++;
		},
	},
});
