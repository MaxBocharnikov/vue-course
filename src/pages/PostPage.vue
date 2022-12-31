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
    <!--    <post-pages-->
    <!--        :totalPages="totalPages"-->
    <!--        :currentPage="page"-->
    <!--        @changePage="changePage"-->
    <!--    />-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>
<script>
import axios from 'axios';
import PostList from '@/components/PostList';
import PostForm from '@/components/PostForm';
import StyledButton from '@/components/UI/StyledButton';
import StyledSelect from '@/components/UI/StyledSelector';
import StyledInput from '@/components/UI/StyledInput';
import PostPages from '@/components/PostPages';

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
      posts: [],
      showDialog: false,
      isPostsLoading: false,
      searchQuery: '',
      selectedSort: '',
      sortOptions: [
        {name: 'По названию', value: 'title'},
        {name: 'По описанию', value: 'body'},
      ],
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post)
      this.showDialog = false;
    },

    deletePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },

    // changePage(page) {
    //   this.page = page;
    // },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        });
        this.posts = response.data;
        const totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.totalPages = totalPages;
      } catch(e) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        });
        this.posts = [...this.posts, ...response.data]
        const totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.totalPages = totalPages;
      } catch(e) {
        alert('Ошибка');
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      const query = this.searchQuery.toLowerCase();
      return [...this.sortedPosts].filter(p => p.title.toLowerCase().includes(query) || p.body.toLowerCase().includes(query))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
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

