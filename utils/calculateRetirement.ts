export interface RetirementInputs {
  retirementAge: number; // 희망 은퇴 나이
  monthlyPension: number; // 매달 받고 싶은 연금
  currentAge: number; // 현재 나이
  savedMoney: number; // 현재 모은 돈
}

export interface CalculationResult {
  targetYear: number;
  targetAmount: string;
  annualSavings: {
    year: number;
    amount: string;
    increaseRate?: number;
  }[];
  nPercent: number;
}

// 실제 계산 로직은 여기에 구현합니다.
export const calculateRetirementPlan = (
  inputs: RetirementInputs
): Promise<CalculationResult> => {
  return new Promise(resolve => {
    // 임시 로딩 시간 (2초)
    setTimeout(() => {
      // 임시 결과 데이터 (실제 계산 로직으로 대체 필요)
      const currentYear = new Date().getFullYear();
      const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
      
      const tempAnnualSavings = [];
      if (yearsToRetirement > 0) {
        tempAnnualSavings.push({
            year: currentYear + 1,
            amount: "+1천 104만원 저축" // 예시
        });
      }
      if (yearsToRetirement > 1) {
        tempAnnualSavings.push({
            year: currentYear + 2,
            amount: "2천 91만원", // 예시
            increaseRate: 10 // 예시
        });
      }
      if (yearsToRetirement > 2) {
         tempAnnualSavings.push({
            year: currentYear + 3,
            amount: "3천 944만원", // 예시
            increaseRate: 10 // 예시
        });
      }

      resolve({
        targetYear: currentYear + yearsToRetirement,
        targetAmount: "3억 3천 900만원", // 예시
        annualSavings: tempAnnualSavings,
        nPercent: 5, // 예시
      });
    }, 2000);
  });
}; 