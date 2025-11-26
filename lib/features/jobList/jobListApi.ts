import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AllJobRequestType } from '@/types/AllJobRequestType';
import { JobByIdRequestType } from '@/types/JobByIdRequestType';

export const jobListApi = createApi({
    reducerPath: "jobListApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/opportunities' }),
    endpoints: (build) => ({
        getAllJobs: build.query<AllJobRequestType, void>({
            query: () => '/search'
        }),
        getJobById: build.query<JobByIdRequestType, string>({
            query: (id) => `/${id}`
        })
    }),
});


export const { useGetAllJobsQuery, useGetJobByIdQuery } = jobListApi;