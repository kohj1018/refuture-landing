'use client';

import { useState, useEffect } from 'react';

interface MoreInfoFormProps {
  onBack: () => void;
  onSubmit: (currentAge: string, savedMoney: string) => void;
  initialCurrentAge: string;
  initialSavedMoney: string;
  onCurrentAgeChange: (value: string) => void;
  onSavedMoneyChange: (value: string) => void;
  retirementAge: string;
}

function formatMoney(num: number) {
  if (isNaN(num)) return '';
  if (num === 0) return '0원';
  const eok = Math.floor(num / 100000000);
  const man = Math.floor((num % 100000000) / 10000);
  if (eok > 0) {
    if (man > 0) {
      return `${eok}억 ${man.toLocaleString()}만원`;
    } else {
      return `${eok}억`;
    }
  } else {
    return `${man.toLocaleString()}만원`;
  }
}

const ASSET_RANGES: Array<{ id: 'range1' | 'range2' | 'range3' | 'custom', label: string, min?: number, max?: number, step?: number }> = [
  { id: 'range1', label: '~1천만원', min: 0, max: 9000000, step: 1000000 },
  { id: 'range2', label: '1천~1억원', min: 10000000, max: 99000000, step: 1000000 },
  { id: 'range3', label: '1억~5억원', min: 100000000, max: 499000000, step: 1000000 },
  { id: 'custom', label: '직접 입력' }
];

type AssetRangeId = typeof ASSET_RANGES[number]['id'];

export default function MoreInfoForm({
  onBack,
  onSubmit,
  initialCurrentAge,
  initialSavedMoney,
  onCurrentAgeChange,
  onSavedMoneyChange,
  retirementAge,
}: MoreInfoFormProps) {
  // 슬라이더 값
  const [currentAge, setCurrentAge] = useState(Number(initialCurrentAge) || 30);
  const [savedMoney, setSavedMoney] = useState(Number(initialSavedMoney) || 0);
  const [selectedRange, setSelectedRange] = useState<AssetRangeId>('range3');

  // 희망 연금 수령 나이에서 1을 뺀 값을 현재 나이의 최대값으로 사용
  const maxCurrentAge = Math.max(18, Number(retirementAge) - 1 || 80);

  useEffect(() => {
    // retirementAge가 바뀌었을 때 현재 나이가 max를 넘으면 max로 맞춤
    if (currentAge > maxCurrentAge) {
      setCurrentAge(maxCurrentAge);
      onCurrentAgeChange(String(maxCurrentAge));
    }
  }, [retirementAge]);

  useEffect(() => {
    setCurrentAge(Number(initialCurrentAge) || 30);
  }, [initialCurrentAge]);

  useEffect(() => {
    const value = Number(initialSavedMoney) || 0;
    setSavedMoney(value);
    
    // When savedMoney changes, automatically select the correct range button,
    // unless the user has explicitly chosen '직접 입력'.
    if (selectedRange === 'custom') {
      return;
    }
    
    if (value >= 500000000) {
        setSelectedRange('custom');
    } else if (value >= 100000000) {
        setSelectedRange('range3');
    } else if (value >= 10000000) {
        setSelectedRange('range2');
    } else {
        setSelectedRange('range1');
    }
  }, [initialSavedMoney]);

  const isAllValid = currentAge >= 18 && currentAge <= 80 && savedMoney >= 0;

  const handleAgeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCurrentAge(value);
    onCurrentAgeChange(String(value));
  };
  const handleMoneySlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSavedMoney(value);
    onSavedMoneyChange(String(value));
  };
  const handleCustomMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let numValue = Number(value);
    if (numValue > 10000000000) { // 100억
      numValue = 10000000000;
    }
    setSavedMoney(numValue);
    onSavedMoneyChange(String(numValue));
  };
  const handleRangeClick = (rangeId: AssetRangeId) => {
    setSelectedRange(rangeId);
    let newValue = 0;
    if (rangeId === 'range1') {
      newValue = 2000000;
    } else if (rangeId === 'range2') {
      newValue = 20000000;
    } else if (rangeId === 'range3') {
      newValue = 200000000;
    }
    setSavedMoney(newValue);
    onSavedMoneyChange(String(newValue));
  };
  const handleSubmitClick = () => {
    if (isAllValid) {
      onSubmit(String(currentAge), String(savedMoney));
    }
  };

  const currentSliderConfig = ASSET_RANGES.find(r => r.id === selectedRange);

  return (
    <div className="relative flex flex-col min-h-screen bg-white rounded-2xl shadow px-6 pt-20 pb-8">
      {/* 상단 뒤로가기 */}
      <button 
        onClick={onBack} 
        aria-label="뒤로가기"
        className="absolute top-6 left-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      {/* 안내문구 */}
      <div className="mb-10 text-left">
        <div className="font-bold text-2xl mb-2">거의 다 왔어요!</div>
        <div className="text-xl font-semibold leading-snug">
          <span className="text-blue-700">현재 상황</span>을 알려주시면<br />
          목표 달성을 분석해 드릴게요.
        </div>
      </div>
      {/* 1. 현재 나이 */}
      <div className="mb-10">
        <div className="font-semibold mb-3 text-lg">1. 현재 나이</div>
        <div className="text-center my-4">
          <span className="text-blue-700 font-bold text-3xl">만 {currentAge}세</span>
        </div>
        <input
          type="range"
          min={18}
          max={maxCurrentAge}
          value={currentAge}
          onChange={handleAgeSlider}
          className="w-full accent-blue-500"
        />
      </div>
      {/* 2. 현재 모은 자산 */}
      <div className="mb-10">
        <div className="font-semibold mb-3 text-lg">2. 현재 모은 자산</div>
        <div className="text-center my-4">
          <span className="text-blue-700 font-bold text-3xl">{formatMoney(savedMoney)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {ASSET_RANGES.map(range => (
            <button
              key={range.id}
              type="button"
              className={`py-2 rounded-lg font-semibold border text-base transition-all ${selectedRange === range.id ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-white text-gray-700 border-gray-200'}`}
              onClick={() => handleRangeClick(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        {selectedRange !== 'custom' && currentSliderConfig ? (
          <>
            <input
              type="range"
              min={currentSliderConfig.min}
              max={currentSliderConfig.max}
              step={currentSliderConfig.step}
              value={savedMoney}
              onChange={handleMoneySlider}
              className="w-full accent-blue-500"
            />
            <div className="text-center text-base text-gray-500 mt-3">슬라이더를 움직여 자산을 조절해보세요.</div>
          </>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            value={savedMoney > 0 ? savedMoney.toLocaleString() : ''}
            onChange={handleCustomMoneyChange}
            className="w-full border-b-2 border-gray-300 text-center outline-none focus:border-gray-500 py-3 text-xl"
            placeholder="직접 입력"
          />
        )}
      </div>
      {/* 하단 버튼 */}
      <button
        className="w-full bg-blue-700 text-white py-4 px-6 rounded-lg text-xl font-semibold mt-auto shadow-md disabled:bg-gray-400"
        onClick={handleSubmitClick}
        disabled={!isAllValid}
      >
        내 은퇴 계획 분석하기
      </button>
    </div>
  );
} 