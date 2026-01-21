import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JungleReveal = ({ onReveal }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        setIsRevealed(true);
        if (onReveal) {
            setTimeout(onReveal, 1000); // Trigger follow-up action after leaves move
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* Background - Dinosaur Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/hero_video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.7]"
                />
            </div>

            <AnimatePresence>
                {!isRevealed && (
                    <>
                        {/* Left Leaf Layer */}
                        <motion.div
                            initial={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
                            className="absolute inset-y-0 left-0 w-1/2 z-20 overflow-hidden border-r-4 border-jungle shadow-2xl flex items-center justify-end"
                        >
                            <div
                                className="absolute inset-0 bg-jungle-dark/80 backdrop-blur-sm"
                                style={{
                                    backgroundImage: `url('/jungle_bg.png')`,
                                    backgroundSize: '200% 100%',
                                    backgroundPosition: 'left center',
                                    filter: 'brightness(0.5) contrast(1.2)'
                                }}
                            />
                            {/* SVG Leaf decoration could go here */}
                            <div className="relative w-16 h-16 bg-jungle-light rounded-full -mr-8 opacity-20 blur-xl" />
                        </motion.div>

                        {/* Right Leaf Layer */}
                        <motion.div
                            initial={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
                            className="absolute inset-y-0 right-0 w-1/2 z-20 overflow-hidden border-l-4 border-jungle shadow-2xl flex items-center justify-start"
                        >
                            <div
                                className="absolute inset-0 bg-jungle-dark/80 backdrop-blur-sm"
                                style={{
                                    backgroundImage: `url('/jungle_bg.png')`,
                                    backgroundSize: '200% 100%',
                                    backgroundPosition: 'right center',
                                    filter: 'brightness(0.5) contrast(1.2)'
                                }}
                            />
                            <div className="relative w-16 h-16 bg-jungle-light rounded-full -ml-8 opacity-20 blur-xl" />
                        </motion.div>

                        {/* Central Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="z-30 text-center"
                        >
                            <h1 className="text-5xl font-luckiest text-white mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase tracking-wider">
                                ¡MÁXIMO CUMPLE 5!
                            </h1>
                            <button
                                onClick={handleReveal}
                                className="bg-volcano-orange hover:bg-volcano-red text-white font-bangers text-3xl px-12 py-6 rounded-2xl shadow-[0_8px_0_rgb(154,52,0)] active:shadow-none active:translate-y-2 transition-all"
                            >
                                ¡ABRIR INVITACIÓN!
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Decorative Jungle Vignette - stays after reveal if needed */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
};

export default JungleReveal;
