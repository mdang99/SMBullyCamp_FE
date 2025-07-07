// your-nextjs-project/middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const adminPageUrl = new URL('/admin', request.url);
  const signInPageUrl = new URL('/signin', request.url);
  // Đảm bảo NEXT_PUBLIC_API_URL trỏ đúng tới Backend
  const verifyTokenApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-token`;

  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const token = request.cookies.get('token')?.value;
      if (!token) {
        console.log('Middleware: No token found, redirecting to signin.');
        return NextResponse.redirect(signInPageUrl);
      }

      const apiResponse = await fetch(verifyTokenApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Gửi token từ cookie của request Next.js
          'Content-Type': 'application/json',
        },
        // Không cần credentials: 'include' ở đây vì đây là server-side fetch từ middleware
        // và token đã được lấy ra từ request.cookies
      });
      if (!apiResponse.ok) {
        console.error('Middleware: API token verification failed, status:', apiResponse.status);
        // Log chi tiết hơn nếu có lỗi
        // const errorText = await apiResponse.text();
        // console.error('API Error Response:', errorText);
        return NextResponse.redirect(signInPageUrl);
      }

      const data = await apiResponse.json();
      if (data.user && data.user.role === 'admin') {
        console.log('Middleware: User is admin, allowing access.');
        return NextResponse.next();
      } else {
        console.warn('Middleware: User is authenticated but not an admin, redirecting.');
        return NextResponse.redirect(signInPageUrl);
      }

    } catch (error) {
      console.error('Middleware: Error during token verification:', error);
      return NextResponse.redirect(signInPageUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Chỉ bảo vệ các route bắt đầu bằng /admin
};