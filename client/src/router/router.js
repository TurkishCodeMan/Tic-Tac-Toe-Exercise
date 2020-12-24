import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

import Login from "../components/Login"
import Home from "../components/Home"

const routes=[
    {path:"/",component:Login,name:"login"},
    {path:"/tic-tac",component:Home,name:"home"}
]

export const  router = new VueRouter({
    routes,
});

