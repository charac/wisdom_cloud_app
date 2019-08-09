<template>
<!-- 补贴详情 -->
  <div class="subsidy-detail">
		<div class="subsidy-wrap">
			<div class="subsidy-info">
				<div class="form-title font32">
					<div class="details-title">
						<strong>{{ $store.state.subsidy_detail.length}}</strong>
						<span class="title">项{{$store.state.subsidy_detail[0].subsidy_type }}</span>
					</div>
				</div>
				<div class="details">
					<!-- 补贴说明 -->
					<div class="subsidy-list">
						<div class="list-info">
							<div class="allowance">补贴说明</div>
							<div class="support">
								<van-cell 
									value="" 
									:key="index"	
									v-for="(item,index) in subsidyList">
									<template slot="title">
										<!-- 标题 -->
										<div class="support-name">
											<van-row type="flex" justify="space-between">
												<van-col span="8">补贴{{index+1}}</van-col>
												<van-col span="16" style="text-align: right">补贴金额：<span>{{item.lowest_reward || 0 }}万 - {{item.highest_reward || 0}}万</span></van-col>
											</van-row>
										</div>
										<!-- 要求 -->
										<div class="support-item">
											<span class="support-item__icon">
												<svg-icon icon-class="requireIcon"/><i>要求</i>
											</span>
											<div class="support-item__info">{{item.policy_rule_claim}}</div>
										</div>
										<!-- 说明 -->
										<div class="support-item">
											<span class="support-item__icon">
												<svg-icon icon-class="descIcon"/><i>说明</i>
											</span>
											<div class="support-item__info">{{item.reward_desc}}</div>
										</div>
										<!-- 文件 -->
										<div class="support-item">
											<span class="support-item__icon">
												<svg-icon icon-class="fileIcon"/><i>文件</i>
											</span>
											<div class="support-item__info">
												<van-row type="flex" justify="space-between" @click.native="jumpDetails(item)">
													<van-col span="22">{{item.file_name}}</van-col>
													<van-col span="2" style="text-align: right;"><van-icon name="arrow" color="#377DE8"/></van-col>
												</van-row>
											</div>
										</div>
									</template>
								</van-cell>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>	
import { 	
  query_ent_list
} from '@/api/index'  
export default {	
  name: "selectCompony",
  data() {
    return {
			loading: false,
			finished: true,
			// subsidyList: [{
			// 			"file_link": "http://www.chengduinvest.gov.cn/index#/zszc/details/f70a2a3a773447f08ae5ff956ccae6c5",
			// 			"file_name": "《成都市促进军民融合产业加快发展的若干政策措施》",
			// 			"highest_reward": "500.00",
			// 			"lowest_reward": "500.00",
			// 			"policy_rule_claim": "对在上海证券交易所、深圳证券交易所等重点境内外资本市场首发上市融资的企业",
			// 			"reward_desc": "给予最高不超过500万元补助",
			// 			"subsidy_type": "融资补贴"
			// 	},
			// 	{
			// 			"file_link": "http://www.chengduinvest.gov.cn/index#/zszc/details/f70a2a3a773447f08ae5ff956ccae6c5",
			// 			"file_name": "《成都市促进军民融合产业加快发展的若干政策措施》",
			// 			"highest_reward": "50.00",
			// 			"lowest_reward": "10.00",
			// 			"policy_rule_claim": "对非上市企业发行企业债、私募债、中期票据、短期融资券等进行直接融资且单笔融资额3000万元及以上的",
			// 			"reward_desc": "每笔补助融资企业10万元， 单户企业累计不超过50万元",
			// 			"subsidy_type": "融资补贴"
			// 	},
			// 	{
			// 			"file_link": "http://www.chengduinvest.gov.cn/index#/zszc/details/f70a2a3a773447f08ae5ff956ccae6c5",
			// 			"file_name": "《成都市促进军民融合产业加快发展的若干政策措施》",
			// 			"highest_reward": null,
			// 			"lowest_reward": null,
			// 			"policy_rule_claim": "对再融资投资的重大项目",
			// 			"reward_desc": "按照本政策“三、支持军民融合重大项目建设”的“一事一 议”部分给予支持",
			// 			"subsidy_type": "项目扶持"
			// }]
    }
  },
	computed: {
		subsidyList() {
			return this.$store.state.subsidy_detail || [];
		}
	},
  methods: {
		// 跳转详情
		jumpDetails(item) {
			window.location.href = item.file_link;
		}
  }
};
</script>
<style lang="less" scoped>
  /* 匹配政策 */ 
  .subsidy-detail {
		color: @colorMain;
		height: 100%;
		background-color: #efefef;
		.subsidy-wrap {
			height: 100%;
			overflow: hidden;
			padding-bottom: 10px;
			.subsidy-info {
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
			.details-title {
				position: absolute;
				bottom: 0;
				width: 345px;
				transform: translateX(50%);
				right: 50%;
				border-radius: 5px;
				padding: 25px 15px;
				background-color: #fff;
				strong {
					font-size: 21px;
					display: inline-block;
					vertical-align: middle;
					background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(121,184,243,1)),to(rgba(55,135,255,1)));
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					margin-right: 9px;
				}
				.title {
					display: inline-block;
					vertical-align: middle;
					font-size: 16px;
					color: #515151;
				}
			}
		}
		/* 内容项 */
		.details {
			padding: 0px 15px 0;
			/* 补贴说明 */
			.subsidy-list {
				overflow: hidden;
				margin-top: 10px;
				.list-info {
					/* 补贴说明 */ 
					.allowance {
						border-radius: 5px 5px 0 0;
						font-size: @fontSize28;
						background-color: #fff;
						padding: 17px 10px;
						color: #939393;
					}
					/* 补贴详情 */ 
					.support {
						padding: 0 10px 14px;
						background-color: #fff;
						border-radius: 0 0 5px 5px;
						.van-cell {	
							box-shadow:0px .5px 2px 0px rgba(0,0,0,0.2);
							border-radius: 3px;
							border: .5px solid rgba(213,213,213,1);
							padding: 10.5px 12px 16px;
							margin-bottom: 10px;
							&:last-of-type {
								margin-bottom: 0;
							}
							/* 标题 */ 
							.support-name {
								border-bottom: .5px solid #ddd;
								margin-left: -12px;
								margin-right: -12px;
								padding: 0 12px 13px;
								.van-col {
									font-size: 13px;
									span {
										color: #E74949;
									}
								}
							}
							/* 要求 文件 说明 */
							.support-item {
								overflow: hidden;
								position: relative;
								margin-top: 13px;
								&__icon {
									position: absolute;
									left: 0;
									padding: 5px 21px 5px 10px;
									text-align: center;
									border-radius:0px 10px 0px 10px;
									background:linear-gradient(90deg,rgba(123,184,242,1) 0%,rgba(42,112,229,1) 100%);
									i {
										color: #fff;
										padding-left: 5px;
										font-size: 12px;
									}
								}
								&__info {
									padding: 20px 22px 11px 10px;
									margin-top: 18px;
									background-color: #ECF6FF;
									box-sizing: border-box;
									color: #515151;
								}
							} 
						}
						.van-cell__value {
							display: none;
						}
					}
				}
			}
		}
	}
</style>

