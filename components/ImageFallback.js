import React, { useState } from 'react';
import { Image } from 'react-native';

export default function ImageFallback({ source, fallbackSource, style, resizeMode }) {
    const [hasError, setHasError] = useState(false);
    return (
        <Image 
            source={hasError ? fallbackSource : source}
            onError={() => setHasError(true)}
            style={style}
            resizeMode={resizeMode}
        />
    );
}