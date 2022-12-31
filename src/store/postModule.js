import axios from 'axios';

export const postModule = {
    state: () => ({
        posts: [],
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
    }),

    getters: {
        sortedPosts(state) {
            const { posts, selectedSort } = state;
            return [...posts].sort((a, b) => a[selectedSort]?.localeCompare(b[selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            const query = state.searchQuery.toLowerCase();
            return getters.sortedPosts.filter(p => p.title.toLowerCase().includes(query) || p.body.toLowerCase().includes(query))
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setIsPostsLoading(state, loading) {
            state.isPostsLoading = loading
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPage(state, totalPages) {
            state.totalPages = totalPages
        }
    },

    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setIsPostsLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                    }
                });
                commit('setPosts', response.data)
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
                commit('setTotalPage', totalPages)
            } catch(e) {
                alert('Ошибка');
            } finally {
                commit('setIsPostsLoading', false)
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                    }
                });
                commit('setPosts', [...state.posts, ...response.data])
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
                commit('setTotalPage', totalPages)
            } catch(e) {
                alert('Ошибка');
            }
        }
    },
    namespaced: true,
}