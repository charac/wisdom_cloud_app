<template>
<!-- 选择公司 -->
  <div class="select-compony">
    <div class="form-title font36">请选择所在公司</div>
		<div class="comopeny-list">
			<div class="list-info">
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
				>
					<van-cell
						v-for="(item,index) in componeyList"
						:key="index"
						@click="selectComponey(item)"
						:title="item"
						is-link
					/>
				</van-list>
			</div>
		</div>
    <van-button type="default" @click="queryCompany">无匹配，重新输入</van-button>
  </div>
</template>

<script>	
import { 
  queryEntList
} from '@/api/index' 
import { util } from '@config/utils' 
export default {
  name: "selectCompony",
  data() {
    return {
			loading: false,
			finished: true,
			componeyList: []
    }
  },
  mounted() {
		this.initPage(this.$store.state.curConditions.name)
  },	
  methods: {
		// 初始化数据
		initPage(val) {
			queryEntList({ keyword: val }).then(d => {
				if(d.data.length > 0) {
					this.componeyList = util.deepCopy(d.data);
				}
			})
		},
		// 选择当前公司
		selectComponey(cur) {
			this.$store.dispatch('set_componey', cur);
			this.$router.push('confirmIndustry')
		},
		// 查询公司
    queryCompany() {
      this.$router.push('home')
    },
  }
};
</script>
<style lang="less" scoped>
  /* 投顾 */ 
  .select-compony {
		color: @colorMain;
		padding: 0 15px;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
    /* 标题 */
    .form-title {
      position: relative; 
      padding: 15px 7px;
      color: #000;
      // margin-bottom: 5px;	
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
		/* 公司列表 */
		.comopeny-list {
			height: 100%;
			overflow: hidden;
			padding-top: 0.4rem;
			padding-bottom: 4rem;
			margin-top: -0.4rem;
			margin-bottom: -4rem;
			.list-info {
				height: 100%;
				overflow-x: hidden;
				overflow-y: auto;
				.van-cell {
					// padding-left: 0;
					.van-cell__title {
						font-size: @fontSize30;
						span {
							display: inline-block;
							width: calc(100% - 20px);
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
					/deep/.van-cell:not(:last-child)::after {
							border-bottom: 0.02667rem solid #d5d5d5;
					}
				}
			}
		}
		.van-button--default {
			width: 100%;
			margin-top: 20px;
			.resetBtn(#1D6BD6,#fff);
		}
  }
</style>

