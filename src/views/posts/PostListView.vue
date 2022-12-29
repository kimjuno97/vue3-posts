<template>
	<h2>게시글 목록</h2>
	<hr class="my-4" />
	<PostFilter v-model:title="params.title_like" v-model:limt="params._limit" />
	<br class="my-4" />
	<div class="row g-3">
		<div v-for="post in posts" :key="post.id" class="col-4">
			<PostItem
				:title="post.title"
				:content="post.content"
				:created-at="post.createdAt"
				@click="goPage(post.id)"
				@modal="openModal(post)"
			></PostItem>
		</div>
	</div>
	<AppPageNationV
		:current-page="params._page"
		:page-count="pageCount"
		@page="page => (params._page = page)"
	/>
	<Teleport to="#modal">
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:created-at="modalCreatedAt"
		/>
	</Teleport>

	<br class="my-4 mt-5" />
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';

import { computed, ref, watchEffect } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

import AppPageNationV from '@/components/AppPageNation.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: '3',
	title_like: '',
});
const router = useRouter();
const posts = ref([]);
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchposts = async () => {
	try {
		const [data, headers] = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (err) {
		console.error('데이터 fetch error :', err);
	}
};
watchEffect(fetchposts);
const goPage = id => {
	// router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: { id },
		// 이렇게 넣을 수 있음
		// query: {
		// 	searchText: 'hello',
		// },
		// hash: 'word',
	});
};
//modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
