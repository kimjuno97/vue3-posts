import { ref } from 'vue';

const alerts = ref([]);

export default function useAlert() {
	const vAlert = (message, type) => {
		alerts.value.push({ message, type });

		setTimeout(() => {
			alerts.value.shift();
		}, 2000);
	};
	const vSusccess = message => vAlert(message, 'success');
	return {
		alerts,
		vAlert,
		vSusccess,
	};
}
