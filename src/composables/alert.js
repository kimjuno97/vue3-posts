import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export default function useAlert() {
	const { alerts } = storeToRefs(useAlertStore());
	const { vAlert, vSusccess } = useAlertStore();
	return {
		alerts,
		vAlert,
		vSusccess,
	};
}
