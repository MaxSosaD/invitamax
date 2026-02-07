import { useState, useRef } from 'react'
import JungleReveal from './components/JungleReveal'
import RSVPForm from './components/RSVPForm'
import EventInfo from './components/EventInfo'
import PhotoSafari from './components/PhotoSafari'
import PhotoGallery from './components/PhotoGallery'
import { Volume2, VolumeX } from 'lucide-react'

function App() {
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isRSVPFossilized, setIsRSVPFossilized] = useState(true)
  const [isPhotoSafariEnabled, setIsPhotoSafariEnabled] = useState(true) // Toggle for Photo Safari
  const [photos, setPhotos] = useState([]) // Local storage for gallery photos during testing
  const videoRef = useRef(null)

  const handleNewPhoto = (newPhoto) => {
    setPhotos(prev => [newPhoto, ...prev])
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const eventDetails = {
    date: "14 de Febrero, 2026",
    location: "Magic Jardín de Fiestas",
    address: "Juan Escutia 660, Chapultepec Sur, 58260 Morelia, Mich.",
    time: "4:00 PM - 8:00 PM",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Magic+Jardin+de+Fiestas+Juan+Escutia+660+Morelia"
  };

  return (
    <main className="min-h-screen bg-transparent">
      {!showContent ? (
        <JungleReveal onReveal={() => setShowContent(true)} />
      ) : (
        <div className="animate-in fade-in duration-1000">
          {/* Hero Section */}
          <section className="relative h-[80vh] w-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              src="/hero_video.mp4"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Visual overlay to slightly darken video for better UI contrast though text is removed */}
            <div className="absolute inset-0 bg-black/10 transition-opacity" />

            {/* Floating Unmute Button */}
            <button
              onClick={toggleMute}
              className="fixed bottom-6 right-6 z-50 bg-volcano-orange hover:bg-volcano-red text-white p-4 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center border-2 border-white/20"
              aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}
            >
              {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
            </button>
          </section>

          {/* New Integrated Section: SÉ PARTE DE LA AVENTURA + EVENT INFO */}
          <section className="py-12 px-6 text-center text-white bg-transparent">
            <div className="max-w-md mx-auto space-y-8">
              <h2 className="text-5xl font-luckiest text-volcano-orange drop-shadow-lg mb-8 animate-bounce">
                SÉ PARTE DE LA AVENTURA
              </h2>

              <EventInfo {...eventDetails} />

              {/* RSVP Form Section */}
              <div className="mt-12 pt-8 border-t-2 border-jungle-light/20 space-y-12">
                <RSVPForm isFossilized={isRSVPFossilized} />

                {isPhotoSafariEnabled && (
                  <div className="pt-8 border-t-2 border-jungle-light/20">
                    <PhotoSafari onPhotoUpload={handleNewPhoto} />
                  </div>
                )}
              </div>
            </div>

            {isPhotoSafariEnabled && photos.length > 0 && (
              <PhotoGallery photos={photos} />
            )}
          </section>
        </div>
      )}
    </main>
  )
}

export default App
