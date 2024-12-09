const Home = () => {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <section className="space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            공유우산
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 카드 컴포넌트 예시 */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-2">우산 대여하기</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                필요한 우산을 쉽게 대여하세요
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;