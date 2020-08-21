<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data="tabbarData" />
    </div>
</template>
<script>
    import TabBar from "../components/TabBar";
    import { lesson, login, title, create } from "@/api/login";
    import axios from 'axios'
    import Cookies from "js-cookie";
    export default {
        name: "index",
        data() {
            return {
                tabbarData: [
                    { title: "语文听写", icon: "file-o", path: "/chinese" },
                    { title: "英语听写", icon: "file-o", path: "/english" },
                    { title: "设置", icon: "cog", path: "/home" }
                ],
                Chinese:[],
                English:[]
            };
        },
        components: { TabBar },
        mounted() {
            // this.getLesson()
        },
        methods: {
            getLesson() {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;

                lesson().then(res => {
                    // console.log(res)
                    this.Chinese = res.result.subjectDtos[0]
                    this.English = res.result.subjectDtos[1]
                    console.log(this.Chinese)
                    console.log(this.English)
                })
            },
        },
    };
</script>
<style scoped>
    .index {
        width: 100%;
        height: 100%;
        background-image: url(../assets/images/2.jpg);
    }
</style>