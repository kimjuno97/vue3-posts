<template>
	<h2>게시글 목록</h2>
	<br class="my-4" />
	<div class="row g-3">
		<div v-for="post in posts" :key="post.id" class="col-4">
			<PostItem
				:title="post.title"
				:content="post.content"
				:created-at="post.createdAt"
				@click="goPage(post.id)"
			></PostItem>
		</div>
	</div>
	<br class="my-4" />
	<AppCard>
		<PostDetailViewVue :id="1"></PostDetailViewVue>
	</AppCard>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailViewVue from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const fetchposts = async () => {
	try {
		posts.value = await getPosts();
	} catch (err) {
		console.error('데이터 fetch error :', err);
	}
};
fetchposts();

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
</script>

<style lang="scss" scoped></style>
