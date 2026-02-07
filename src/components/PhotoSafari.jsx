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
    const frameImage = useRef(new Image());

    useEffect(() => {
        frameImage.current.src = '/dino_background.png';
    }, []);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setSelectedImage(objectUrl);
            setProcessedImage(null); // Ensure we show the CSS preview first
        }
    };

    const generateFinalImage = async () => {
        setIsProcessing(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const loadImage = async (src) => {
            const img = new Image();
            img.src = src;
            try {
                if (img.decode) await img.decode();
                else {
                    await new Promise((resolve) => { img.onload = resolve; });
                }
            } catch (e) {
                console.warn('Load failed', e);
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.src = src;
                });
            }
            return img;
        };

        try {
            const userImg = await loadImage(selectedImage);
            const frameImg = frameImage.current;
            if (!frameImg.complete) await loadImage(frameImg.src);

            canvas.width = 1080;
            canvas.height = 1080;

            // 1. Draw User Photo (scaled and centered)
            ctx.fillStyle = '#1a1a1a'; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const scale = Math.max(canvas.width / userImg.width, canvas.height / userImg.height);
            const x = (canvas.width - userImg.width * scale) / 2;
            const y = (canvas.height - userImg.height * scale) / 2;
            ctx.drawImage(userImg, x, y, userImg.width * scale, userImg.height * scale);

            // 2. Draw frame overlay on top
            // Since the user fixed the image transparency, we no longer need the "hole punch" buffer
            ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setProcessedImage(dataUrl);
            return dataUrl;
        } catch (error) {
            console.error('Error merging images:', error);
            alert('Error al procesar la imagen Safari. Intenta de nuevo.');
            return null;
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpload = async () => {
        const finalImg = await generateFinalImage();
        if (!finalImg) return;

        setIsProcessing(true);
        // Simulate upload delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsUploaded(true);

            if (onPhotoUpload) {
                onPhotoUpload(finalImg);
            }

            // CLEANUP: Reset the preview states immediately after upload
            // This ensures a new user doesn't see the previous photo.
            const oldSelectedImage = selectedImage;
            setSelectedImage(null);
            setProcessedImage(null);

            if (oldSelectedImage && oldSelectedImage.startsWith('blob:')) {
                URL.revokeObjectURL(oldSelectedImage);
            }
        }, 1200);
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

            {isUploaded ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#2D5A27] text-white p-8 rounded-2xl text-center space-y-4 border-2 border-jungle-light shadow-xl"
                >
                    <div className="flex justify-center mb-2">
                        <div className="bg-volcano-orange p-3 rounded-full">
                            <Check size={48} className="text-white" />
                        </div>
                    </div>
                    <p className="font-luckiest text-2xl tracking-wider">¡FOTO CAPTURADA!</p>
                    <p className="font-bangers text-lg opacity-90">Ya puedes verla en la galería del evento.</p>
                    <button
                        onClick={() => setIsUploaded(false)}
                        className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-bangers py-3 rounded-xl transition-all border border-white/20 uppercase tracking-widest"
                    >
                        Capturar otra
                    </button>
                </motion.div>
            ) : !selectedImage ? (
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
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-volcano-orange shadow-2xl bg-black">
                        {/* PHOTO (Bottom) */}
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />

                        {/* FRAME (Top) - Transparent PNG */}
                        <img
                            src="/dino_background.png"
                            alt="Frame Overlay"
                            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10"
                        />

                        {isProcessing && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30">
                                <RefreshCw className="text-white animate-spin mb-2" size={48} />
                                <span className="text-white font-bangers tracking-widest">PROCESANDO...</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => { setSelectedImage(null); setProcessedImage(null); }}
                            className="bg-white/10 hover:bg-white/20 text-white font-bangers py-3 rounded-xl transition-all"
                        >
                            REPETIR
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={isProcessing}
                            className={`${isProcessing ? 'opacity-50' : ''} bg-volcano-orange hover:bg-volcano-red text-white font-bangers py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_0_rgb(153,51,0)] active:shadow-none active:translate-y-1 transition-all`}
                        >
                            <Upload size={20} /> SUBIR
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default PhotoSafari;
