export default function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">마이 페이지</h1>
      <div className="space-y-4">
        {/* 여기에 사용자 프로필 정보를 표시할 수 있습니다 */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">프로필</h2>
          {/* 프로필 내용 */}
        </div>
        
        {/* 사용자의 활동 내역을 표시할 수 있습니다 */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">활동 내역</h2>
          {/* 활동 내역 내용 */}
        </div>
      </div>
    </div>
  );
}