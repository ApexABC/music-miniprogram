import { HYEventStore } from "hy-event-store"
import { getRecommentMusic } from '../services/music'
const recommendStore = new HYEventStore({
  state: {
    recommendSongInfo: {}
  },
  actions: {
    fetchRecommentMusic(ctx) {
      getRecommentMusic(3778678).then(res => {
        ctx.recommendSongInfo = res.playlist
      })
    },
  }
})
export default recommendStore
