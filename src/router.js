import { createRouter,createWebHistory } from "vue-router";




const router=createRouter({
history:createWebHistory(),
    routes:[
        {path:'/',component:()=>import ("./components/User/LandingPage.vue")},
        {path:'/login',component:()=>import ("./components/User/UserLogin.vue")},
        {path:'/sendotp',component:()=>import ("./components/User/OtP.vue")},
        {path:'/profile',component:()=>import("./components/User/UserDetails.vue")},
        {path:'/registrationpage',component:()=>import("./components/User/ProfilePage.vue")},
        {path:'/HomePage',component:()=>import("./components/User/HomePage.vue")},
        {path:'/adminlogin',component:()=>import("./components/Admin/LoginPage.vue")},
        {path:'/admindashboard',component:()=>import("./components/Admin/HomePage.vue")},



    ],


});
export default router;
