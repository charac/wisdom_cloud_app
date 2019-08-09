<template>
<!-- 确认行业匹配 -->
  <div class="confirm-industry">
		<div class="confirm-wrap">
			<div class="confirm-info">
				<div class="form-title font32">
					<div class="componey-title">
						<svg-icon icon-class="componey" class="title-svg" />
						<span class="title">{{$store.state.curComponey}}</span>
					</div>
				</div>
				<div class="details">
					<van-panel title="" desc="预测贵公司所属行业大类/行业中类为" class="confirm">
						<van-row>
							<van-col span="19" style="margin-right: 10px;"><span class="select-industry">{{curIndustry}}</span></van-col>
							<van-col span="2">
								<van-button round size="small" @click="resetSelect">重选</van-button>
							</van-col>
						</van-row>
					</van-panel>
					<van-panel title="" desc="请选择贵公司相关产业（可多选）" class="confirm-checkbox">
						<van-checkbox-group v-model="curCheck" v-if="checkList.length>0">
							<van-cell-group>
								<van-cell
									v-for="(item, index) in checkList"
									clickable
									:key="index"
									:title="item"
									@click="toggle(index)"
								>
									<van-checkbox
										:name="item"
										ref="checkboxes"
										slot="right-icon"
									/>
								</van-cell>
							</van-cell-group>
						</van-checkbox-group>
						<div class="empty-info " v-else>暂无数据</div>	
					</van-panel>
					<div class="checkbox-tips">若不匹配，也可以不选择</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<van-button type="default" @click="queryCompany" class="comfirm-btn">确定</van-button>
		</div>
		<!-- 弹出框 -->
		<van-action-sheet 
			v-model="showActionDialog" 
			title="请选择行业"
			round
			>
			<!-- 已选中标题 -->
			<div class="select-title">
				<span 
					v-for="(item, index) in selectCategory" 
					:key="index"
					:class="curCategory == index+1 && (curMain == item || curLarge == item || curMedium == item) ? 'is-select-border': 'is-default-border'" 
					@click="curCategory = index+1"
				>
					{{item.length>5?`${item.substring(0,5)} . . .`: item}}
				</span>
				<span v-if="selectCategory.length < 3" class="last-span">请选择</span>
			</div>
			<div class="category-list">
				<transition-group name="van-slide-left" >
					<!-- 门类 -->
					<div class="category-list__info" v-show="curCategory == 1" :key="'1'">
						<p 
							v-for="(item, index) in hMainList" 
							:class="curMain == item ? 'is-active-color': 'is-default-color'"
							:key="index" class="category-list__p" 
							@click="checkedCagegory(item)">{{item}}</p>
					</div>
					<!-- 大类 -->
					<div class="category-list__info" v-show="curCategory == 2" :key="'2'">
						<p 
							v-for="(item, index) in hLargeList" 
							:key="index" class="category-list__p" 
							:class="curLarge == item ? 'is-active-color': 'is-default-color'"
							@click="checkedCagegory(item)">{{item}}</p>
					</div>
					<!-- 中类 -->
					<div class="category-list__info" v-show = "curCategory == 3" :key="'3'" >
						<p 
							v-for="(item, index) in hMediumList" 
							:key="index" class="category-list__p" 
							:class="curMedium == item ? 'is-active-color': 'is-default-color'"
							@click="checkedCagegory(item)">{{item}}</p>
					</div>
				</transition-group>
			</div>
		</van-action-sheet>
  </div>
</template>

