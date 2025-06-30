"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [age, setAge] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  // 숫자만 입력되도록 처리
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAge(value);
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="flex-1 flex flex-col justify-start px-6 pt-12">
        <h1 className="text-2xl font-bold mb-2">퇴직 후,</h1>
        <h2 className="text-xl font-semibold mb-8">얼마 받고 싶으신가요?</h2>
        <div className="mb-4">
          <div className="flex items-center text-lg text-gray-500 mb-4">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              value={age}
              onChange={handleAgeChange}
              className="w-20 border-b-2 border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-black bg-transparent mr-2"
              placeholder="나이"
            />
            세에 은퇴해서
          </div>
          <div className="flex items-center text-lg text-gray-500">
            매달
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              value={amount}
              onChange={handleAmountChange}
              className="w-32 border-b-2 border-gray-300 text-center text-lg font-semibold focus:outline-none focus:border-black bg-transparent mx-2"
              placeholder="금액"
            />
            원 받고 싶어요
          </div>
        </div>
      </div>
      <div className="w-full py-2 bg-gray-800 fixed bottom-0 left-0 flex justify-center">
        <button
          className="w-full max-w-md text-lg font-semibold text-white py-3 rounded bg-gray-800 active:bg-gray-900 transition"
          onClick={() => router.push("/detail")}
        >
          다음
        </button>
      </div>
    </div>
  );
}