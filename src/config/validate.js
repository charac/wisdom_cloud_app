import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件
Vue.use(VeeValidate);
Validator.localize("zh_CN", zh_CN);

const formatFileSize = function(size) {
  let units = ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let threshold = 1024;
  size = Number(size) * threshold;
  let i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return (size / Math.pow(threshold, i)).toFixed(2) * 1 + " " + units[i];
};
const fieldName = ""; //原来的i18n的fieldName会显示绑定的name值，就是英文，实际项目中不需要

Validator.localize("zh_CN", {
  name: "zh_CN",
  attributes: {},
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  messages: {
    _default: () => `${fieldName}无效`,
    after: (field, [target]) => `${fieldName}必须在${target}之后`,
    alpha_dash: () => `${fieldName}能够包含字母数字字符、破折号和下划线`,
    alpha_num: () => `${fieldName}只能包含字母数字字符`,
    alpha_spaces: () => `${fieldName}只能包含字母字符和空格`,
    alpha: () => `${fieldName}只能包含字母字符`,
    before: (field, [target]) => `${fieldName}必须在${target}之前`,
    between: (field, [min, max]) => `${fieldName}必须在${min}与${max}之间`,
    confirmed: (field, [confirmedField]) =>`${fieldName}不能和${confirmedField}匹配`,
    credit_card: () => `${fieldName}格式错误`,
    date_between: (field, [min, max]) => `${fieldName}必须在${min}和${max}之间`,
    date_format: (field, [format]) => `${fieldName}必须符合${format}格式`,
    decimal: (field, [decimals = "*"] = []) =>
      `${fieldName}必须是数字，且能够保留${
        decimals === "*" ? "" : decimals
      }位小数`,
    digits: (field, [length]) =>
      `${fieldName}必须是数字，且精确到${length}位数`,
    dimensions: (field, [width, height]) =>
      `${fieldName}必须在${width}像素与${height}像素之间`,
    email: () => `${fieldName}不是一个有效的邮箱`,
    ext: () => `${fieldName}不是一个有效的文件`,
    image: () => `${fieldName}不是一张有效的图片`,
    included: () => `${fieldName}不是一个有效值`,
    integer: () => `${fieldName}必须是整数`,
    ip: () => `${fieldName}不是一个有效的地址`,
    length: (field, [length, max]) => {
      if (max) {
        return `${fieldName}长度必须在${length}到${max}之间`;
      }
      return `${fieldName}长度必须为${length}`;
    },
    max: (field, [length]) => `${fieldName}不能超过${length}个字符`,
    max_value: (field, [max]) => `${fieldName}必须小于或等于${max}`,
    mimes: () => `${fieldName}不是一个有效的文件类型`,
    min: (field, [length]) => `${fieldName}必须至少有${length}个字符`,
    min_value: (field, [min]) => `${fieldName}必须大于或等于${min}`,
    excluded: () => `${fieldName}不是一个有效值`,
    numeric: () => `${fieldName}只能包含数字字符`,
    regex: () => `${fieldName}格式无效`,
    required: () => `公司名称${fieldName}不能为空`,
    msgCode: (field) => ` ${field} 格式不正确.`,
    nickname: (field) => ` ${field} 只能包含字母、数字或中文.`,
    size: (field, [size]) => `${fieldName}必须小于${formatFileSize(size)}`,
    url: () => `${fieldName}不是一个有效的url`
  }
});

// 手机号码验证
Validator.extend("mobile", {
  getMessage: () => `请输入正确的手机号码`,
  validate: value =>
    value.length === 11 &&
    /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(
      value
    )
});

//6位手机短信验证码
Validator.extend('msgCode', {
　　getMessage: field => field + ' 格式不正确',
　　validate: value => !!/^[a-zA-Z0-9]{6}$/.test(value)
});

//昵称
Validator.extend('nickname', {
　　getMessage: field => field + ' 只能包含字母、数字或中文',
　　validate: value => !!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)
});


// errors.first('field') -- 获取关于当前field的第一个错误信息
// collect('field') -- 获取关于当前field的所有错误信息(list)
// has('field') -- 当前filed是否有错误(true/false)
// all() -- 当前表单所有错误(list)
// any() -- 当前表单是否有任何错误(true/false)