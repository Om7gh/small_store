export default function AuthCodeError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-red-600">
            Authentication Error
          </h2>
          <p className="mt-2 text-gray-600">
            There was an error during authentication. Please try again.
          </p>
        </div>
        <a
          href="/auth/login"
          className="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}
