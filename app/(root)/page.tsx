import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { dummyInterviews }  from "@/constants/index";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="card-cta flex flex-col md:flex-row items-center justify-between bg-card dark:bg-gradient-to-r dark:from-[#171532] dark:to-[#08090D] rounded-2xl shadow-lg p-8 md:p-12 gap-8 mb-10">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            Get Interview-Ready with <span className="text-blue-600 dark:text-blue-300">AI-Powered</span> Practice & Feedback
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Practice real interview questions & get instant feedback</p>

          <Button asChild className="btn-primary max-sm:w-full text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <div className="hidden md:block">
          <Image
            src="/robot.png"
            alt="robo-dude"
            width={350}
            height={350}
            className="rounded-full shadow-xl border-4 border-blue-200 dark:border-blue-900"
          />
        </div>
      </section>

      {/* Your Interviews Section */}
      <section className="flex flex-col gap-4 mt-8">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Interviews</h2>
          <span className="h-1 w-16 bg-blue-200 dark:bg-blue-900 rounded-full" />
        </div>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <div key={interview.id} className="bg-white dark:bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            dummyInterviews?.map((interview) => (
              <div key={interview.id} className="bg-white dark:bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Take Interviews Section */}
      <section className="flex flex-col gap-4 mt-12">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Take Interviews</h2>
          <span className="h-1 w-16 bg-blue-200 dark:bg-blue-900 rounded-full" />
        </div>
        <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <div key={interview.id} className="bg-white dark:bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          ) : (
            dummyInterviews?.map((interview) => (
              <div key={interview.id} className="bg-white dark:bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
                <InterviewCard
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
