import request from '../utils/request'


export const getTemplates = params => request.get('/v1.0/template', {params: params})  // 获取模板推荐公共接口

export const getLoginLinks = params => request.get(`https://passport.${process.env.BASE_DOMAIN}/login/v1.0/`, {params: params})  // 获取登录链接

/**
 * 数据统计接口
 */
export const saveReadRecord = params => request.post('/user_manage/v1.0/save_read_record', params)  // 记录用户阅读记录

export const saveBookClick = params => request.get('/v1.0/save_book_click', {params: params})  // 记录书籍点击量

export const saveChapterClick = params => request.post('/v1.0/save_chapter_click', params)  // 记录章节点击量

/**
 * 书籍模块接口
 */
export const getBookInfo = params => request.get('/v1.0/get_book_base_info', {params: params})  // 获取书籍基本信息

export const getStatData = params => request.get('/v1.0/get_book_stat', {params: params})  // 获取书籍统计数据

export const getFansRank = params => request.get('/v1.0/book_reward_info', {params: params})  // 获取书籍粉丝榜

export const getCategory = params => request.get('/v1.0/book_category_cascade', {params: params})  // 获取书籍分类

export const getChapterContent = params => request.get('/v1.0/chapter_content', {params: params})  // 获取章节内容

export const getSideChapter = params => request.get('/v1.0/prev_next_chapter', {params: params})  // 获取章节前后章

export const getBookCatalog = params => request.get('/v1.0/book_catalog', {params: params})  // 获取书籍目录

export const getSearchBook = params => request.get('/search/v1.0/search', {params: params})  // 获取搜索书籍

export const getFreeBook = params => request.get('/v1.0/book_free_now', {params: params})  // 获取限时免费书籍

export const getLibrary = params => request.get('/v1.0/book_base_page', {params: params})  // 获取书库列表

/**
 * 用户数据接口
 */
export const getUserInfo = params => request.get('/v1.0/user/userinfo', {params: params})  // 获取用户基本信息

export const getUserRecent = params => request.get('/v1.0/user/recent_read', {params: params})  // 获取用户基本信息

export const getRechargeRecord = params => request.get('/v1.0/get_user_pay_info', {params: params})  // 获取用户充值记录

export const getConsumeRecord = params => request.get('/v1.0/get_user_buy_chapter', {params: params})  // 获取用户消费记录

export const getPurchaseRecord = params => request.get('/v1.0/full/user_buy_book_list', {params: params})  // 获取用户购买全本记录

export const getRewardRecord = params => request.get('/v1.0/user_reward', {params: params})  // 获取用户打赏记录

export const getRecentRead = params => request.get('/user_manage/v1.0/get_read_record', {params: params})  // 获取用户最近阅读记录

export const getSaveBook = params => request.get('/user_manage/v1.0/get_user_collection', {params: params})  // 获取用户书架书籍

export const getSubscribeBook = params => request.get('/v1.0/user/get_subscribe_list', {params: params})  // 获取用户订阅书籍

export const getBookComment = params => request.get('/user_manage/v1.0/user_comment', {params: params})  // 获取用户书评列表

export const getUserType = params => request.get('/v1.0/is_new_user', {params: params})  // 判断用户类型

/**
 * 用户操作接口
 */
export const userLogout = params => request.get(`https://passport.${process.env.BASE_DOMAIN}/logout/v1.0/logout`, {params: params})  // 用户退出

export const addSaveBook = params => request.get('/user_manage/v1.0/save_collection', {params: params})  // 用户加入书架

export const delSaveBook = params => request.get('/user_manage/v1.0/delete_user_collection', {params: params})  // 用户删除书架书籍

export const delRecentRead = params => request.get('/user_manage/v1.0/delete_read_record', {params: params})  // 用户删除最近阅读记录

export const handleSubscribe = params => request.get('/v1.0/user/save_subscribe', {params: params})  // 用户订阅书籍/取消订阅书籍

export const giveMonthTicket = params => request.get('/user_level/v1.0/give_month_ticket', {params: params})  // 用户给书籍投月票

export const giveRecommendTicket = params => request.get('/user_level/v1.0/give_recommend_ticket', {params: params})  // 用户给书籍投推荐票

export const buyFullBook = params => request.get('/v1.0/full/go_to_book_full_buy', {params: params})  // 用户全本购买

export const rewardBook = params => request.post('/v1.0/reward/', params)  // 用户打赏书籍

export const buyChapter = params => request.post('/v1.0/buy/buy_chapter', params)  // 用户购买章节

/**
 * 排行榜接口
 */
export const getClickRank = params => request.get('/v1.0/click_book', {params: params})  // 获取点击榜

export const getSubscribeRank = params => request.get('/v1.0/subscibe_book', {params: params})  // 获取订阅榜

export const getNewRank = params => request.get('/v1.0/new_book', {params: params})  // 获取新书榜

/**
 * 消息模块接口
 */
export const getMessage = params => request.get('/user_manage/v1.0/new_message', {params: params})  // 获取消息列表

export const cancelSystemMessage = params => request.get('/user_manage/v1.0/cancel_user_message', {params: params})  // 取消系统消息提醒

export const cancelReplyMessage = params => request.get('/user_manage/v1.0/cancel_message', {params: params})  // 取消评论消息提醒

/**
 * 签到模块接口
 */
export const checkSign = params => request.get('/user_manage/v1.0/sign_in', {params: params})  // 检验是否签到/签到

export const getSignRecord = params => request.get('/user_manage/v1.0/sign_record', {params: params})  // 获取签到记录

/**
 *  评论模块接口
 */
export const getComment = params => request.get('/user_manage/v1.0/get_comment', {params: params})  // 获取书籍评论

export const saveComment = params => request.post('/user_manage/v1.0/save_comment', params)  // 用户发表评论

export const getReply = params => request.get('/user_manage/v1.0/get_comment_child', {params: params})  // 获取评论回复