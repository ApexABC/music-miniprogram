import { hyRequest } from './index'
export function getTopMV(limit = 20, offset = 0) {
  return hyRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset
    }
  })
}
export function getMvUrl(videoId) {
  return hyRequest.get({
    url: '/mv/url',
    data: {
      id: videoId
    }
  })
}
// 请求mv详情数据
export function getMvInfo(mvid) {
  return hyRequest.get({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}
// mv相关视频
export function getMvRelative(id) {
  return hyRequest.get({
    url: '/related/allvideo',
    data: {
      id
    }
  })
}