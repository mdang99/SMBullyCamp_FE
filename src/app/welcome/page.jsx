"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import UserHeader from "../../../components/ui/UserHeader";

export default function WelcomePage() {
  return (
    <>
      <UserHeader />

      <main
        className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('/img/bg-1024.png')`,
          backgroundPosition: "center center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#1C1105",
        }}
      >
        {/* Overlay nhẹ để không che logo */}
        <div className="absolute inset-0 bg-black/5 z-0" />

        {/* Nội dung */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
          <div className="bg-black/40 rounded-xl p-6 md:p-10 max-w-2xl shadow-xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400">
              Chào mừng đến với{" "}
              <span className="text-brown-300">SM Bully Camp</span>
            </h1>

            <p className="text-sm text-gray-300">
              📞 Liên hệ:{" "}
              <span className="font-semibold text-white">0123 456 789</span> |
              📧{" "}
              <a
                href="mailto:info@trangtraigia.com"
                className="underline hover:text-yellow-400"
              >
                info@trangtraigia.com
              </a>
            </p>

            {/* Nút CTA */}
            <Link
              href="/familytree"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-full mt-3 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 transform duration-200"
            >
              <PawPrint size={20} className="text-black" />
              Khám phá trang trại của chúng tôi
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
