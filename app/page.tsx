'use client'

import { useGetAllJobsQuery } from "@/lib/features/jobList/jobListApi";
import JobCard from "./components/JobCard";
import JobData from './db/jobData.json'
import Loading from "./components/Loading";
import { notFound } from "next/navigation";

export default function Home() {
  const { data, isLoading, isError }  = useGetAllJobsQuery();

  if (isLoading) {
    return Loading();
  }

  if (isError) {
    notFound();
  }

  return (
    <>
      <main className="flex flex-col max-w-5xl m-auto">
        <div className="flex flex-row mt-16 justify-between items-center m-8">
          <div>
            <h1 className="text-blue-950 font-black text-3xl">Opportunities</h1>
            <p className="text-gray-500">Showing {data?.data.length} results</p>
          </div>
          <div className="flex flex-row gap-2">
            <label htmlFor="sort" className="text-gray-500">Sort by: </label>
            <select name="sort" id="sort" className="font-medium text-center">
              <option value="most-relevant">Most relevant</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
        <div className="m-8 flex flex-col gap-12">
          {
            data?.data.map((jobDetail) => (
              <JobCard 
              key={jobDetail.id}
              id={jobDetail.id}
              image={{
                alt: jobDetail.orgName + " logo",
                url: jobDetail.logoUrl || "undefined"
              }}
              jobTitle={jobDetail.title}
              jobDescription={jobDetail.description}
              jobNature={jobDetail.opType == 'inPerson'? 'In Person' : "Remote"}
              categories={jobDetail.categories}
              organizationAddress={jobDetail.location}
              organizationName={jobDetail.orgName}
              />
            ))
          }
        </div>
      </main>
    </>
  );
}
