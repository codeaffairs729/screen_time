// CustomImageLoader.js
import { ImageLoader } from 'next/image';

const customImageLoader: ImageLoader = ({ src, width, quality }) => {
    // Add your custom logic here to determine whether to allow the image URL.
    // For simplicity, you can return the src as is without any checks.
    return `${src}?w=${width}&q=${quality || 75}`;
};

export default customImageLoader;
