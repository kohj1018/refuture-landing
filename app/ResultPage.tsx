'use client';

import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);

// Helper function to format money
function formatMoney(num: number): string {
    if (isNaN(num) || num === 0) return '0원';
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000);
    if (eok > 0) {
        return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억 원`;
    }
    return `${man.toLocaleString()}만원`;
}

// NEW Data Interface based on the image
// Note: Parent components should be updated to provide this data structure.
interface ResultData {
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

interface ResultPageProps {
  data: ResultData;
  onRestart: () => void;
}

// --- Chart Configurations ---
const oecdChartData = {
  labels: ['고령인구 고용률', '고령인구 빈곤율'],
  datasets: [
    {
      label: '한국',
      data: [34.9, 40.4],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1,
    },
    {
      label: 'OECD 평균',
      data: [15.0, 15.0],
      backgroundColor: 'rgba(156, 163, 175, 0.6)',
      borderColor: 'rgba(156, 163, 175, 1)',
      borderWidth: 1,
    },
  ],
};

const oecdChartOptions: any = {
  plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: (c: any) => `${c.dataset.label}: ${c.raw}%` } } },
  scales: { y: { beginAtZero: true, ticks: { callback: (v: any) => v + '%' } } },
};

const pensionChartData = {
  labels: ['40만원 미만', '40~100만원', '200만원 이상'],
  datasets: [
    {
      label: '국민연금 수령자 비율',
      data: [47.8, 38.7, 0.58],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1,
    },
  ],
};

const pensionChartOptions: any = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (c: any) => `${c.label}: ${c.raw}%` } },
    datalabels: {
      anchor: 'end',
      align: 'end',
      color: '#1f2937',
      font: { weight: 'bold' },
      formatter: (value: any) => value + '%',
    },
  },
  scales: {
    x: { beginAtZero: true, ticks: { callback: (v: any) => v + '%' } },
    y: { grid: { display: false } },
  },
};

export default function ResultPage({ data, onRestart }: ResultPageProps) {
    const [isClient, setIsClient] = useState(false);
    const [animatedWordIndex, setAnimatedWordIndex] = useState(0);

    const animatedWords = ["자산 관리", "노후 준비", "결혼 준비", "목돈 마련", "내집 마련"];

    useEffect(() => {
        setIsClient(true);

        const interval = setInterval(() => {
            setAnimatedWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
        }, 2000); // Change word every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const progressPercentage = data.goalAmount > 0 ? Math.round((data.estimatedAmount / data.goalAmount) * 100) : 0;

    const doughnutData = {
        labels: ['달성', '미달성'],
        datasets: [
            {
                data: [progressPercentage, 100 - progressPercentage],
                backgroundColor: ['#4f46e5', '#f3f4f6'],
                borderColor: ['#f3f4f6'],
                borderWidth: 0,
                circumference: 360,
                cutout: '80%',
            },
        ],
    };

    const doughnutOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
                display: false, // 전체 데이터 레이블 숨기기
            }
        },
    };

    // Format shortfall amount to not show '원' at the end for layout purposes
    const formattedShortfall = formatMoney(data.shortfallAmount).replace(' 원', '');

    return (
        <div className="w-full max-w-sm mx-auto bg-white min-h-screen font-sans">
            <header className="p-4 flex justify-between items-center">
                <button onClick={onRestart} className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="text-gray-600 font-semibold">공유</button>
            </header>

            <main>
                <div className="p-5">
                    {/* 1. 핵심 결론 카드 */}
                    <div className="text-center py-4">
                        <p className="font-semibold text-indigo-600 text-base">원하는 노후 생활을 위해</p>
                        <h1 className="text-3xl font-bold text-gray-900 mt-3">
                            매달 {formattedShortfall}
                        </h1>
                        <h1 className="text-3xl font-bold text-gray-900 mt-1">
                            더 모아야 해요
                        </h1>
                    </div>

                    <div className="relative w-56 h-56 mx-auto my-8">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                            <span className="text-5xl font-bold text-indigo-600">{progressPercentage}%</span>
                            <span className="text-lg text-gray-500 mt-1">달성</span>
                        </div>
                    </div>

                    <div className="max-w-xs mx-auto space-y-4 py-4">
                        <div className="flex justify-between items-baseline">
                            <span className="text-gray-600 text-base">현재 금액</span>
                            <span className="font-bold text-lg text-indigo-600">{formatMoney(data.estimatedAmount)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-gray-600 text-base">목표 금액</span>
                            <span className="font-bold text-lg text-indigo-600">{formatMoney(data.goalAmount)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 h-3"></div>

                <div className="p-5">
                    {/* Static Content Sections */}
                    {isClient && (
                        <>
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800">전체 인생을 놓고 보면,<br />돈을 버는 기간보다 쓰는 기간이 더 길어요.</h2>
                                <div className="mt-5 bg-gray-50 rounded-lg p-5">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-sm font-bold text-gray-700">일하는 기간</p>
                                                <p className="text-sm font-medium text-gray-500">약 30년</p>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div className="bg-indigo-400 h-4 rounded-full" style={{width: '60%'}}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-sm font-bold text-gray-700">은퇴 후 기간</p>
                                                <p className="text-sm font-medium text-gray-500">약 40년</p>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div className="bg-red-400 h-4 rounded-full" style={{width: '80%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                                    평균 정년(50세)과 기대수명(90세)을 기준으로, 우리는 약 30년간 번 돈으로 40년 이상의 노후를 살아가야 합니다.
                                </p>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800">그래서 가능한 빨리<br />노후 준비를 시작해야 해요.</h2>
                                <div className="mt-5 bg-gray-50 rounded-lg p-5">
                                    <p className="font-semibold text-center text-gray-800">고령인구 빈곤율 1위인 한국</p>
                                    <Bar options={oecdChartOptions} data={oecdChartData} />
                                    <p className="text-gray-600 mt-3 text-sm leading-relaxed text-center">
                                        한국은 OECD 국가 중 노인 고용률 1위지만, 빈곤율 또한 압도적인 1위입니다.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 text-right">출처: 통계청</p>
                                </div>
                                <div className="mt-5 bg-gray-50 rounded-lg p-5">
                                    <p className="font-semibold text-center text-gray-800">생활비로 부족한 국민연금</p>
                                    <p className="text-sm text-center text-gray-500 mt-1">전국민 국민연금 월 수령액 분포</p>
                                    <Bar options={pensionChartOptions} data={pensionChartData} plugins={[ChartDataLabels]} />
                                     <p className="text-gray-600 mt-4 leading-relaxed text-center">
                                        국민연금, 생각보다 적습니다.<br />적정 생활비보다 <span className="font-bold text-red-500">월 100~200만원</span>이 부족합니다. 지금 준비하지 않으면, 길어진 노후는 축복이 아닐 수 있습니다.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 text-right">출처: 국민연금관리공단 (2024)</p>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800">하지만 걱정하지 마세요.<br />아직 늦지 않았습니다.</h2>
                                <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg">
                                    <p className="font-bold text-lg text-indigo-700">우리에게는 '복리의 마법'이 있어요.</p>
                                    <p className="text-gray-700 mt-3 leading-relaxed">지금 당장 큰돈이 없어도 괜찮습니다. 하루라도 더 빨리 조금씩 투자를 시작하는 것이, 10년 뒤 더 많은 돈을 투자하는 것보다 훨씬 더 강력한 힘을 발휘합니다.</p>
                                    <div className="mt-5 border-t border-indigo-200 pt-4">
                                        <p className="text-gray-700 leading-relaxed">하지만 ISA, 연금저축, IRP... 이름만 들어도 머리 아프죠? 어렵고 귀찮아서 예적금만 쌓아두고 있지 않으신가요?</p>
                                        <p className="font-bold text-gray-800 mt-2">Refuture가 세제 혜택까지 모두 고려하여 당신에게 꼭 맞는 인생 계획을 세워드릴게요.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-10">
                                <h2 className="text-xl font-bold text-gray-800">다음에 해당하면 집중하세요!</h2>
                                <div className="mt-4 space-y-3">
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <p className="font-semibold text-gray-800">1. 은퇴 시점에 원하는 연금이 준비되지 않을 것 같은 불안감</p>
                                        <p className="text-gray-600 text-sm mt-1">"70세에는 은퇴할 수 있을까? 지금처럼 저축하면 평생 일해야 할지도 모른다."</p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <p className="font-semibold text-gray-800">2. 투자할 곳을 찾지 못해 돈이 단순 예금에 묶여 있음</p>
                                        <p className="text-gray-600 text-sm mt-1">"통장에 쌓여 있는 돈, 그냥 두면 매년 가치가 떨어진다. 하지만 어렵고 귀찮아서 예적금만 하고 있다."</p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <p className="font-semibold text-gray-800">3. 사회 초년생이지만 노후 준비를 시작하지 못함</p>
                                        <p className="text-gray-600 text-sm mt-1">"노후 준비를 시작해야 하는 건 알지만, 어디서부터 어떻게 시작해야 할지 막막하다."</p>
                                    </div>
                                </div>
                            </div> */}

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-800">Refuture가 당신에게 꼭 맞는 장기 플랜을 세워 든든한 노후 계획을 도와드릴게요</h2>
                                <div className="space-y-4 mt-6">
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <h3 className="font-bold text-lg text-indigo-600">1. AI 금융 집사를 통한 습관 형성</h3>
                                        <p className="text-gray-600 mt-2">월급날, AI가 소비 패턴과 미래 계획을 분석해 저축액을 먼저 떼고 '이번 달에 써도 되는 돈'만 알려줘요. 더 이상 소비를 통제하려 애쓰지 않아도, 저축은 저절로 습관이 됩니다.</p>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <h3 className="font-bold text-lg text-indigo-600">2. 목표에 맞춘 자동 투자</h3>
                                        <p className="text-gray-600 mt-2">결혼, 내 집 마련, 은퇴 등 당신의 인생 목표에 맞춰 AI가 최적의 포트폴리오를 짜고 알아서 합니다. 어렵고 귀찮은 일은 Refuture에 맡기세요.</p>
                                    </div>
                                     <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <h3 className="font-bold text-lg text-indigo-600">3. 살아있는 계획으로 최적화</h3>
                                        <p className="text-gray-600 mt-2">연봉이 오르거나 시장이 변하면 AI가 먼저 알려주고 더 유리한 플랜을 제안해요. 당신의 계획은 한번으로 끝나는 게 아니라, 인생과 함께 성장합니다.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center pb-10">
                                <a href="#" className="text-blue-600 hover:underline font-semibold mb-4 inline-block h-14">
                                    <span key={animatedWordIndex} className="inline-block animate-[fade-in-down_0.5s_ease-out]">
                                        {animatedWords[animatedWordIndex]}
                                    </span>
                                    , Refuture와 함께 시작해보세요!<br/>이메일을 남기면, 가장 먼저 받아볼 수 있어요.
                                </a>
                                <div className="flex items-center bg-white p-2 rounded-xl shadow-md">
                                    <input 
                                        type="email" 
                                        placeholder="서비스 오픈 알림 받아보기" 
                                        className="flex-grow p-3 text-gray-700 outline-none rounded-l-md"
                                    />
                                    <button className="bg-gray-800 text-white p-3 rounded-r-xl hover:bg-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
} 