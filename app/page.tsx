import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 px-4 py-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
         NEXTJA AUTH SERVICE
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please sign in to continue
        </p>
        <div className="flex justify-center">
          <LoginButton  asChild>
            <Button className="w-full py-2 px-4  rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
