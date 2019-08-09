<template>
<!-- 政策匹配 -->
  <div class="policy-match">
		<div class="policy-wrap">
			<div class="policy-info">
				<div class="form-title font32">
					<div class="componey-title">
						<svg-icon icon-class="componey" class="title-svg" />
						<span class="title">{{$store.state.curComponey}}</span>
					</div>
				</div>
				<div class="details">
					<van-panel title="" desc="预测最多可申报扶持资金" class="export-funds">
						<div class="funds"><strong>{{total_highest_subsidy}}</strong><span> 万</span></div>
					</van-panel>
					<!-- 补贴 -->
					<div class="allowance-list">
						<div class="list-info">
							<!-- <van-panel title="" desc="预计贵公司可享受"> -->
							<div class="allowance">预计贵公司可享受</div>
							<van-cell 
								value="详情" 
								:key="index"
								v-for="(item,index) in subsidy_digest"
								@click="queryDetais(item)"
								v-if="item.count && subsidy_digest.length> 0"
								is-link>
								<template slot="title">
									<strong>{{item.count}}</strong>
									<span>{{item.subsidy_type}}</span>
								</template>
							</van-cell>
							<div v-if="subsidy_digest.length ==  0" class="empty-info">暂无信息</div>
							<!-- </van-panel> -->
						</div>
					</div>
					<!-- 相关政策 -->
					<div class="policy-list">
						<div class="list-info">
							<div class="allowance">相关扶持政策</div>
							<div class="support">
								<van-cell 
									value="" 
									:key="index"	
									v-for="(item,index) in policyList"
									:url="item.file_link"
									v-if="policyList.length> 0"
									is-link>
									<template slot="title">
										<div class="support-name">{{item.file_name}}</div>
										<div class="tag-list van-ellipsis">
											<div class="v-tag" v-for="(sub,index) in item.subsidy_type" :key="index" v-if="index<3"><span v-if="sub">{{sub}}</span></div>
											<div v-if="item.subsidy_type && item.subsidy_type.length> 3" class="ellipsis-tag">. . .</div>
										</div>
									</template>
								</van-cell>
								<div v-if="policyList.length == 0" class="empty-info">暂无信息</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<div @click="resetQuery" class="refresh-btn">
				<svg-icon icon-class="refresh" class="refresh-svg" />
				<span class="btn-text">重新查询</span>	
			</div>
			<a href="tel: 400 009 9018" @click="queryCompany" class="phone-btn">
				<svg-icon icon-class="phone" class="phone-svg" />
				<span class="btn-text">立即电话申报</span>
			</a>
		</div>
  </div>
</template>

