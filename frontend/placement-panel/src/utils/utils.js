export const getImageUrl = (imagePath) => {
    const baseUrl = "http://localhost:8000"; 
    return imagePath ? `${baseUrl}${imagePath}` : '/path/to/default/image.jpg';
};


export const redirectToLogin = () => {
    window.location.href = '/login'; // Fallback if you aren't using React Router or if the interceptor is outside a component
};