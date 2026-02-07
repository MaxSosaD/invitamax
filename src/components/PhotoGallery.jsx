import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const PhotoGallery = ({ photos = [], isAdmin = false, onDeletePhoto }) => {
    if (photos.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-luckiest text-volcano-orange uppercase tracking-wider mb-2 drop-shadow-md">
                    GALERÍA DE EXPLORADORES
                </h2>
                <div className="h-1 w-24 bg-volcano-orange mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -2 : 2 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-3 pb-12 shadow-xl border-8 border-earth-brown/10 relative group"
                    >
                        <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                            <img
                                src={photo}
                                alt={`Safari ${index}`}
                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                        </div>

                        {/* Decorative tape or stone effect */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-volcano-orange/30 backdrop-blur-sm -rotate-2" />

                        {/* Admin Delete Button */}
                        {isAdmin && (
                            <button
                                onClick={() => onDeletePhoto(index)}
                                className="absolute top-2 right-2 bg-volcano-red text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform z-20"
                                title="Eliminar foto"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}

                        <div className="absolute bottom-4 left-0 right-0 text-center font-bangers text-earth-brown/60 tracking-widest text-sm italic">
                            EXPEDICIÓN MÁXIMO V
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
