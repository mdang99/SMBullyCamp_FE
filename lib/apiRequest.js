// src/lib/apiRequest.js

export async function apiRequest(url, options = {}) {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Đã xảy ra lỗi');
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || 'Lỗi kết nối máy chủ');
    }
  }
  