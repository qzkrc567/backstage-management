<template>
    <div>
        <Navbar></Navbar>
        <div class="content">
                <h2>规则导入</h2>
            <ContentBox icon="ios-apps" name="规则导入">
                <Button @click="importModal=true" class="btn-purple" size="large" >
                    <Icon class="ivu-icon-ios-funnel"></Icon>
                    导入规则文件
                </Button>
            </ContentBox>
            <ContentBox icon="ios-menu" name="物流运费规则">
                <Table :columns="format" :data="data1"></Table>
                <div style="margin-top: 10px;height: 35px">
                    <Page show-elevator style="float: right" :total="dataAmount" :page-size="8" :current="currentPage" @on-change="changePage"></Page>
                </div>
            </ContentBox>

            <Modal
                title="规则导入"
                v-model="importModal"
                :mask-closable="false"
                class="vertical-center-modal">
                <div class="modal-inline">
                    <label>
                        <Input placeholder="选择文件..." v-model="filename" clearable size="large" class="modal-input"/>
                    </label>
                    <label>
                        <Upload action="https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/upload" :before-upload="handleUpload">
                            <Button class="btn-purple" size="large">
                                <Icon class="ivu-icon-ios-funnel"></Icon>
                                选择文件
                            </Button>
                        </Upload>
                    </label>
                </div>
                <div slot="footer">
                    <Button class="btn-confirm" @click="upload" :loading="loadingStatus">确认</Button>
                    <Button class="btn-cancel" @click="cancel">取消</Button>
                </div>
            </Modal>

        </div>
    </div>

</template>

<script>

import Navbar from '../components/NavBar'
import ContentBox from '../components/ContentBox'
export default {
  name: 'ruleImport',
  components: {ContentBox, Navbar},
  data () {
    return {
      format: [
        {
          type: 'index',
          indexMethod: row => {
            return (row._index + 8 * (this.currentPage - 1) + 1)
          },

          width: 100,
          align: 'center'
        },
        // {
        //     title:"城市",
        //     key:"city"
        // },
        // {
        //     title:"在途天数",
        //     key:"days"
        // },
        // {
        //     title:"轻货/公斤",
        //     key:"priceLight"
        // },
        // {
        //     title:"重货/公斤",
        //     key:"priceHeavy"
        // },
        // {
        //     title:"最低收费",
        //     key:"lowestPrice"
        // }
        {
          title: '物流公司名称',
          key: 'companyName'
        },
        {
          title: '折扣规则',
          key: 'discount'
        }
      ],
      allData: [],
      data1: [],
      importModal: false,
      file: null,
      loadingStatus: false,
      filename: '',
      currentPage: 1
    }
  },
  mounted () {

  },
  methods: {
    cancel: function () {
      this.importModal = false
    },
    handleUpload (file) {
      this.file = file
      this.filename = file.name
      return false
    },
    importrule () {
      this.$http.get('https://www.easy-mock.com/mock/5d063c2b19efbf55ebd39b4f/logistics/rule/list')
        .then((response) => {
          console.log(response)
          this.allData = response.body.data
          this.dataAmount = this.allData.length
          for (let i = 0; i < 8; i++) {
            this.data1.push(this.allData[i])
          }
        }).catch(function (response) {
          console.log(response)
        })
    },
    upload () {
      if (this.file != null) {
        this.loadingStatus = true
        this.file = null
        this.filename = ''
        this.loadingStatus = false
        this.$Message.success('Success')
        this.importrule()
      }
      this.importModal = false
    },
    changePage (index) {
      this.currentPage = index
      this.data1 = this.allData.slice((index - 1) * 8, index * 8)
    }
  }
}
</script>

<style scoped>
    .block-main{
        position: absolute;
        left: 270px;
        bottom: 0;
        right: 0;
        top: 81px

    }

    .btn-purple{
        background-color: #9137F3;
        color: #FFFFFF;
        font-size: small;
        padding: 8px 15px 8px 15px;
        margin-right: 10px;
    }
    .btn-confirm{
        margin-right: 20px;
        background-color: #9137F3;
        color: #FFFFFF;
    }
    .btn-cancel{
        background-color: #8D99A8;
        color: #FFFFFF;
        margin-left: 20px;
    }

    .title{
        margin-left: 50px;
    }
    .block{
        background-color: white;
        margin: 10px 0 0 50px;
        padding: 10px;
    }
    .block-title{
        color: #8D99A8;
        padding: 20px;
    }
    .block-body{
        padding: 10px;
    }

    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-input{
        width: 350px;
        margin-right: 0;
        font-weight: normal;
    }
    .modal-inline{
        padding: 10px 10px 20px 10px;
    }

</style>
