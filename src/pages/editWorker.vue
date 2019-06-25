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
                                       v-model="workerInfo.name"/>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>工号</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <input type="text" class="form-control" style="width:20%;"
                                       v-model="workerInfo.id"/>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>密码</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <input type="text" class="form-control" style="width:20%;" placeholder="请输入至少7位，数字或英文"
                                       v-model="workerInfo.passwd"/>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>角色</span><span style="color:#FF0000;">*</span><span>：</span>
                                </p>
                                <select class="form-control" style="width:20%;" v-model="workerInfo.role">
                                    <option value="unknown" selected>请选择</option>
                                    <option value="1">管理员</option>
                                    <option value="0">普通用户</option>
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
                                       v-model="workerInfo.phone"/>
                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>头像：</span></p>
<!--                                <Upload :before-upload="handleUpload" :action="doUpload">-->
<!--                                    <button type="button" class="btn btn-info"><i class="fa fa-plus-square"></i>上传头像</button>-->

                                <uploadPicture></uploadPicture>

                            </div>
                            <div style="display:inline-flex;margin-top: 1%;text-align:center">
                                <p style="width:8%;margin-top:0.7%"><span>简介：</span></p>
                                <textarea class="form-control" style="width:50%;height:180px"
                                          v-model="workerInfo.email"></textarea>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top:5%;text-align:center">
                            <button type="button" class="btn btn-success" @click="saveInfo()" style="margin-right:10%"><i
                                class="fa fa-check-circle" style="margin-right: 4px;"></i>保存
                            </button>

                            <button type="button" class="btn btn-danger" @click="cancelChange()"><i class="fa fa-times-circle"
                                                                            style="margin-right: 4px;"
                                                                            ></i>取消
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/navbar.vue'
import uploadPicture from './uploadPicture'

export default {
  components: {
    NavBar,
    uploadPicture
  },
  name: 'editWorkers',
  data () {
    return {

      editType: 0, // 0表新建，1表编辑员工
      file: null,
      loadingStatus: false,
      filename: '',
      workerInfo: {
        name: '',
        id: '',
        passwd: '',
        role: 'unknown',
        phone: '',
        email: '',
        createTime: ''
      }
    }
  },
  created () {
    this.getWorkerData()
  },
  methods: {
    getWorkerData () {
      let number = this.$route.query.id
      if (number == null) {
        this.editType = 0
      } else {
        this.editType = 1
        this.$http.get(this.$baseUrl + '/user/getDetail', {params: {id: this.$route.query.id}}).then(function (res) {
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
    refresh () {
      this.$emit('refresh')
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
      this.$http.post(this.$baseUrl + '/user/updateUser',
        {
          id: this.workerInfo.id,
          name: this.workerInfo.name,
          passwd: this.workerInfo.passwd,
          role: this.workerInfo.role,
          phone: this.workerInfo.phone,
          email: this.workerInfo.email
        })
        .then((response) => {
          if (response.body.code === 1) {
            this.$Message.success(response.body.msg)
            setTimeout(() => {
              this.$router.push('/allWorkers')
            }, 1000)
          } else {
            this.$Message.error(response.body.msg)
          }
        }).catch(response => {
          console.log(response)
        })
    },
    cancelChange () {
      this.$router.go(-1)
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
