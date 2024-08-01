import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
    {
        path: "/",
        component: () => import('../modules/autores/pages/AutorPage') 
    },
    {
        path: "/libro",
        component: () => import('../modules/libros/pages/LibroPage') 
    },
    {
        path: "/:pathMatch(.*)*",
        //component: NoEncontradaPage
        component: () => import('../modules/NoEncontradoPage')
    }

]

const router=createRouter({
    history: createWebHashHistory(),
    routes
})

export default router