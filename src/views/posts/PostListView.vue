<template>
	<h2>게시글 목록</h2>
	<hr class="my-4" />
	<PostFilter
		v-model:title="params.title_like"
		:limt="params._limit"
		@update:limit="changeLimit"
	/>
	<br class="my-4" />

	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />

	<template v-else-if="!isExist">
		<p class="text-center py-5 text-muted">No Results</p>
	</template>
	<template v-else>
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
					@modal="openModal(post)"
					@preview="selectPreview(post.id)"
				></PostItem>
			</div>
		</div>
		<AppPageNation
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
	</template>
	<Teleport to="#modal">
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:created-at="modalCreatedAt"
		/>
	</Teleport>
	<template v-if="previewId">
		<hr class="my-4 mt-5" />
		<AppCard>
			<PostDetailView :id="previewId"></PostDetailView>
		</AppCard>
	</template>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useAxios from '@/hooks/useAxios';

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);
const changeLimit = value => {
	params.value._limit = value;
	params.value._page = 1;
};

const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);
const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });
const isExist = computed(() => posts.value && posts.value.length > 0);

const totalCount = computed(() => response.value.headers['x-total-count']);

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
