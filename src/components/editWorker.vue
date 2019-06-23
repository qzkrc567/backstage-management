<template>
    <div>
        <NavBar></NavBar>
        <div style="position: absolute;left: 270px;right: 0;bottom: 0;top: 81px">
            <div v-show="editType===0">
                <h2 style="margin: 1% 0 0 1%">新建员工</h2>
            </div>
            <div v-show="editType===1">
                <h2 style="margin: 1% 0 0 1%">编辑员工</h2>
            </div>
            <div style="margin-left:30px;margin-top:20px;margin-right:20px" class="panel panel-headline">
                <div class="panel-heading">
                    <p class="panel-subtitle">请填写员工信息</p>
                </div>
                <div class="panel-body">
                    <div>
                        <p style="font-weight: 700;font-size:18px">账号信息：</p>
                        <div style="display:grid;margin-left:3%">
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>员工姓名</span><span
                                    style="color:#FF0000;">*</span><span>：</span></p>
                                <input type="text" class="form-control" style="width:20%;"
                                       v-model="workerInfo.name"></input>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>工号</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <input type="text" class="form-control" style="width:20%;"
                                       v-model="workerInfo.number"></input>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>密码</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <input type="text" class="form-control" style="width:20%;" placeholder="请输入至少7位，数字或英文"
                                       v-model="workerInfo.password"></input>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>角色</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <select class="form-control" style="width:20%;" v-model="workerInfo.type">
                                    <option value="unknown" selected>请选择</option>
                                    <option value="admin">管理员</option>
                                    <option value="normal">普通用户</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:5%">
                        <p style="font-weight: 700;font-size:18px">其他信息：</p>
                        <div style="display:grid;margin-left:3%">
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>手机号码：</span></p>
                                <input type="text" class="form-control" style="width:20%;"
                                       v-model="workerInfo.telephone"></input>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>头像：</span></p>
                                <Upload :before-upload="handleUpload" :action="doUpload">
                                    <button type="button" class="btn btn-info"><i class="fa fa-plus-square"></i>上传头像</button>
                                </Upload>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>简介：</span></p>
                                <textarea class="form-control" style="width:50%;height:180px"
                                          v-model="workerInfo.aboutInfo"></textarea>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:5%;text-align:center">
                        <router-link :to="{path:'/allWorkers'}" @click.native="refresh">
                            <button type="button" class="btn btn-success" style="margin-right:10%"><i
                                class="fa fa-check-circle" style="margin-right: 4px;" @click="saveInfo"></i>保存
                            </button>

                            <button type="button" class="btn btn-danger"><i class="fa fa-times-circle"
                                                                            style="margin-right: 4px;"
                                                                            @click="cancelChange"></i>取消
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from './navbar.vue'

    export default {
        components: {
            NavBar
        },
        name: 'editWorkers',
        data () {
            return {
                doUpload:'/somewhere',
                editType: 0,//0表新建，1表编辑员工
                file: null,
                loadingStatus: false,
                filename: '',
                workerInfo: {
                    name: '',
                    number: '',
                    password: '',
                    type: 'unknown',
                    telephone: '',
                    aboutInfo: ''
                }
            }
        },
        created () {
            this.getWorkerData()
        },
        methods: {
            getWorkerData () {
                let number = this.$route.query.number
                if (number == null) {
                    this.editType = 0
                    return
                } else {
                    this.editType = 1
                    this.$http.get('https://www.easy-mock.com/mock/5d0e50885f349b4d9c702f46/index/getWorkerDetail', {params: {worker_number: this.$route.query.number}}).then(function (res) {
                        console.log(res)
                        this.workerInfo = res.body.data
                    }, function (res) {
                        console.log(res)
                    })
                }
            },
            handleUpload (file) {
                this.file = file
                this.filename = file.name
            },
            refresh(){
                this.$emit('refresh');
            },
            upload () {
                if (this.file != null) {
                    this.loadingStatus = true
                    this.file = null
                    this.filename = ''
                    this.loadingStatus = false
                    this.$Message.success('Success')
                }
            },
            saveInfo () {
                console.log(this.workerInfo)
            },
            cancelChange () {
                console.log("cancel")
            }
        }
    }
</script>

<style scoped>
    .panel-subtitle {
        margin-bottom: 0;
        font-size: 16px;
        color: #8D99A8;
    }
</style>
