import Main from '@/pages/Main';
import { createRouter, createWebHistory } from 'vue-router';
import PostPage from '@/pages/PostPage';
import AboutPage from '@/pages/AboutPage';
import PostIdPage from '@/pages/PostIdPage';
import PostPageWithStore from '@/pages/PostPageWithStore';
import PostPageWithComposition from '@/pages/PostPageWithComposition';


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageWithComposition
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
    {
        path: '/about',
        component: AboutPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router;