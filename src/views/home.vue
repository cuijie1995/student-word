<template>
    <div class="home">

        <div v-for="(subjectUnit,index) in subjectUnits" :key="index">
            <h3> {{subjectUnit.subjectName}}</h3>
            <ul>

                <li v-for="(item,i) in subjectUnit.courseUnits" :key="i">
                    <el-row v-if="i % 2 == 0">
                        <el-col :span="18"> {{item.unit}}</el-col>
                        <el-col :span="6">
                            <el-switch v-model="item.enablen" size="4.5vw" active-color="#07c160"
                                inactive-color="#ee0a24" @change="getEdit(item)" />
                        </el-col>

                    </el-row>
                    <el-row v-if="i % 2 !== 0" class="ou">
                        <el-col :span="18"> {{item.unit}}</el-col>
                        <el-col :span="6">
                            <el-switch v-model="item.enablen" size="4.5vw" active-color="#07c160"
                                inactive-color="#ee0a24" @change="getEdit(item)" />
                        </el-col>

                    </el-row>
                </li>

            </ul>
        </div>

    </div>
</template>
<script>
    import { get, update } from "@/api/login";
    import axios from 'axios'
    import Cookies from "js-cookie";
    export default {
        data: function () {
            return {
                subjectUnits: []
            }
        },
        components: {

        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                get().then(res => {
                    this.subjectUnits = res.result.subjectUnits
                })
            },
            getEdit(item) {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                update(item).then(res => {
                    console.log("111111")
                    item.enablen = !item.enablen;
                    this.getData()
                    // setTimeout(() => {
                    //     console.log("222222222")
                    //     this.getData()

                    // }, 0.01);



                })

            }
        },
    }

</script>
<style scoped>
    .home {
        width: 100%;
        height: 100%;
        padding-top: 10%;
        font-size: 4vw;
        margin-bottom: 14%;
    }

    h3 {
        text-align: center;
        padding: 5% 0;
    }


    .el-col-18,
    .el-col-6 {
        text-align: center;
    }

    .el-row {
        border: 0.1vw solid #d9d9d9;
        width: 90%;
        margin-left: 5%;
        padding: 2vw 0;
    }

    .ou {
        background: rgb(173, 247, 247);
    }
</style>