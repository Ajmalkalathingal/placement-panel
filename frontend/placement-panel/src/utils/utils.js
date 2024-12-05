export const getImageUrl = (imagePath) => {
    const baseUrl = "http://localhost:8000";
    return imagePath ? `${baseUrl}${imagePath}?t=${new Date().getTime()}` : '/path/to/default/image.jpg';
};


// export const redirectToLogin = () => {
//     window.location.href = '/login'; 
// };