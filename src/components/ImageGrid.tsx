// components/ImageGrid.tsx

import React from 'react';
import Image from './Image';
import { ImageProps } from '@/lib/api';

interface ImageGridProps {
    images: ImageProps[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {images.map((image, index) => (
            <Image key={index} image={image} />
        ))}
    </div>
);

export default ImageGrid;
