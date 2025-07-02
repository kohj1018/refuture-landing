'use client';

import { useState, useEffect } from 'react';

interface RetirementFormProps {
  onNext: (retirementAge: string, monthlyPension: string) => void;
  initialAge: string;
  initialPension: string;
  onAgeChange: (value: string) => void;
  onPensionChange: (value: string) => void;
}

const LIVING_OPTIONS: Array<{ label: string; value: number | 'custom' }> = [
  { label: '기본 생활비', value: 1200000 },
  { label: '평균 생활비', value: 2000000 },
  { label: '여유로운 생활비', value: 3500000 },
  { label: '직접 입력', value: 'custom' },
];

export default function RetirementForm({
  onNext,
  initialAge,
  initialPension,
  onAgeChange,
  onPensionChange,
}: RetirementFormProps) {
  // 은퇴 나이 슬라이더
  const [retirementAge, setRetirementAge] = useState(initialAge ? String(Number(initialAge)) : '65');
  // 생활비 옵션
  const [selectedOption, setSelectedOption] = useState<number | 'custom' | undefined>(undefined);
  // 직접 입력값
  const [customPension, setCustomPension] = useState(initialPension && isNaN(Number(initialPension)) ? initialPension : '');

  useEffect(() => {
    setRetirementAge(initialAge || '65');
  }, [initialAge]);

  useEffect(() => {
    if (initialPension) {
      const pensionNum = Number(initialPension);
      const found = LIVING_OPTIONS.find(opt => typeof opt.value === 'number' && opt.value === pensionNum);
      if (found) setSelectedOption(found.value as number);
      else if (initialPension !== '' && !isNaN(pensionNum)) {
        setSelectedOption('custom');
        setCustomPension(initialPension);
      }
    }
  }, [initialPension]);

  // 실제 전달할 연금값
  const monthlyPension: string = selectedOption === 'custom' ? customPension : String(selectedOption);

  // 유효성
  const ageNum = Number(retirementAge);
  const pensionNum = Number(monthlyPension);
  const isAgeValid = ageNum >= 55 && ageNum <= 80;
  const isPensionValid = pensionNum >= 100000 && pensionNum <= 10000000;
  const isAllValid = isAgeValid && isPensionValid;

  // 핸들러
  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementAge(e.target.value);
    onAgeChange(e.target.value);
  };
  const handleOption = (val: number | 'custom') => {
    setSelectedOption(val);
    if (val !== 'custom') {
      setCustomPension('');
      onPensionChange(String(val));
    }
  };
  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomPension(value);
    onPensionChange(value);
  };
  const handleNextClick = () => {
    if (isAllValid) onNext(retirementAge, String(monthlyPension));
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white text-black p-8">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-8 text-left">언제 은퇴해서,<br />어떻게 살고 싶으신가요?</h1>
        {/* 1. 은퇴 나이 */}
        <div className="mb-12">
          <div className="font-semibold mb-4 text-lg">1. 희망 연금 수령 나이</div>
          <div className="text-center my-4">
            <span className="text-blue-700 font-bold text-3xl">만 {retirementAge}세</span>
          </div>
          <input
            type="range"
            min={55}
            max={80}
            value={retirementAge}
            onChange={handleSlider}
            className="w-full accent-blue-500"
          />
          <div className="text-center text-base text-gray-500 mt-3">
            참고: 국민연금 수령은 만 65세부터 시작돼요.
          </div>
        </div>
        {/* 2. 원하는 한 달 생활비 */}
        <div className="mb-8">
          <div className="font-semibold mb-2 text-lg">2. 원하는 한 달 생활비</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {LIVING_OPTIONS.map(opt => (
              <button
                key={opt.label}
                type="button"
                className={`py-3 rounded-lg font-semibold border text-base transition-all ${selectedOption === opt.value ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-white text-gray-700 border-gray-200'} ${opt.value === 'custom' ? 'col-span-1' : ''}`}
                onClick={() => handleOption(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selectedOption === 'custom' && (
            <input
              type="number"
              inputMode="numeric"
              value={customPension}
              onChange={e => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                if (value !== '' && Number(value) > 10000000) value = '10000000';
                setCustomPension(value);
                onPensionChange(value);
              }}
              min={100000}
              max={10000000}
              className="w-full border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 py-3 mb-3 text-base"
              placeholder="직접 입력 (숫자만)"
            />
          )}
          {selectedOption && (
            <>
              <div className="text-sm text-gray-400">선택한 생활 수준</div>
              <div className="text-blue-700 font-bold text-2xl mt-2">월 {Number(monthlyPension).toLocaleString()}원</div>
            </>
          )}
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