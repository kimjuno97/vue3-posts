<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<template v-else>
		<h2>게시글 수정</h2>
		<br class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<div class="pt-4">
					<button
						type="button"
						class="btn btn-outline-danger me-2"
						@click="goDetailPage"
					>
						취소
					</button>
					<button class="btn btn-primary" :disabled="editLoading">
						<template v-if="editLoading">
							<span
								class="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Loading...</span>
						</template>
						<template v-else> 수정 </template>
					</button>
				</div>
			</template>
		</PostForm>
	</template>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import useAlert from '@/composables/alert.js';
import useAxios from '@/hooks/useAxios';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
// alert
const { vAlert, vSusccess } = useAlert();

const { data: form, error, loading } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	excute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			vSusccess('수정이 완료되었습니다!');
			router.push({ name: 'PostDetail', params: { id } });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = () => {
	excute({
		...form.value,
	});
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style lang="scss" scoped></style>
