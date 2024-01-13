"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-4xl font-bold text-gray-800">500 Error</h1>
      <p className="text-lg text-gray-600 mt-4 mb-8">
        예상치 못한 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Button onClick={() => reset()}>다시 시도하기</Button>
    </div>
  );
}
