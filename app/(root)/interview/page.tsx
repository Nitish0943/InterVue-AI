import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto p-6">
     
      {/* Generate Interview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Generate Your Interview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Click the call button below to start generating your personalized interview
          </p>
        </div>
        
        <Agent
          userName={user?.name!}
          userId={user?.id}
          type="generate"
        />
      </div>
    </div>
  );
};

export default Page;
