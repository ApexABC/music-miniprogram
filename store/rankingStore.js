import { HYEventStore } from 'hy-event-store'
import { getRecommentMusic } from '../services/music'
const rankingsMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}
const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    fetchRankingDataAction(ctx) {
      for (const key in rankingsMap) {
        const id = rankingsMap[key]
        getRecommentMusic(id).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})

export default rankingStore