import { hyRequest } from './index'
// 请求轮播图数据
export function getMusicBanner(type = 0) {
  return hyRequest.get({
    url: '/banner',
    data: {
      type
    }
  })
}
// 推荐歌曲数据
export function getRecommentMusic(id) {
  return hyRequest.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}
// 热门歌曲
export function getHotMenu(cat = "全部", limit = "6", offset = "0") {
  return hyRequest.get({
    url: '/top/playlist',
    data: {
      cat,
      limit,
      offset
    }
  })
}
// 歌曲类别
export function getSongMenuTag() {
  return hyRequest.get({
    url: '/playlist/hot'
  })
}