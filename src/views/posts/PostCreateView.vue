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
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import useAlert from '@/composables/alert';

const { vAlert, vSusccess } = useAlert();

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

const loading = ref(false);
const error = ref(null);

const save = () => {
	try {
		loading.value = true;
		createPost({
			...form.value,
			createdAt: Date.now(),
		});
		router.push({ name: 'PostList' });
		vSusccess('등록이 완료되었습니다.');
	} catch (err) {
		vAlert(err.message);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
