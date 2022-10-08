const http = 'https://eq.10jqka.com.cn';
const khCSkvps = 'https://khtest.10jqka.com.cn';
const khKvps = 'https://kaihu.10jqka.com.cn';

const searchBlockInfoList = http + '/wechatApplication/search/searchBlockInfoList';
const smsSend = http + '/wechatApplication/alipay/login/smsSend';
const smsCheck = http + '/wechatApplication/alipay/login/smsCheck';
const searchBlockInfo = http + '/wechatApplication/search/searchBlockInfo';
const checkIsOptionalStock = http + '/wechatApplication/alipay/checkIsOptionalStock';
const deleteOptionalStock = http + '/wechatApplication/alipay/deleteOptionalStock';
const addOptionalStock = http + '/wechatApplication/alipay/addOptionalStock';
const searchIndex = http + '/wechatApplication/search/searchIndex';
const loginOut = http + '/wechatApplication/login/loginOut';
const searchOptionalStock = http + '/wechatApplication/alipay/searchOptionalStock';
const everyOneIsSearching = http + '/wechatApplication/alipay/everyOneIsSearching';
const intelligentSearch = http + '/wechatApplication/alipay/intelligentSearch';
const getOpenidAndSessionKey = http + '/wechatApplication/login/getOpenidAndSessionKey';
const readPinYin = http + '/wechatApplication/search/readPinYin';
const authorizeTel = http + '/wechatApplication/login/authorizeTel';

//支付宝运营首页弹窗配置
const getIndexDialogIsShow = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_isShow';
const getIndexDialogImg = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_img';
const getIndexDialogGotoUrl = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexDialog_gotoUrl';
//支付宝运营首页广告配置
const getIndexADIsShow = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_isShow';
const getIndexADImg = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_img';
const getIndexADGotoUrl = khCSkvps + '/micro/api/v1/kvps?keys=zfb_indexAD_gotoUrl';

export default {
	searchBlockInfoList,
	smsSend,
	smsCheck,
	searchBlockInfo,
	checkIsOptionalStock,
	deleteOptionalStock,
	addOptionalStock,
	searchIndex,
	loginOut,
	searchOptionalStock,
	everyOneIsSearching,
	intelligentSearch,
	getOpenidAndSessionKey,
	readPinYin,
	authorizeTel,
	getIndexDialogIsShow,
	getIndexDialogImg,
	getIndexDialogGotoUrl,
	getIndexADIsShow,
	getIndexADImg,
	getIndexADGotoUrl
}