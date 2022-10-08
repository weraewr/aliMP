/**
 * 获取接口地址
 * @param {String} version 版本
 */
const getReqUrl = version => `https://news.10jqka.com.cn/wxapp/config/v${version || '1.1.0'}`;
/**
 * 要闻列表
 * @param {Number} page 页数
 * @param {String} url 初始化地址
 * @return {String} 
 */


const newsList = (page, url) => {
  if (url.match('http:')) {
    url = url.replace('http:', 'https:');
  }

  return url.replace('@page@', page);
}; // const newsList = (page) => (
//   `https://news.10jqka.com.cn/wxapp/v2/headline/index_${page || 1}.json`
// )

/**
 * 获取要闻底层页的内容
 * @param {String} seq 文章seq
 */


const newsArticle = seq => // `http://yapi.demo.qunar.com/mock/34349/ths/article?seq=${seq}`
`https://news.10jqka.com.cn/wxapp/article/${seq}.json`;

module.exports = {
  getReqUrl,
  newsList,
  newsArticle
};