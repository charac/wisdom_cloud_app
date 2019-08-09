<template>
<!-- 智慧投顾 -->
  <div class="home">
    <div class="attend-to"></div>
    <van-row>
      <van-col :span ="24">
        <div class="form-title font36">企业扶持政策</div>
        <van-cell-group :border="false">
            <!-- @change="componeySearch(form.name)" -->

          <van-field
            v-model.trim="form.name"
            required
            data-vv-validate-on="blur"
            v-validate="{required: !form.name}"  
            ref="inputUser"
            clearable
            autocomplete="off"
            name="name"
            :error-message="errors.first('name')" 
            :error="errors.has('name')"
            placeholder="请输入公司名称"
          />
          <van-field
            v-model.trim="form.phone"
            data-vv-validate-on="input"
            v-validate="{mobile:/^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/}"  
            autocomplete="off"
            name="phone" 
            clearable
            :error-message="errors.first('phone')" 
            :error="errors.has('phone')"
            placeholder="请输入手机号码"
          />
        </van-cell-group>
        <van-button type="default" @click="queryCompany">智能查询</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { 
  queryEntList,  // 模糊搜索公司列表
} from '@/api/'
import { debounceFunction } from '@config/utils';  
export default {
  name: "home",
  data() {
    return {
      form: {
        name: '',
        phone: '',
      }
    }
  },
  mounted() {
    // this.$refs.inputUser.focus();
    if(this.$store.state.curConditions) {
      this.form.name = this.$store.state.curConditions.name || '';
      this.form.phome = this.$store.state.curConditions.pnoe || '';
    }
  },
  components: {
  },
  methods: {
    componeySearch(val) {
      console.log(val)
      val && this.searchResult({vm: this,val});
    },
    // // 按服务名字搜索服务
    // searchResult: debounceFunction(({vm,val}) => {
    //     queryEntList({ keyword: val }).then(d => {
    //         console.log('搜索结果',d);
    //         if(d.data.length > 0) {
    //           vm.$store.dispatch('set_search_list', d.data);
    //           vm.$router.push('selectCompony')
    //         }
    //         return true;
    //     },(err) =>{

    //     })
    // },1500),
    // 查询行业及产业
    queryCompany() {
       this.$validator.validateAll().then(valid => {
         if(valid) {
            let obj = Object.assign({},this.form);
            obj.phone = obj.phone || ' ';
            this.$store.dispatch('set_cur_term', obj);
            this.$router.push('selectCompony')
         }
       })
    },
  }
};
</script>
<style lang="less">
  /* 投顾 */ 
  .home {
    color: @colorMain;
    height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
    /* 图片 */ 
    .attend-to {
      width: 100%;
      height: 180px;
      background: url('../../assets/images/group1.png') center / 100% 100%;
      border-bottom: 10px solid #efefef;
    }
    /* 标题 */
    .form-title {
      position: relative; 
      padding: 15px 7px;
      color: #000;
      margin-bottom: 57px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
        z-index: 10;
        width: 2px;
        height: 20px;
        background: linear-gradient(180deg,rgba(87,169,237,1) 0%,rgba(17,94,209,1) 100%);
      }
    } 
    .van-field__control {
      font-size:  18px;
    }
    .van-row {
      padding: 0 15px;
    }
    .van-cell {
      color:@textColor;
      padding: 0;
      .van-field__control {
        padding: 11px 48px 11px 25px;
        border-bottom: .5px solid rgba(213,213,213,1);
      }
    }
    .van-cell--required::before {
      left: 0.38667rem;
      top: 13px;
    }
    .van-field__error-message {
      padding: 2px 0  0 25px;
    }
    .van-cell:not(:last-child)::after {
      position: static;
    }
    .van-cell:last-child {
      margin-top: 37px;
      margin-bottom: 55px;
    }
    .van-button--default {
      width: 100%;
      .resetBtn();
    }
  }
</style>

