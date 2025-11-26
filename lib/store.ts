import { configureStore } from '@reduxjs/toolkit'
import { jobListApi } from './features/jobList/jobListApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = 
   configureStore({
    reducer: {
        [jobListApi.reducerPath]: jobListApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobListApi.middleware),
  })


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>