'use client'
import React, { useEffect, useState, useCallback } from 'react';
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageGrid from "@/components/ImageGrid";
import { fetchImages, ImageProps } from "@/lib/api";
import Loading from "@/components/Loading";

const fetchData = async (setImages: React.Dispatch<React.SetStateAction<ImageProps[]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const imageList = await fetchImages();
        setImages(imageList);
        setIsLoading(false);
    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        setIsLoading(false);
    }
};

export default function Home() {
    const [images, setImages] = useState<ImageProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchImagesData = useCallback(() => {
        fetchData(setImages, setIsLoading);
    }, []);

    useEffect(() => {
        fetchImagesData();
    }, [fetchImagesData]);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar name={'oi'} />

            <main>
                <div className="text-center py-10">
                    <h1 className="text-4xl font-bold mb-4">Bem vindo(a) MobilizeRent</h1>
                    <p className="text-lg text-gray-700">Descubra o veículo ideal para cada momento da jornada</p>
                </div>

                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-96">
                            <Loading />
                        </div>
                    ) : (
                        <ImageGrid images={images} />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
