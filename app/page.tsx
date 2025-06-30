'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import RetirementForm from "./RetirementForm";
import MoreInfoForm from "./MoreInfoForm";
import LoadingSpinner from "./LoadingSpinner";
import ResultPage from "./ResultPage";
import { calculateRetirementPlan, RetirementInputs, CalculationResult } from '../utils/calculateRetirement';

// 입력 데이터 타입 정의 (초기값 설정용)
interface FormData {
  retirementAge: string;
  monthlyPension: string;
  currentAge: string;
  savedMoney: string;
}

export default function Home() {
  const [step, setStep] = useState<'main' | 'retirement' | 'moreinfo' | 'loading' | 'result'>('main');
  const [formData, setFormData] = useState<FormData>({
    retirementAge: '',
    monthlyPension: '',
    currentAge: '',
    savedMoney: '',
  });
  const [resultData, setResultData] = useState<CalculationResult | null>(null);

  const handleInputChange = (formName: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [formName]: value }));
  };

  const handleShowRetirementForm = () => setStep('retirement');
  
  const handleGoToMoreInfo = (retirementAge: string, monthlyPension: string) => {
    setFormData(prev => ({ ...prev, retirementAge, monthlyPension }));
    setStep('moreinfo');
  };

  const handleGoToRetirementForm = () => setStep('retirement'); // MoreInfoForm에서 뒤로가기

  const handleSubmitAndShowLoading = async (currentAge: string, savedMoney: string) => {
    const finalData: RetirementInputs = {
      retirementAge: Number(formData.retirementAge),
      monthlyPension: Number(formData.monthlyPension),
      currentAge: Number(currentAge),
      savedMoney: Number(savedMoney),
    };
    setFormData(prev => ({ ...prev, currentAge, savedMoney }));
    setStep('loading');
    
    try {
      const result = await calculateRetirementPlan(finalData);
      setResultData(result);
      setStep('result');
    } catch (error) {
      console.error("계산 중 오류 발생:", error);
      // TODO: 에러 처리 UI 추가 (예: 에러 페이지로 이동 또는 알림)
      setStep('main'); // 오류 시 메인으로 이동 (임시)
    }
  };
  
  const handleRestart = () => {
    setFormData({ retirementAge: '', monthlyPension: '', currentAge: '', savedMoney: '' });
    setResultData(null);
    setStep('main');
  };

  if (step === 'loading') {
    return <LoadingSpinner />;
  }
  if (step === 'result' && resultData) {
    return <ResultPage data={resultData} onRestart={handleRestart} />;
  }
  if (step === 'retirement') {
    return <RetirementForm 
      onNext={handleGoToMoreInfo} 
      initialAge={formData.retirementAge}
      initialPension={formData.monthlyPension}
      onAgeChange={(val) => handleInputChange('retirementAge', val)}
      onPensionChange={(val) => handleInputChange('monthlyPension', val)}
    />;
  }
  if (step === 'moreinfo') {
    return <MoreInfoForm 
      onBack={handleGoToRetirementForm} 
      onSubmit={handleSubmitAndShowLoading} 
      initialCurrentAge={formData.currentAge}
      initialSavedMoney={formData.savedMoney}
      onCurrentAgeChange={(val) => handleInputChange('currentAge', val)}
      onSavedMoneyChange={(val) => handleInputChange('savedMoney', val)}
    />;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white text-black p-8">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8">
          퇴직 전까지
          <br />
          얼마 모아야 할까?
        </h1>
        <Image
          src="/moneyImg.svg"
          alt="퇴직 자금 고민 이미지"
          width={200}
          height={200}
          className="mb-12"
        />
      </div>
      <button
        onClick={handleShowRetirementForm}
        className="w-full max-w-md bg-gray-800 text-white py-4 px-6 rounded-lg text-lg font-semibold flex items-center justify-center"
      >
        지금 알아보기
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}