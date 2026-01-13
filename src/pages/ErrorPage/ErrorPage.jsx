import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  errorCode = "404",
  title = "Something went wrong",
  message = "Please try again later.",
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-black mb-4 animate-pulse">
            {errorCode}
          </h1>
          <div className="h-1 w-32 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoHome} className=" w-48 py-6">
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={handleGoBack}
            className=" w-40 py-6"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
