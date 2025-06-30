"use client";

export default function Result() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-6 pb-8">
      {/* 상단 공유 */}
      <div className="flex justify-end items-center mb-2">
        <span className="text-sm text-gray-400 font-medium">공유</span>
      </div>
      {/* 타이틀 */}
      <h1 className="text-2xl font-bold leading-tight mb-2 mt-2">올해부터<br />모은 돈의 N%씩<br />더 저축해야 해요</h1>
      {/* 연도별 저축 리스트 */}
      <div className="bg-gray-50 rounded-2xl p-4 mt-6 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-base">2025년</span>
          <span className="text-blue-700 font-semibold text-base">+1천 104만원 저축</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400 text-base">2026년</span>
          <span className="font-semibold text-base">2천 91만원</span>
          <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-semibold">10%<span className="ml-0.5">↑</span></span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-base">2027년</span>
          <span className="font-semibold text-base">3천 944만원</span>
          <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-semibold">10%<span className="ml-0.5">↑</span></span>
        </div>
      </div>
      {/* 은퇴 전까지 */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative flex items-center mb-2">
          <span className="absolute -left-24 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full shadow">은퇴 1년 전까지</span>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-base">2064년</span>
            <span className="font-bold text-lg">3억 3천 900만원</span>
          </div>
        </div>
        <div className="h-2 w-1 bg-gray-300 rounded-full mt-2 mb-2" />
      </div>
      {/* 안내문구 및 알림버튼 */}
      <div className="mt-auto flex flex-col items-center">
        <p className="text-blue-700 text-sm font-semibold mb-2">자산 관리 제대로 시작하고 싶다면?</p>
        <button className="w-full max-w-md flex items-center justify-between bg-gray-100 rounded-full px-4 py-3 text-gray-500 font-semibold text-base">
          서비스 오픈 알림 받아보기
          <span className="ml-2 w-7 h-7 flex items-center justify-center bg-gray-800 text-white rounded-full">→</span>
        </button>
      </div>
    </div>
  );
} 