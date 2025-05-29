export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Chào mừng đến với Trang trại Gia tộc</h1>
        <p className="text-lg mb-6">Khám phá cây phả hệ được trình bày rõ ràng, hiện đại, giúp bạn dễ dàng theo dõi dòng họ của mình.</p>
        <img
          src="/family-tree-example.png"
          alt="Cây phả hệ mẫu"
          className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
        />
        <p className="mt-6 text-sm text-gray-600">Liên hệ: 0123 456 789 | Email: info@trangtraigia.com</p>
      </div>
    </div>
  )
}
