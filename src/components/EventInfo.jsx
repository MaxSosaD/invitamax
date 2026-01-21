import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

const EventInfo = ({ date, location, address, time, mapLink }) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-jungle/30 p-8 rounded-3xl border-2 border-jungle-light shadow-xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Calendar size={80} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <Calendar className="text-volcano-orange mb-3" size={40} />
                    <h3 className="text-3xl font-luckiest text-white mb-1">FECHA</h3>
                    <p className="text-4xl font-bangers text-white uppercase tracking-wider">{date}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-jungle/30 p-8 rounded-3xl border-2 border-jungle-light shadow-xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Clock size={80} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <Clock className="text-volcano-orange mb-3" size={40} />
                    <h3 className="text-3xl font-luckiest text-white mb-1">HORARIO</h3>
                    <p className="text-4xl font-bangers text-white uppercase tracking-wider">{time}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-jungle/30 p-8 rounded-3xl border-2 border-jungle-light shadow-xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <MapPin size={80} className="text-white" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <MapPin className="text-volcano-orange mb-3" size={40} />
                    <h3 className="text-3xl font-luckiest text-white mb-1">LUGAR</h3>
                    <h4 className="text-3xl font-bangers text-white uppercase mb-2">{location}</h4>
                    <p className="text-xl font-bangers text-white/70 mb-6 italic leading-tight">
                        {address}
                    </p>

                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-earth-brown hover:bg-volcano-orange text-white px-8 py-3 rounded-full font-luckiest text-xl transition-all shadow-lg active:scale-95"
                    >
                        VER EN MAPS <ExternalLink size={20} />
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default EventInfo;
