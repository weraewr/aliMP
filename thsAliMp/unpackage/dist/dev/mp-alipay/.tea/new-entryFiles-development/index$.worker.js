
require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');
function success() {
require('../..//app.js?appxworker=1');
require('../../components/ths-nav/ths-nav.js?appxworker=1');
require('../../components/ths-contrast/ths-contrast.js?appxworker=1');
require('../../components/ths-todayplate/ths-todayplate.js?appxworker=1');
require('../../components/ths-unify-list/ths-unify-list.js?appxworker=1');
require('../../components/ths-popUp/ths-popUp.js?appxworker=1');
require('../../components/jyf-parser/libs/trees.js?appxworker=1');
require('../../components/jyf-parser/jyf-parser.js?appxworker=1');
require('../../iview/icon/index.js?appxworker=1');
require('../../iview/toast/index.js?appxworker=1');
require('../../components/pageWrap/index.js?appxworker=1');
require('../../pages/index/index.js?appxworker=1');
require('../../pages/optional/optional.js?appxworker=1');
require('../../pages/bindphonenum/bindphonenum.js?appxworker=1');
require('../../pages/feedback/feedback.js?appxworker=1');
require('../../pages/searchstock/searchstock.js?appxworker=1');
require('../../pages/hq/hq.js?appxworker=1');
require('../../pages/webview/webview.js?appxworker=1');
require('../../pages/news/news.js?appxworker=1');
require('../../pages/article/article.js?appxworker=1');
require('../../pages/allstock/allstock.js?appxworker=1');
require('../../pages/blockdetail/blockdetail.js?appxworker=1');
require('../../pages/backWash/backWash.js?appxworker=1');
require('../../pages/thskh/thskh.js?appxworker=1');
require('../../pages/middlePage/middlePage.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
