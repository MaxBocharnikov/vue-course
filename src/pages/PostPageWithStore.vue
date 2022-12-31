<template>
  <div>
    <h1>Страница с постами</h1>
    <styled-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />
    <div class="app-buttons">
      <styled-button
          @click="showDialog = true"
      >
        Добавить пост
      </styled-button>
      <styled-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <styled-dialog
        v-model:show="showDialog"
    >
      <post-form
          @create="createPost"
      />
    </styled-dialog>
    <post-list
        v-if="!isPostsLoading"
        :posts="sortedAndSearchedPosts"
        @delete="deletePost"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import StyledButton from '@/components/UI/StyledButton';
import StyledSelect from '@/components/UI/StyledSelector';
import StyledInput from '@/components/UI/StyledInput';
import PostPages from '@/components/PostPages';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    PostPages,
    StyledInput,
    StyledSelect,
    StyledButton,
    PostList, PostForm
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post)
      this.showDialog = false;
    },

    deletePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      searchQuery: state => state.post.searchQuery,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),

    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  mounted() {
    this.fetchPosts();
  }

}
</script>

<style scoped>
  .app-buttons {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
</style>

