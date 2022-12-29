<template>
	<h2>게시글 수정</h2>
	<br class="my-4" />
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
				<button class="btn btn-primary">수정</button>
			</div>
		</template>
	</PostForm>
	<AppAlert :items="alerts" />
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { updatePost } from '@/api/posts';

import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/AppAlert.vue';

const {
	params: { id },
} = useRoute();
const router = useRouter();

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

const form = ref({
	title: null,
	content: null,
});
const fetchPost = async () => {
	const data = await getPostById(id);
	setForm(data);
};
const setForm = ({ title, content, createdAt }) => {
	form.value = { title, content, createdAt };
};
fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		vAlert('수정이 완료되었습니다.', 'success');
	} catch (err) {
		console.error('업데이트 에러 :', err);
		vAlert(err.message);
	}
};

//alert
const alerts = ref([]);
const vAlert = (message, type) => {
	alerts.value.push({ message, type });

	setTimeout(() => {
		alerts.value.shift();
	}, 2000);
};
</script>

<style lang="scss" scoped></style>
