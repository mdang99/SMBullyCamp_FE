export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_pets_upload'); // phải đúng tên bạn đã tạo
  
    try {
      console.log('Uploading file:', file);
      const res = await fetch('https://api.cloudinary.com/v1_1/ddklmebqj/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      console.log('Cloudinary response:', data);
  
      if (!res.ok || !data.secure_url) {
        throw new Error(data.error?.message || 'Không lấy được secure_url');
      }
  
      return data.secure_url;
    } catch (err) {
      console.error('Lỗi upload ảnh:', err);
      return null;
    }
  };
  