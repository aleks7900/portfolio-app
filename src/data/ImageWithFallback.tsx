import React from "react";
import SafeImg from "./SafeImg.tsx";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    fallback: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
                                                                 fallback,
                                                                 src,
                                                                 alt,
                                                                 ...props
                                                             }) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; // предотвратить зацикливание
        e.currentTarget.src = fallback;
    };

    return <SafeImg src={src} alt={alt} onError={handleError} {...props} />;
};

export default ImageWithFallback;
