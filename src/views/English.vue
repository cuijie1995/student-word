<template>
    <div class="page">
        <el-row>
            <el-col :span="6"> <span>听写数量：</span></el-col>
            <el-col :span="12">
                <van-field readonly clickable :value="value" @touchstart.native.stop="show = true" />
                <van-number-keyboard v-model="value" :show="show" :maxlength="10" @blur="show = false" />

            </el-col>
        </el-row>
        <div class="zheng">
            <div v-for="(tag,index) in title.examinationContents" :key="index" class="ci">
                <div v-if="index % 2 == 0">
                    <el-row>
                        <el-col :span="20">
                            <p>
                                {{tag.word}}
                            </p>
                        </el-col>
                        <el-col :span="4">
                            <el-switch v-model="tag.byTheWay" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="index % 2 !== 0" class="ou">
                    <el-row>
                        <el-col :span="20">
                            <p>
                                {{tag.word}}
                            </p>
                        </el-col>
                        <el-col :span="4">
                            <el-switch v-model="tag.byTheWay" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="footer">
                <el-button size="small" type="warning" @click="getError">错题重现</el-button>
                <el-button size="small" type="primary" @click="getTitle">出题</el-button>
                <span v-if="length > 0">
                    <el-button size="small" type="success" @click="submit">提交</el-button>
                </span>
            </div>
        </div>
    </div>
</template>
<script>

    import { title, error, create } from "@/api/login";
    import axios from 'axios'
    import Cookies from "js-cookie";
    export default {
        data() {
            return {
                value: "10",
                show: false,
                title: {},
                id: "",
                list: {
                    SubjectID: 2,
                    Qty: ""
                },
                length: 0
            }
        },
        methods: {
            getTitle() {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                this.list.Qty = this.value
                title(this.list).then(res => {
                    if (res.result.examinationContents == 0) {
                        this.$confirm('抱歉，这门课暂时无内容', '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        })
                    } else {
                        this.title = res.result;
                        this.length = this.title.examinationContents.length
                    }
                }).catch(err => {
                    alert("请输入听写数量")
                })
            },
            getError() {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                this.list.Qty = this.value

                error(this.list).then(res => {
                    if (res.result.examinationContents == 0) {
                        this.$confirm('恭喜你，暂无错题', '提示', {
                            confirmButtonText: '确定',
                            type: 'success'
                        })
                        this.title = [];
                        this.length = 0
                    } else {
                        this.title = res.result;
                        this.length = this.title.examinationContents.length
                    }
                })
            },
            submit() {
                let token = Cookies.get("Token");
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                create(this.title).then(res => {
                    const h = this.$createElement;
                    this.$msgbox({
                        title: '答题记录',
                        message: h('p', null, [
                            h('p', null, '总计答题正确率：' + res.result.historyAccuracyRate + '%'),
                            h('p', null, '总计答题数：' + res.result.historyAnswerQty),
                            h('p', null, '总计答题正确率：' + res.result.historyCorrectAnswerQty),
                            h('p', null, '总计答题错误率：' + res.result.historyWrongAnswerQty),
                            h('p', null, '本次答题正确率：' + res.result.thisAccuracyRate + '%'),
                            h('p', null, '本次答题数：' + res.result.thisAnswerQty),
                            h('p', null, '本次答题正确率：' + res.result.thisCorrectAnswerQty),
                            h('p', null, '本次答题错误率：' + res.result.thisWrongAnswerQty),

                        ]),
                        showCancelButton: true,
                        confirmButtonText: '确定',
                    })
                    this.title = [];
                })
            }
        }
    }
</script>
<style scoped>
    i {
        font-size: 15px;
    }

    .page {
        padding-top: 10vw;
        padding: 10vw 5% 0 5%;
        background-image: url(../assets/images/2.jpg);
        width: 100%;
        /* height: 200%; */
        font-size: 4vw;
    }

    .zheng {
        margin-top: 30px;
        overflow: hidden;
        /* margin-bottom: 55px; */
    }

    .zheng p {
        line-height: 6vw;
        height: 6vw;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
    }

    .footer {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30vw;

    }

    .footer .el-button {
        font-size: 4vw;
    }

    .el-switch {
        /* float: right; */
        /* width: 25%; */
        padding: 1vw 0;
        /* margin-top: 0.5vw; */
        height: 4vw;
        line-height: 4vw;
    }

    .el-col-6 {
        padding-top: 1%;
    }

    .el-select {
        width: 100%;
    }

    .ou {
        background: rgb(173, 247, 247);
        height: 100%;

    }

    .ci>div {
        border: 0.1vw solid gainsboro;
        padding: 4vw 0;
        height: 100%;
    }

    .ci {
        /* padding: 2vw 0; */
    }
</style>
<style>
    .el-input__inner {
        line-height: 30px;
        height: 30px;
    }

    .el-message-box {
        width: 100%;
    }
</style>