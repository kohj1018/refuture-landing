export interface RetirementInputs {
  retirementAge: number; // 희망 은퇴 나이
  monthlyPension: number; // 매달 받고 싶은 연금
  currentAge: number; // 현재 나이
  savedMoney: number; // 현재 모은 돈
}

export interface ResultData {
  shortfallAmount: number;
  retirementAge: number;
  estimatedAmount: number;
  goalAmount: number;
  solutions: {
      investmentReturn: { from: number; to: number };
      monthlySaving: number;
      retirementAge: { from: number; to: number };
  };
  annualSavings: {
    year: number;
    amount: string;
    increaseRate?: number;
  }[];
}

// 실제 계산 로직은 여기에 구현합니다.
export const calculateRetirementPlan = (
  inputs: RetirementInputs
): Promise<ResultData> => {
  return new Promise(resolve => {
    // 임시 로딩 시간 (2초)
    setTimeout(() => {
      // ResultPage에서 사용하는 구조에 맞는 더미 데이터 반환
      resolve({
        shortfallAmount: 161000000,
        retirementAge: inputs.retirementAge,
        estimatedAmount: 339000000,
        goalAmount: 500000000,
        solutions: {
            investmentReturn: { from: 5, to: 7 },
            monthlySaving: 200000,
            retirementAge: { from: 65, to: 67 },
        },
        annualSavings: [
            { year: 2025, amount: "1,104만원" },
            { year: 2026, amount: "2,091만원", increaseRate: 10 },
            { year: 2027, amount: "3,944만원", increaseRate: 10 },
        ],
      });
    }, 2000);
  });
}; 