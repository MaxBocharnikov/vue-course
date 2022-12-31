<template>
  <div>
    <h1>Страница с постами</h1>
    <styled-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
    />
    <div class="app-buttons">
      <styled-button
          @click="showDialog = true"
      >
        Добавить пост
      </styled-button>
      <styled-select v-model="selectedSort" :options="sortOptions" />
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
import {ref} from 'vue'
import { usePosts } from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchPosts from '@/hooks/useSortedAndSearchPosts';

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
      showDialog: false,
      sortOptions: [
        {name: 'По названию', value: 'title'},
        {name: 'По описанию', value: 'body'},
      ],
    }
  },
  setup(props) {
    const { posts, totalPages, isPostLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts
    }
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

