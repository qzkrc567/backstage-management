<template>
    <div>
        <NavBar></NavBar>
        <div class="content">
            <h2>{{editType===1?'编辑':'新建'}}员工</h2>
            <ContentBox icon="ios-menu" name="请填写员工信息">
                <div class="info-block">
                    <p class="title">账号信息：</p>
                    <div class="info-content">
                        <div class="info-item">
                            <span class="info-name required">工号</span>:
                            <input type="text"  class="form-control info-input" v-model="workerInfo.id"/>
                        </div>
                        <div class="info-item">
                            <span class="info-name required">员工姓名</span>:
                            <input type="text"  class="form-control info-input" v-model="workerInfo.name"/>
                        </div>
                        <div class="info-item">
                            <span class="info-name required">密码</span>:
                            <input type="text"  class="form-control info-input" placeholder="请输入至少7位，数字或英文" v-model="workerInfo.passwd"/>
                        </div>
                        <div class="info-item">
                            <span class="info-name required">角色</span>:
                            <select class="form-control info-input" v-model="workerInfo.role">
                                <option value="unknown" selected>请选择</option>
                                <option value="1">管理员</option>
                                <option value="0">普通用户</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="info-block">
                    <p class="title">其他信息：</p>
                    <div class="info-content">
                        <div class="info-item">
                            <span class="info-name">手机号码</span>:
                            <input type="text"  class="form-control info-input" v-model="workerInfo.phone"/>
                        </div>
                        <div class="info-item">
                            <span class="info-name">头像</span>:
                            <uploadPicture class="info-input"></uploadPicture>
                        </div>
                        <div class="info-item">
                            <span class="info-name">邮箱</span>:
                            <input type="text"  class="form-control info-input" v-model="workerInfo.email"/>
                        </div>
                        <div class="info-item">
                            <span class="info-name">创建时间</span>:
                            <input type="text"  class="form-control info-input" v-model="workerInfo.createTime"/>
                        </div>
                    </div>
                </div>
                <div style="margin-top:25px;text-align:center">
                    <Button icon="ios-checkmark-circle" type="success" size="large" @click="saveInfo()">保存</Button>
                    <Button icon="ios-close-circle" type="error" size="large" style="margin-left: 50px" @click="cancelChange()">取消</Button>
                </div>
            </ContentBox>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import uploadPicture from '../components/UploadPicture'
import ContentBox from '../components/ContentBox'

export default {
  components: {
    ContentBox,
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
    .info-block{
        width: 100%;
        border-top: 1px solid #eee;
        margin-bottom: 20px;
    }
    .info-block .title{
        border-left: 2px solid purple;
        padding-left: 20px;
        margin: 15px 0;
    }
    .info-item{
        padding: 15px 0;
        width: 100%;
    }
    .info-name{
        display: inline-block;
        width: 150px;
        text-align: right;
    }
    .info-name.required:after{
        content: '*';
        color: red;
    }
    .info-input{
        width: 300px;
        display: inline-block;
        margin-left: 20px;
    }
</style>
