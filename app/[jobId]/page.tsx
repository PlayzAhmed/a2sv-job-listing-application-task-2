import JobPostClient from "../components/JobPostClient"

export default async function JobPost({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  return <JobPostClient id={jobId}/>
}