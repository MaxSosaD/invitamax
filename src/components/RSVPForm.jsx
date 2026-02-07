import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, Check, X, Footprints, Clipboard } from 'lucide-react';

const RSVPForm = ({ isFossilized = false }) => {
    const [formData, setFormData] = useState({
        guestName: '',
        attending: 'confirmado',
        adults: 1,
        children: 0,
    });

    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // --- CONFIGURACIÓN DE GOOGLE FORM ---
        // 1. Reemplaza este ID con el de tu formulario (está en la URL del formulario)
        const FORM_ID = '1FAIpQLSdRUhrE98F9fUxuRfC6nbegB2COdsQBCNFu1VGuTPMWRAkedg';
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

        // 2. Reemplaza estos números con los que encontraste (entry.XXXXX)
        const entryIds = {
            name: 'entry.77532317',
            attending: 'entry.1132604293',
            adults: 'entry.1923197611',
            children: 'entry.1510105619'
        };
        // ------------------------------------

        const formDataToSubmit = new URLSearchParams();
        formDataToSubmit.append(entryIds.name, formData.guestName);
        formDataToSubmit.append(entryIds.attending, formData.attending === 'confirmado' ? '!AHÍ ESTARÉ¡' : 'NO PUEDO IR');
        formDataToSubmit.append(entryIds.adults, formData.adults);
        formDataToSubmit.append(entryIds.children, formData.children);

        try {
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formDataToSubmit.toString(),
            });

            setSubmitted(true);
        } catch (err) {
            console.error('Error enviando RSVP:', err);
            setError('Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative bg-[#F5E6D3] text-earth-brown rounded-[2rem] p-8 border-4 border-[#8B4513] shadow-[8px_8px_0_rgba(139,69,19,0.3)] overflow-hidden transition-all duration-700 ${isFossilized ? 'grayscale filter [filter:grayscale(1)_brightness(0.4)_contrast(1.2)] opacity-30 pointer-events-none' : ''}`}
            >
                {/* Fossil Overlay */}
                {isFossilized && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
                        <motion.div
                            initial={{ scale: 3, opacity: 0, rotate: -40 }}
                            animate={{ scale: 1, opacity: 1, rotate: -25 }}
                            className="border-[16px] border-[#3D1F09] text-[#3D1F09] font-luckiest text-7xl px-10 py-6 rounded-2xl rotate-[-25deg] uppercase tracking-tighter text-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        >
                            FÓSIL<br />ARCHIVADO
                        </motion.div>
                    </div>
                )}
                {/* Background Decorative Element (like a faded fossil) */}
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none p-4">
                    <Footprints size={120} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Clipboard className="text-[#8B4513]" size={32} />
                        <h2 className="text-4xl font-luckiest text-[#5D4037] uppercase tracking-wide">Bitácora RSVP</h2>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Guest Name */}
                            <div className="space-y-2">
                                <label className="block text-xl font-bangers tracking-wider ml-1">NOMBRE DEL EXPLORADOR</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B4513]/50" size={20} />
                                    <input
                                        required
                                        type="text"
                                        name="guestName"
                                        value={formData.guestName}
                                        onChange={handleChange}
                                        placeholder="Escribe tu nombre..."
                                        className="w-full bg-white/50 border-2 border-[#8B4513]/30 rounded-xl py-3 pl-12 pr-4 focus:border-[#8B4513] focus:ring-0 outline-none transition-colors font-bangers text-lg placeholder:text-[#8B4513]/30"
                                    />
                                </div>
                            </div>

                            {/* Attendance Selection */}
                            <div className="space-y-2">
                                <label className="block text-xl font-bangers tracking-wider ml-1">¿TE UNES A LA EXPEDICIÓN?</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, attending: 'confirmado' }))}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bangers text-lg ${formData.attending === 'confirmado'
                                            ? 'bg-[#2D5A27] text-white border-[#2D5A27] scale-105 shadow-md'
                                            : 'bg-white/30 border-[#8B4513]/20 text-[#8B4513]/60 hover:bg-white/50'
                                            }`}
                                    >
                                        <Check size={20} /> ¡AHÍ ESTARÉ!
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, attending: 'no_asistire' }))}
                                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bangers text-lg ${formData.attending === 'no_asistire'
                                            ? 'bg-volcano-red text-white border-volcano-red scale-105 shadow-md'
                                            : 'bg-white/30 border-[#8B4513]/20 text-[#8B4513]/60 hover:bg-white/50'
                                            }`}
                                    >
                                        <X size={20} /> NO PUEDO IR
                                    </button>
                                </div>
                            </div>

                            {/* Capacity Selectors */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-lg font-bangers tracking-wider ml-1">ADULTOS</label>
                                    <div className="flex items-center gap-3">
                                        <Users size={20} className="text-[#8B4513]/50" />
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleChange}
                                            className="w-full bg-white/50 border-2 border-[#8B4513]/30 rounded-xl py-2 px-3 font-bangers text-lg focus:border-[#8B4513] outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-lg font-bangers tracking-wider ml-1">NIÑOS</label>
                                    <div className="flex items-center gap-3">
                                        <Users size={20} className="text-[#8B4513]/50" />
                                        <input
                                            type="number"
                                            min="0"
                                            max="10"
                                            name="children"
                                            value={formData.children}
                                            onChange={handleChange}
                                            className="w-full bg-white/50 border-2 border-[#8B4513]/30 rounded-xl py-2 px-3 font-bangers text-lg focus:border-[#8B4513] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p className="text-volcano-red font-bangers text-center animate-pulse">
                                    {error}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-luckiest text-2xl py-4 rounded-2xl shadow-[0_6px_0_rgb(62,31,9)] active:shadow-none active:translate-y-1 transition-all mt-4 ${isSubmitting
                                    ? 'bg-[#8B4513]/50 cursor-not-allowed'
                                    : 'bg-[#8B4513] hover:bg-[#5D4037] text-[#F5E6D3]'
                                    }`}
                            >
                                {isSubmitting ? 'ENVIANDO BITÁCORA...' : 'REGISTRAR CONFIRMACIÓN'}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-10 space-y-4"
                        >
                            <div className="w-20 h-20 bg-[#2D5A27] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <Check size={40} />
                            </div>
                            <h3 className="text-3xl font-luckiest text-[#2D5A27]">¡BITÁCORA GUARDADA!</h3>
                            <p className="text-xl font-bangers text-[#5D4037]">Gracias por avisarnos, explorador.</p>
                        </motion.div>
                    )}
                </div>

                {/* Decorative corner bone shape (pseudo-fossil) */}
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#DCD0C0] rotate-45 border-4 border-[#8B4513]/20" />
            </motion.div>

            <p className="text-center text-[#F5E6D3]/60 font-bangers mt-6 text-sm tracking-widest uppercase">
                © 2026 Expedición Máximo V
            </p>
        </div>
    );
};

export default RSVPForm;
