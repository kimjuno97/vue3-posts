<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<template v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ props.id }}, isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}1
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					@click="remove"
					class="btn btn-outline-danger"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 삭제 </template>
				</button>
			</div>
		</div>
	</template>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAxios from '@/hooks/useAxios';
import useAlert from '@/composables/alert';
import { computed, toRefs } from 'vue';
import useNumber from '@/composables/number';

const props = defineProps({
	id: [String, Number],
});

const router = useRouter();
// const idRef = toRef(props, 'id'); => 아래랑 같음
const { id } = toRefs(props);

const { isOdd } = useNumber(id);
/**
 * ref
 * 장점) 스프레드 연산을 통한 객체활당 가능, 일관성
 * 단점) form.value.title, form.value.content
 *
 * reactive
 * 장점) form.title, form.content
 * 단점) 객체활당 불가능
 */
const url = computed(() => `/posts/${props.id}`);
const { error, loading, data: post } = useAxios(url);
const { vAlert, vSusccess } = useAlert();

const {
	error: removeError,
	loading: removeLoading,
	excute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSusccess('삭제가 완료되었습니다.');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = () => {
	if (!confirm('삭제 하시겠습니까?')) {
		return;
	}
	excute();
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
