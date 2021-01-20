/**
 * @Description:全局配置正则表达式
 * @author:yuanbotao
 * @Date:2019/10/11
 */
export default {
  /** 姓名 **/
  name:/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}/,
  nameMessage:'长度限制为2-20位',
  /** 身份证 **/
  identity:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  identityMessage:'身份证格式不正确',
  /** 手机号 **/
  phone:/^1(3|4|5|6|7|8|9)\d{9}$/,
  phonemessage:'s手机号格式不争取',
  /** 银行卡卡号 **/
  bankCode: /^([1-9]{1})(\d{14,20})$/,
  bankCodeMessage:'银行卡卡号格式不正确',
  /** 昵称 **/
  loginName:/^.{2,40}$/,
  loginNameMessage:'昵称需在2-40位之间',
  /** 密码 **/
  cipher:/^[A-Za-z0-9]{6,20}$/,
  cipherMessage:'密码仅为英文和数字最少6位，最长不超过20位',
  /** 验证码 **/
  code:/^[0-9]{6}$/,
  codeMessage:'验证码格式不正确,请输入六位数验证码',
  /** 字母或者数字 **/
  letterAndNumber:/[a-z]|[A-Z]|[0-9]/,
  letterAndNumberMessage:'只能输入字母或者数字',
  /** 网址 **/
  url:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
  urlMessage:'网址格式不正确',
  /** 价格 **/
  price:/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
  priceMessage:'价格输入有误',
}
