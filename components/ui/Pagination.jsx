export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const generatePages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
              ${
                currentPage === i
                  ? "bg-gradient-to-r from-[#a97458] to-[#6d4c41] text-white shadow-md"
                  : "bg-[#f1e5dc] text-[#5d4037] hover:bg-[#e7d9ce]"
              }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm rounded-full bg-[#f1e5dc] text-[#5d4037] hover:bg-[#e7d9ce] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Trước
      </button>

      {generatePages()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm rounded-full bg-[#f1e5dc] text-[#5d4037] hover:bg-[#e7d9ce] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sau →
      </button>
    </div>
  );
}
