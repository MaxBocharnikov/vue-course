import { createApp } from 'vue'
import App from './App';
import components from '@/components/UI';
import router from "@/router/router";
import directives from '@/directives';
import store from '@/store';

const app = createApp(App);
components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(d => {
    app.directive(d.name, d)
})

app
    .use(router)
    .use(store)
    .mount('#app')
