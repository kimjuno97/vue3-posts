<template>
	<h2>게시글 등록</h2>
	<br class="my-4" />
	<AppError v-if="error" :message="error.message" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent="save"
	>
		<template #actions>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-dark me-2"
					@click="goListPage"
				>
					목록
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 저장 </template>
				</button>
			</div>
		</template>
	</PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import useAlert from '@/composables/alert';
import useAxios from '@/hooks/useAxios';

const { vAlert, vSusccess } = useAlert();

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

const { error, loading, excute } = useAxios(
	'/posts',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' }, vSusccess('등록이 완료되었습니다'));
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const save = async () => {
	excute({ ...form.value, createdAt: Date.now() });
};

const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
