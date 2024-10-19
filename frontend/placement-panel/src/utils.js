export const getImageUrl = (imagePath) => {
    const baseUrl = "http://localhost:8000"; 
    return imagePath ? `${baseUrl}${imagePath}` : '/path/to/default/image.jpg';
};