'use client';

interface ResultData {
  // 예시 데이터 구조입니다. 실제 계산 결과에 맞게 수정 필요
  targetYear: number;
  targetAmount: string;
  annualSavings: {
    year: number;
    amount: string;
    increaseRate?: number;
  }[];
  nPercent: number; // 올해부터 모은 돈의 N%씩 더 저축
}

interface ResultPageProps {
  data: ResultData;
  onRestart: () => void; // 처음으로 돌아가는 함수
}

export default function ResultPage({ data, onRestart }: ResultPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black p-6">
      <header className="flex justify-end mb-6">
        <button 
          onClick={onRestart} // 임시로 onRestart 연결, 실제로는 공유 기능 구현 필요
          className="text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          공유
        </button>
      </header>

      <main className="flex-grow">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">
          올해부터
        </h1>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          모은 돈의 {data.nPercent}%씩<br/>더 저축해야 해요
        </h1>

        <div className="bg-white rounded-lg shadow p-1 mb-6">
          {data.annualSavings.map((saving, index) => (
            <div 
              key={saving.year} 
              className={`flex justify-between items-center p-4 ${index < data.annualSavings.length -1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-gray-600 text-lg">{saving.year}년</span>
              <div className="text-right">
                <span className="text-gray-800 font-semibold text-lg">{saving.amount}</span>
                {saving.increaseRate && (
                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                    {saving.increaseRate}% ↑
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* 점선 구분자 (임시) */}
        <div className="flex justify-center items-center my-4">
            <span className="text-gray-400 text-2xl">...</span>
        </div>

        <div className="bg-white rounded-lg shadow p-1 mb-8">
            <div className="flex justify-between items-center p-4">
                <div>
                    <span className="text-xs text-gray-500 block">은퇴 {new Date().getFullYear() === data.targetYear -1 ? '1년 전까지' : data.targetYear + '년까지'}</span> 
                    <span className="text-gray-600 text-lg">{data.targetYear}년</span>
                </div>
                 <span className="text-gray-800 font-semibold text-lg">{data.targetAmount}</span>
            </div>
        </div>

        <div className="text-center">
          <a href="#" className="text-blue-600 hover:underline font-medium mb-4 inline-block">
            자산 관리 제대로 시작하고 싶다면?
          </a>
          <div className="flex items-center bg-white p-2 rounded-lg shadow">
            <input 
              type="email" 
              placeholder="서비스 오픈 알림 받아보기" 
              className="flex-grow p-3 text-gray-700 outline-none rounded-l-md"
            />
            <button className="bg-gray-800 text-white p-3 rounded-r-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 