<script>	
import { 	
	queryEntPolicy  // 根据产业查询政策和补贴
} from '@/api/index'  
import { util } from '@config/utils'
export default {	
  name: "selectCompony",
  data() {
    return {
			loading: false,
			finished: true,
			total_highest_subsidy: '',  // 最高补贴
      subsidy_digest: [],  // 补贴列表
			policyList: [],  // 相关扶持政策
			subsidy_detail: []  // 补贴详情
    }
  },
  mounted() {
		this.initPage(this.$store.state.curIndustry);
  },
  components: {
  },
  methods: {
		// 初始化数据
		initPage(val) {
			queryEntPolicy({...val}).then(d => {
				if(d.data) {
					let curData = Object.assign({},d.data);
					this.policyList = curData.policy.length> 0 ? util.deepCopy(curData.policy) : [];  // 相关政策
					this.total_highest_subsidy = curData.total_highest_subsidy != 'None' ? curData.total_highest_subsidy: 0;  // 最高补贴
					this.subsidy_digest = curData.subsidy_digest.length> 0? util.deepCopy(curData.subsidy_digest) : [];  // 补贴列表
					this.subsidy_detail = curData.subsidy_detail.length> 0? util.deepCopy(curData.subsidy_detail) : [];  // 补贴列表
				}
			})
		},
		// 查看详情
		queryDetais(item) {
			let data = this.subsidy_detail.filter(i => i.subsidy_type == item.subsidy_type);
			this.$store.dispatch('set_subsidy_detail', data);
			this.$router.push('subsidyDetail')
		},
		// 重新查询
		resetQuery() {
			// this.initPage(this.$store.state.curIndustry);
			this.$router.push('home')
		},
    // 查询公司
    queryCompany() {
      // this.$dialog.confirm({
			// 	message: '400 009 9018',
			// 	confirmButtonText: '呼叫'
			// }).then(() => {
				// let tempLink = document.createElement('a');
				// tempLink.href = 'tel: 400 009 9018';
				// tempLink.style.display = "none";
				// document.body.appendChild(tempLink);
        // tempLink.click();
        // document.body.removeChild(tempLink);
				// on confirm
			// }).catch(() => {
			// 	// on cancel
			// });
    },
  }
};
</script>
<style lang="less" scoped>
  /* 匹配政策 */ 
  .policy-match {
		color: @colorMain;
		height: 100%;
		background-color: #efefef;
		.policy-wrap {
			height: 100%;
			overflow: hidden;
			padding-bottom: 1.5rem;
			margin-bottom: -1.5rem;
			.policy-info {
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
		/* 内容项 */
		.details {
			padding: 0px 15px 0;
			.van-cell__label {
				font-size: 14px;
			}
			/* 预计资金 */
			.export-funds {
				margin-bottom: 10px;
				border-radius: 10px;
				.van-panel__header {
					border-radius: 10px 10px 0 0;
					padding: 15px;
					border-bottom: none !important;	
				}
				.funds {
					padding: 20px 0 42px;
					text-align: center;
					strong {
						font-size: 24px;
						background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(241,97,97,1)),to(rgba(219,48,48,1)));
						-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
					}
					span {
						font-size: 15px;
						color: #8f8f8f;
					}
				}
			}
			/* 贵公司可享受补贴 */
			.allowance-list {
				.list-info {
					border-radius: 5px;
					.allowance {
						font-size: @fontSize28;
						background-color: #fff;
						padding: 17px 10px;
						color: #939393;
						border-radius: 5px 5px 0 0;
					}
					.van-cell {	
						strong {
							font-size: 18px;
							background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(121,184,243,1)),to(rgba(55,135,255,1)));
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							margin-right: 9px;
						}
						.van-cell__right-icon {
							color: #3888FF;
							margin-top: 1px;
						}
						.van-cell__value {
							span {
								color: #3888FF;
							}
						}
						/deep/.van-cell:not(:last-child)::after {
								border-bottom: 0.02667rem solid #d5d5d5;
						}
					}
				}
			}
			/* 政策补贴 */
			.policy-list {
				overflow: hidden;
				margin-top: 10px;
				.list-info {
					border-radius: 5px;
					.allowance {
						font-size: @fontSize28;
						background-color: #fff;
						padding: 17px 10px;
						color: #939393;
					}
					.support {
						padding: 0 10px 14px;
						background-color: #fff;
						border-radius:  0 0 5px 5px;
						.van-cell {	
							box-shadow:0px .5px 2px 0px rgba(0,0,0,0.2);
							border-radius: 3px;
							border: .5px solid rgba(213,213,213,1);
							padding: 12.5px 10px;
							margin-bottom: 10px;
							&:last-of-type {
								margin-bottom: 0;
							}
							.support-name {
								width: 270px;
							}
							.van-cell__right-icon {
								position: absolute;
								right: 15px;
								transform: translateY(50%);
								bottom: 50%;
								width: 24px;
								height: 24px;
								text-align: center;
								color: #fff;
								border-radius: 50%;
								background:linear-gradient(180deg,rgba(121,184,242,1) 0%,rgba(41,112,229,1) 100%);
							}
						}
						.van-cell__value {
							display: none;
						}
						.tag-list {
							margin-top: 10px;
							width: 325px;
							.v-tag {
								display: inline-block;
								margin-right: 10px;
								width: 62px;
								height: 24px;
								line-height: 22px;
								box-sizing: border-box;
								color: #3888FF;
								font-size: 12px;
								text-align: center;
								border-radius: 22px;
								border: 1px solid;
								border-color: #57A9ED;
								span {
									color: inherit;
								}
								&:last-of-type {
									margin-right: 0;
								}
							}
							/* 省略号 */
							.ellipsis-tag {
								color: #3888FF;
								display: inline-block;
							}
						}
					}
				}
			}
		}
		/* 底部按钮 */
		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			.btn-text {
				padding-left: 8px;
			}
			.refresh-btn {
				width: 33.3%;
				height: 1.4rem;
				line-height: 1.2rem;
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				font-size: 14px;
				background-color: rgba(218,218,218,1);
				span {
					color: #818181;
				}
			}
			.phone-btn {
				width: 66.7%;
				height: 1.4rem;
				line-height: 1.2rem;
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				font-size: 14px;
				span {
					color: #fff;
				}
				background:linear-gradient(90deg,rgba(120,183,242,1) 0%,rgba(42,112,229,1) 100%);
			}
		}
		/* 暂无信息 */
		.empty-info {
			background-color: #fff;
			border-radius: 0 0 5px 5px;
			padding-bottom: 10px;
			font-size: 14px;
			text-align: center;
		}
	}
</style>

