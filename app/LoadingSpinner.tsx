'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-lg text-gray-700">결과 분석 중...</p>
    </div>
  );
} 