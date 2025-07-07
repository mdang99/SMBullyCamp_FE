// lib/apiClient.js
export async function apiClient(path, options = {}) {
    const API = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      const res = await fetch(`${API}${path}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        ...options,
      });
  
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const data = isJson ? await res.json() : null;
  
      if (!res.ok) {
        const message = data?.message || res.statusText || 'Có lỗi xảy ra';
        const error = new Error(message);
        error.data = data;
        throw error;
      }
  
      return data;
    } catch (err) {
      // Không push noti ở đây nữa
      throw err;
    }
  }
  