<script>	
import industryJson from './industry.json'
import { 
	queryEntDomain,  // 根据公司名称及手机号查询产业
	queryEntCdomain,  // 根据行业中类查询产业
} from '@/api/'
import { util } from '@config/utils'
export default {	
  name: "selectCompony",
  data() {
    return {
			curIndustry: '',  // 当前行业,
			curMain: '',    // 当前门类
			curLarge: '',   // 当前大类
			curMedium: '',  // 当前中类
			curCheck: [],  // 已选产业
			checkList: [],  // 可选行业
			showActionDialog: false,
			selectCategory: [], // 已选中类别
			curCategory: 1,
			industryJson: []   // 本地行业筛选数据
    }
  },
  mounted() {
		this.initPage();
		this.industryJson = industryJson;
	},
	computed: {
		// 门类
		hMainList() {
			let list  = [];
			this.industryJson.length> 0 && this.industryJson.map(item => {
				list.push(...Object.keys(item))
			})
			return list;
		},
		// 大类	
		hLargeList() {
			let list  = [], _this = this;
			this.industryJson.map(item => {
				if(Object.keys(item)[0] == _this.curMain) {
					item[_this.curMain].map(n => {
						list.push(...Object.keys(n))
					})
				}
			})
			return list;
		},
		// 中类
		hMediumList() {
			let list  = [], _this = this; 
			this.industryJson.map(item => {
				if(Object.keys(item)[0] == _this.curMain) {
					item[_this.curMain].map(large => {
						if(Object.keys(large) == _this.curLarge) {
							list.push(...large[_this.curLarge])
						}
					})
				}
			})
			return list;
		}
	},
  methods: {
		// 查询当前页面产业及行业
		initPage() {
			queryEntDomain({...this.$store.state.curConditions}).then(d => {
				if(!(Object.keys(d.data).length === 0 && d.data.constructor === Object )) {
					this.initIndustry(d.data, true);
				}
			})
		},
		initIndustry(queryData,status) {
			let curData = Object.assign({}, queryData);
			// let data = [...curData.c_cata, ...curData.c_main, ...curData.c_medium];
			let data = [...curData.c_main];
			this.checkList = util.deepCopy(data);  // 当前可勾选产业(只显示大类)
			if(status) {
				this.curMain =  curData.h_cata[0];  // 当前门类
				this.curLarge =  curData.h_main.join('、'); // 当前大类
				this.curMedium = curData.h_medium[0] // 当前中类
				let curIndustry = `${this.curLarge} / ${this.curMedium} `;
				this.curIndustry = curIndustry;
			}
		},
		toggle(index) {
      this.$refs.checkboxes[index].toggle();
		},
		// 重选行业
		resetSelect() {
			this.showActionDialog = !this.showActionDialog;
			this.curCategory = 1;
			this.selectCategory = [this.curMain, this.curLarge, this.curMedium];  // 放入数据
		},
		// 重选行业后再次查询产业
		againIndustry() {
			queryEntCdomain({'h_medium': this.curMedium}).then(d => {
				this.initIndustry(d.data);
			})
		},
		// 当前选中类别
		checkedCagegory(item) {
			switch(this.curCategory) {
				case 1:
					this.curMain = item;
					this.selectCategory = [];
					break;
				case 2: 
					this.curLarge = item;
					if(this.selectCategory.length == 3) {  // 判断新增还是替换，长度等于3删除掉最后一个
						this.selectCategory.pop();
					}
					console.log('是否是空中类',this.hMediumList)
					break;
				default:
					this.curMedium = item;
					this.showActionDialog = false;
					this.curIndustry = `${this.curLarge} / ${this.curMedium}`;  // 显示已选种类
					this.againIndustry();
					break;
			}
			if(this.selectCategory.length > 0) {
				this.selectCategory.splice(this.curCategory-1,1,item);
			}else {
				this.selectCategory.push(item);
			}
			console.log('已选中=====>',this.selectCategory)
			this.curCategory ++;
		},
    // 查询产业政策及补贴
    queryCompany() {
			let data = {
				c_list: this.curCheck.length>0?this.curCheck.join(','): this.checkList.join(',')
			}
			if(data.c_list) {
				this.$store.dispatch('set_cur_indust', data);
				this.$router.push('policyMatch');
			}else {
				console.log('无产业')
			}
    },
  }
};
</script>
<style lang="less" >
  /* 确认行业 */ 
  .confirm-industry {
		color: @colorMain;
		height: 100%;
		background-color: #efefef;
		.confirm-wrap {
			height: 100%;
			overflow: hidden;
			padding-bottom: 2rem;
			margin-bottom: -2rem;
			.confirm-info {
				height: 100%;
				overflow-x: hidden;
				overflow-y: auto;
			}
		}
    /* 标题 */
    .form-title {
			position: relative; 
			width: 100%;
			height: 153.5px;
			color: #000;
			margin-bottom: 10px;
			background: url('../../assets/images/group2.png') top / contain no-repeat;
			.componey-title {
				position: absolute;
				bottom: 0;
				width: 345px;
				transform: translateX(50%);
				right: 50%;
				border-radius: 5px;
				padding: 25px 15px;
				background-color: #fff;
				.title,
				.title-svg {
					display: inline-block;
					vertical-align: middle;
				}
				.title-svg {
					height: 1.3125em;
				}
				.title {
					padding-left: 9px;
					width: calc(100% - 20px);
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
		/* 选择分类 */
		.details {
			padding: 0px 15px 0;
			.confirm-checkbox.van-panel .van-cell,
			.confirm.van-panel .van-cell {
				border-radius: 10px 10px 0 0 ;
				border-bottom: .5px solid rgba(216,216,216,1);
				.van-cell__label {
					font-size: @fontSize28;
				}
				&:not(:last-child)::after {
					position: static;
				}
			}
			/* 当前所在行业 */
			.select-industry {
				font-size: 15px;
				color: #515151;
			}
			/* 重选 */ 
			.confirm {
				.van-button--default {
					width: 100%;
					.resetBtn(#1D6BD6,#fff);
				}
				margin-bottom: 10px;
			}
			.confirm.van-panel {
				border-radius: 10px;
				.van-row {
					padding: 20px 15px;
				}
			}
			.confirm-checkbox {
				overflow: hidden;
			}

			.confirm-checkbox.van-panel {
				border-radius: 10px 10px 0 0;
			}

			/* 提示信息 */
			.checkbox-tips {
				position: relative;
				font-size: @fontSize24;	
				color: #b1b1b1;
				padding: 13px 32px 20px;
				background-color: #fff;
				border-radius: 0 0 10px 10px;
				margin-bottom: 15px;
				&::before {
					position: absolute;
					content: '!';
					color: #fff;
					text-align: center;
					width: 14px;
					height: 14px;
					left: 10px;
					background-color: #FED565;
					border-radius: 50%;
				}
			}
		}

		/* 确定 */
		.footer {
			padding: 0.5rem 15px;
			.van-button--default {
				width: 100%;
				.resetBtn();
			}
		}
		
		/* 重选弹框中的内容 */
		.van-popup {
			overflow: visible;
		}
		.van-action-sheet {
			max-height: 80%;
			height: 100%;
			.van-action-sheet__header {  // 重新设置选择行业样式
				text-align: left;
				padding-left: 15px;
			}
			.van-action-sheet__content {
				padding: 21px;
				height: 100%;
			}
		}
		.van-popup--bottom.van-popup--round {
			border-radius: 5px 5px 0 0;
		}
		
		// 已选中类别
		.is-active-color {
			color: #4084E8 !important;
		}
		// 默认类别
		.is-default-color {
			color: #606060;
		}
		// 已选中标题
		.is-select-border {
			border-bottom: 2px solid #4084E8;
		}
		// 默认标题
		.is-default-border {
			border-bottom: none;
		}

		// 选中标题列表
		.select-title {
			padding: 0 0 11px;
			margin-left: -3px;
			margin-right: -4px;
			span {
				// display: inline-block;
				padding: 4px 0;
				margin-right: 21px;
				font-size: 14px;
				color: #606060;
			}
			.last-span {
				border-bottom: 2px solid #4084E8;
				text-decoration: none;
			}
		}
	
		// 类别列表
		.category-list {
			height: 100%;
			overflow-y: auto;
			>span {
				width: 100%;
				display: inline-block;
				overflow: hidden;
				padding-bottom: 2rem;
				margin-bottom: -2rem;
			}
			&__info {
				height: 100%;
			}
			&__p {
				font-size: 14px;
				padding: 13px 0;
			}
		} 
			/* 暂无信息 */
		.empty-info {
			padding: 10px 0;
			font-size: 14px;
			text-align: center;
		}
  }
</style>

