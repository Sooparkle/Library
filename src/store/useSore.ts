import { create } from "zustand"

interface countState{
  counts : number,
  increase : (by : number) => void
}

const useStore = create<countState>() ((set) =>({

  counts : 10,
  increase : (by) => set((state) => ({counts : state.counts + by}))
  })
)
export default useStore