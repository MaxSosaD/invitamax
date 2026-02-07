import { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Check, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const PhotoSafari = ({ onPhotoUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setSelectedImage(objectUrl);
            processImage(objectUrl);
        }
    };

    const processImage = async (imageSrc) => {
        setIsProcessing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Helper to load and decode images
        const loadImage = async (src) => {
            const img = new Image();
            img.src = src;
            try {
                if (img.decode) await img.decode();
                else {
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                }
            } catch (e) {
                console.warn('Decode failed, falling back to onload', e);
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.src = src; // Re-trigger
                });
            }
            return img;
        };

        try {
            // Load both images simultaneously
            const [userImg, frameImg] = await Promise.all([
                loadImage(imageSrc),
                loadImage('/dino_frame.png')
            ]);

            // Set canvas size
            canvas.width = 1080;
            canvas.height = 1080;

            // Clear with a base color (earthy)
            ctx.fillStyle = '#F5E6D3';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Draw user image (centered and cropped)
            const scale = Math.max(canvas.width / userImg.width, canvas.height / userImg.height);
            const x = (canvas.width - userImg.width * scale) / 2;
            const y = (canvas.height - userImg.height * scale) / 2;

            ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

            // 2. Draw frame on top
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

            // Generate final result
            const finalDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setProcessedImage(finalDataUrl);

            // Cleanup ObjectURL to free memory
            if (imageSrc.startsWith('blob:')) {
                URL.revokeObjectURL(imageSrc);
            }
        } catch (error) {
            console.error('Error processing image Safari:', error);
            alert('Error al capturar la foto. Prueba de nuevo.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpload = () => {
        setIsProcessing(true);
        // Simulate upload delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsUploaded(true);
            if (onPhotoUpload) {
                onPhotoUpload(processedImage);
            }
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 bg-[#2D5A27]/20 rounded-[2rem] border-2 border-jungle-light/30 backdrop-blur-sm">
            <div className="text-center space-y-4 mb-6">
                <h2 className="text-3xl font-luckiest text-volcano-orange uppercase tracking-wide">
                    ¡PHOTO SAFARI!
                </h2>
                <p className="text-white font-bangers tracking-wider">
                    CAPTURA UN DINOSAURIO EN LA FIESTA
                </p>
            </div>

            {!processedImage ? (
                <div
                    onClick={() => fileInputRef.current.click()}
                    className="aspect-square bg-black/40 rounded-2xl border-4 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:bg-black/60 transition-all group"
                >
                    <Camera size={64} className="text-white/40 group-hover:text-volcano-orange transition-colors mb-4" />
                    <span className="text-white/60 font-bangers text-xl">TOMAR FOTOGRAFÍA</span>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-volcano-orange shadow-2xl">
                        <img src={processedImage} alt="Safari" className="w-full h-full object-cover" />
                        {isProcessing && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <RefreshCw className="text-white animate-spin" size={48} />
                            </div>
                        )}
                    </div>

                    {!isUploaded ? (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => { setSelectedImage(null); setProcessedImage(null); }}
                                className="bg-white/10 hover:bg-white/20 text-white font-bangers py-3 rounded-xl transition-all"
                            >
                                REPETIR
                            </button>
                            <button
                                onClick={handleUpload}
                                className="bg-volcano-orange hover:bg-volcano-red text-white font-bangers py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_0_rgb(153,51,0)] active:shadow-none active:translate-y-1 transition-all"
                            >
                                <Upload size={20} /> SUBIR
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#2D5A27] text-white p-4 rounded-xl text-center space-y-2"
                        >
                            <div className="flex justify-center mb-2"><Check size={32} /></div>
                            <p className="font-luckiest text-xl">¡FOTO CAPTURADA!</p>
                            <p className="font-bangers">Ya puedes verla en la galería del evento.</p>
                            <button
                                onClick={() => { setProcessedImage(null); setIsUploaded(false); }}
                                className="mt-4 text-sm underline opacity-70"
                            >
                                Tomar otra
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default PhotoSafari;
