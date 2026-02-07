import { useState, useRef } from 'react'
import JungleReveal from './components/JungleReveal'
import RSVPForm from './components/RSVPForm'
import EventInfo from './components/EventInfo'
import PhotoSafari from './components/PhotoSafari'
import PhotoGallery from './components/PhotoGallery'
import { Volume2, VolumeX, Settings, LogOut, Ghost } from 'lucide-react'

function App() {
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isRSVPFossilized, setIsRSVPFossilized] = useState(() => localStorage.getItem('isRSVPFossilized') === 'true')
  const [isPhotoSafariEnabled, setIsPhotoSafariEnabled] = useState(() => localStorage.getItem('isPhotoSafariEnabled') !== 'false')
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true')
  const [photos, setPhotos] = useState(() => JSON.parse(localStorage.getItem('savedPhotos') || '[]'))
  const videoRef = useRef(null)

  const handleNewPhoto = (newPhoto) => {
    const updatedPhotos = [newPhoto, ...photos]
    setPhotos(updatedPhotos)
    localStorage.setItem('savedPhotos', JSON.stringify(updatedPhotos))
  }

  const handleDeletePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index)
    setPhotos(updatedPhotos)
    localStorage.setItem('savedPhotos', JSON.stringify(updatedPhotos))
  }

  const toggleAdmin = () => {
    const newState = !isAdmin
    setIsAdmin(newState)
    localStorage.setItem('isAdmin', newState)
  }

  const updateSetting = (setter, key, value) => {
    setter(value)
    localStorage.setItem(key, value)
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

          {/* Admin Floating Control Panel */}
          {isAdmin && (
            <div className="fixed top-6 left-6 z-[60] bg-[#3D1F09]/95 backdrop-blur-md p-6 rounded-[2rem] border-2 border-volcano-orange shadow-2xl space-y-4 text-white max-w-xs animate-in slide-in-from-left duration-500">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="text-volcano-orange" size={24} />
                <h3 className="font-luckiest text-xl uppercase tracking-wider">Bitácora Admin</h3>
              </div>

              <div className="space-y-4 font-bangers tracking-wider text-lg">
                <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group">
                  <span>MODO FÓSIL (RSVP)</span>
                  <input
                    type="checkbox"
                    checked={isRSVPFossilized}
                    onChange={(e) => updateSetting(setIsRSVPFossilized, 'isRSVPFossilized', e.target.checked)}
                    className="w-6 h-6 accent-volcano-orange cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group">
                  <span>SAFARI ACTIVO</span>
                  <input
                    type="checkbox"
                    checked={isPhotoSafariEnabled}
                    onChange={(e) => updateSetting(setIsPhotoSafariEnabled, 'isPhotoSafariEnabled', e.target.checked)}
                    className="w-6 h-6 accent-volcano-orange cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={toggleAdmin}
                  className="w-full flex items-center justify-center gap-2 bg-volcano-red/20 hover:bg-volcano-red/40 py-3 rounded-xl border border-volcano-red/30 transition-all font-bangers text-sm"
                >
                  <LogOut size={16} /> SALIR DEL PANEL
                </button>
              </div>
            </div>
          )}

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
              <PhotoGallery
                photos={photos}
                isAdmin={isAdmin}
                onDeletePhoto={handleDeletePhoto}
              />
            )}

            <div className="py-8 text-center">
              <button
                onLongPress={toggleAdmin} // This is just a conceptual trigger, standard click is fine for now
                onClick={(e) => {
                  if (e.detail === 3) toggleAdmin(); // Triple click secret
                }}
                className="text-white/20 font-bangers text-xs tracking-widest uppercase hover:text-white/40 transition-colors"
                title="Triple click for Admin"
              >
                © 2026 Expedición Máximo V
              </button>
              {isAdmin && <div className="text-[10px] text-volcano-orange mt-1">ADMIN MODE ACTIVE</div>}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
