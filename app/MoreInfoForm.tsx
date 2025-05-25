'use client';

import { useState, useEffect } from 'react';

interface MoreInfoFormProps {
  onBack: () => void;
  onSubmit: (currentAge: string, savedMoney: string) => void;
  initialCurrentAge: string;
  initialSavedMoney: string;
  onCurrentAgeChange: (value: string) => void;
  onSavedMoneyChange: (value: string) => void;
}

export default function MoreInfoForm({
  onBack,
  onSubmit,
  initialCurrentAge,
  initialSavedMoney,
  onCurrentAgeChange,
  onSavedMoneyChange,
}: MoreInfoFormProps) {
  const [currentAge, setCurrentAge] = useState(initialCurrentAge);
  const [savedMoney, setSavedMoney] = useState(initialSavedMoney);

  useEffect(() => {
    setCurrentAge(initialCurrentAge);
  }, [initialCurrentAge]);

  useEffect(() => {
    setSavedMoney(initialSavedMoney);
  }, [initialSavedMoney]);

  const isCurrentAgeValid = currentAge !== '';
  const isSavedMoneyValid = savedMoney !== '';
  const isAllValid = isCurrentAgeValid && isSavedMoneyValid;

  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCurrentAge(value);
    onCurrentAgeChange(value);
  };

  const handleSavedMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSavedMoney(value);
    onSavedMoneyChange(value);
  };
  
  const handleSubmitClick = () => {
    if (isAllValid) {
      onSubmit(currentAge, savedMoney);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white text-black p-8">
      <div className="flex-grow">
        <button className="text-2xl mb-8" onClick={onBack}>
          &lt;
        </button>
        <h1 className="text-2xl font-bold mb-6 text-left">
          좋은 목표예요!<br />더 자세한 정보를 알려주세요
        </h1>
        <div className="mb-6">
          <div className="flex items-center text-xl mb-4">
            현재 나이
            <input
              type="number"
              inputMode="numeric"
              value={currentAge}
              onChange={handleCurrentAgeChange}
              className="w-20 border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 mx-2"
              placeholder="__"
            />
            세,
          </div>
          <div className="flex items-center text-xl">
            돈은
            <input
              type="number"
              inputMode="numeric"
              value={savedMoney}
              onChange={handleSavedMoneyChange}
              className="w-32 border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 mx-2"
              placeholder="________"
            />
            원 모았어요.
          </div>
        </div>
      </div>
      <button
        className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg text-lg font-semibold mb-4 disabled:bg-gray-400"
        onClick={handleSubmitClick}
        disabled={!isAllValid}
      >
        결과 보기
      </button>
    </div>
  );
} 