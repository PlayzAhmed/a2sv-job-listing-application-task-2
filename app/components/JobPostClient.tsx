"use client";
import Link from "next/link";
import { Category2Color } from "../components/JobCard";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowLeft,
  faCrosshairs,
  faFire,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";
import { notFound } from "next/navigation";
import { useGetJobByIdQuery } from "@/lib/features/jobList/jobListApi";
import Loading from "../components/Loading";

type JobPostClientProps = {
  id: string;
};

const JobPostClient = ({ id }: JobPostClientProps) => {
  console.log(id);
  const { data, isLoading, isError } = useGetJobByIdQuery(id);

  if (isLoading) {
    return Loading();
  }

  if (isError) {
    notFound();
  }

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "undefined";

    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="m-8">
        <Link href="/">
          <FontAwesomeIcon
            className="text-xl text-blue-950 hover:scale-125 transition ease-in-out mb-4"
            icon={faArrowLeft}
          />
        </Link>
        <main className="flex flex-row gap-20 justify-between items-center">
          <section className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                {data?.data.title}
              </h1>
              <p className="text-lg text-gray-500">{data?.data.orgName}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">Description</h1>
              <p>{data?.data.description}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                Responsibilities
              </h1>
              <ul>
                {data?.data.responsibilities
                  ?.split("\n")
                  .map((responsibility) => (
                    <li className="flex flex-row gap-1">
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-400"
                        />
                      </div>
                      <p>{responsibility}</p>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                Requirements
              </h1>
              <p>{data?.data.requirements}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                Ideal Candidate we want
              </h1>
              <p>{data?.data.idealCandidate}</p>
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-950">
                When & Where
              </h1>
              <div className="flex flex-row items-center gap-2">
                <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                  <FontAwesomeIcon
                    className="text-sky-300"
                    icon={faLocationDot}
                  />
                </div>
                <p>{data?.data.whenAndWhere}</p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-5 w-2xl">
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-3">About</h1>
              <ul>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCrosshairs}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Posted On</h2>
                    <p className="font-medium">
                      {formatDate(data?.data.datePosted)}
                    </p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon className="text-sky-300" icon={faFire} />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Deadline</h2>
                    <p className="font-medium">
                      {formatDate(data?.data.deadline)}
                    </p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faLocationDot}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Work location</h2>
                    <p className="font-medium">
                      {data?.data.opType == "inPerson"
                        ? data?.data.location?.join(", ")
                        : "Remote"}
                    </p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCalendar}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">Start Date</h2>
                    <p className="font-medium">
                      {formatDate(data?.data.startDate)}
                    </p>
                  </div>
                </li>
                <li className="flex flex-row gap-2 items-center">
                  <div className="w-8 h-8 border rounded-full flex justify-center items-center border-gray-300">
                    <FontAwesomeIcon
                      className="text-sky-300"
                      icon={faCalendarCheck}
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-500">End Date</h2>
                    <p className="font-medium">
                      {formatDate(data?.data.endDate)}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <hr className="text-gray-300"></hr>
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-2">
                Categories
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                {data?.data.categories?.map((category) => (
                  <span
                    key={category}
                    className={
                      "min-w-16 border rounded-full text-center p-2 " +
                      Category2Color.get(category)
                    }
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <hr className="text-gray-300"></hr>
            <div>
              <h1 className="text-2xl font-black text-blue-950 mb-2">
                Required Skills
              </h1>
              <div className="flex flex-row flex-wrap gap-2">
                {data?.data.requiredSkills?.map((skill) => (
                  <div key={skill} className="py-1 px-3 bg-violet-50">
                    <span className="text-violet-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default JobPostClient;
