export const getImageUrl = (img) => {
    if (!img) return '';


    if (img.startsWith('http')) return img;


    const cleanPath = img.replace(/^\/?(public\/)?/, '');


    return `${import.meta.env.BASE_URL}${cleanPath}`;
};