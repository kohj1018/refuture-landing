"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Detail() {
  const [currentAge, setCurrentAge] = useState("");
  const [savedMoney, setSavedMoney] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCurrentAge(value);
  };
  const handleSavedMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSavedMoney(value);
  };

  const handleResultClick = () => {
    setIsLoading(true);
    const delay = 3000 + Math.floor(Math.random() * 2000); // 3~5초 랜덤
    setTimeout(() => {
      setIsLoading(false);
      router.push("/result");
    }, delay);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="mb-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />
        </div>
        <div className="text-lg font-medium text-black">결과 분석 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="flex-1 flex flex-col justify-start px-6 pt-6">
        {/* 상단 뒤로가기 */}
        <button
          className="mb-6 w-8 h-8 flex items-center justify-center text-2xl text-gray-700"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          &#60;
        </button>
        <h1 className="text-2xl font-bold mb-1">좋은 목표예요!</h1>
        <h2 className="text-xl font-semibold mb-8">더 자세한 정보를 알려주세요</h2>
        <div className="mb-4">
          <div className="flex items-center text-lg text-gray-500 mb-4">
            현재 나이
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              value={currentAge}
              onChange={handleCurrentAgeChange}
              className="w-20 border-b-2 border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-black bg-transparent mx-2"
              placeholder="나이"
            />
            세,
          </div>
          <div className="flex items-center text-lg text-gray-500">
            돈은
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={12}
              value={savedMoney}
              onChange={handleSavedMoneyChange}
              className="w-32 border-b-2 border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-black bg-transparent mx-2"
              placeholder="금액"
            />
            원 모았어요.
          </div>
        </div>
      </div>
      <div className="w-full py-2 bg-gray-800 fixed bottom-0 left-0 flex justify-center">
        <button
          className="w-full max-w-md text-lg font-semibold text-white py-3 rounded bg-gray-800 active:bg-gray-900 transition"
          onClick={handleResultClick}
        >
          결과 보기
        </button>
      </div>
    </div>
  );
} 