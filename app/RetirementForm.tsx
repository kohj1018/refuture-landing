'use client';

import { useState, useEffect } from 'react';

interface RetirementFormProps {
  onNext: (retirementAge: string, monthlyPension: string) => void;
  initialAge: string;
  initialPension: string;
  onAgeChange: (value: string) => void;
  onPensionChange: (value: string) => void;
}

export default function RetirementForm({
  onNext,
  initialAge,
  initialPension,
  onAgeChange,
  onPensionChange,
}: RetirementFormProps) {
  const [retirementAge, setRetirementAge] = useState(initialAge);
  const [monthlyPension, setMonthlyPension] = useState(initialPension);

  // initial props가 변경될 때 state 업데이트 (페이지 뒤로가기 등으로 값이 유지되도록)
  useEffect(() => {
    setRetirementAge(initialAge);
  }, [initialAge]);

  useEffect(() => {
    setMonthlyPension(initialPension);
  }, [initialPension]);

  const ageNum = Number(retirementAge);
  const incomeNum = Number(monthlyPension);
  const isAgeValid = ageNum >= 55 && ageNum <= 100;
  const isIncomeValid = incomeNum >= 100000 && incomeNum <= 100000000;
  const isAllValid = retirementAge !== '' && monthlyPension !== '' && isAgeValid && isIncomeValid;

  let ageError = '';
  let incomeError = '';
  if (retirementAge && !isAgeValid) ageError = '55세 이상 100세 이하만 입력 가능합니다.';
  if (monthlyPension && !isIncomeValid) incomeError = '10만원 이상 1억원 이하만 입력 가능합니다.';

  const handleAgeChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setRetirementAge(value);
      onAgeChange(value); // 부모 컴포넌트로 값 전달
    }
  };
  const handleIncomeChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '' || Number(value) <= 100000000) {
      setMonthlyPension(value);
      onPensionChange(value); // 부모 컴포넌트로 값 전달
    }
  };

  const handleNextClick = () => {
    if (isAllValid) {
      onNext(retirementAge, monthlyPension);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white text-black p-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-10">
          퇴직 후,
          <br />
          얼마 받고 싶으신가요?
        </h1>
        <div className="mb-6">
          <div className="flex items-center text-xl mb-2">
            <input
              type="number"
              inputMode="numeric"
              value={retirementAge}
              onChange={handleAgeChangeLocal}
              min={55}
              max={100}
              className="w-20 border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 mr-2"
              placeholder="__"
            />
            세에 은퇴해서
          </div>
          {ageError && <div className="text-red-500 text-sm mb-2">{ageError}</div>}
          <div className="flex items-center text-xl mb-2">
            매 달
            <input
              type="number"
              inputMode="numeric"
              value={monthlyPension}
              onChange={handleIncomeChangeLocal}
              min={100000}
              max={100000000}
              className="w-32 border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 mx-2"
              placeholder="________"
            />
            원 받고 싶어요.
          </div>
          {incomeError && <div className="text-red-500 text-sm mb-2">{incomeError}</div>}
        </div>
      </div>
      <button
        className="w-full bg-gray-800 text-white py-4 px-6 rounded-lg text-lg font-semibold mb-4 disabled:bg-gray-400"
        onClick={handleNextClick}
        disabled={!isAllValid}
      >
        다음
      </button>
    </div>
  );
} 