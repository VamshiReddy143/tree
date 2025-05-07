import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, title, description, videoSrc }) => {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCenterButton, setShowCenterButton] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Map titles to spokesperson names and video paths
  const spokespersonData = {
    'West Coast Spokesperson': {
      name: 'Emma Thompson',
      video: 'https://videos.pexels.com/video-files/6548176/6548176-sd_640_360_24fps.mp4',
    },
    'Ottawa Spokesperson': {
      name: 'James Carter',
      video: 'https://videos.pexels.com/video-files/854040/854040-sd_640_360_30fps.mp4',
    },
    'East Coast Spokesperson': {
      name: 'Sarah Mitchell',
      video: 'https://videos.pexels.com/video-files/6950902/6950902-sd_640_360_25fps.mp4',
    },
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      setIsPlaying(false);
      setShowCenterButton(true);
      setError(null);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset video to start
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      console.log('Loading video:', videoSrc);
      videoRef.current.load(); // Explicitly load new source
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowCenterButton(true);
        setError(null);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setShowCenterButton(true);
              timeoutRef.current = setTimeout(() => {
                setShowCenterButton(false);
              }, 3000);
              setError(null);
            })
            .catch((error) => {
              console.error('Video play failed:', error);
              setIsPlaying(false);
              setShowCenterButton(true);
              setError('Failed to play video. Please try again.');
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) return null;

  // Use videoSrc or fallback to spokespersonData
  const videoSource = videoSrc || (spokespersonData[title] ? spokespersonData[title].video : '');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden transform transition-all duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-[22px] font-semibold text-teal-700">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative p-7">
          <div className="bg-gray-100 rounded-xl p-4">
            <video
              ref={videoRef}
              src={videoSource}
              className="w-full aspect-video rounded-xl bg-gray-300"
              onClick={togglePlay}
              onError={(e) => {
                console.error('Video failed to load:', e);
                setError('Video failed to load. Please check the URL.');
              }}
              onEnded={() => {
                setIsPlaying(false);
                setShowCenterButton(true);
              }}
              muted={isMuted}
              playsInline
              preload="auto"
            >
              {videoSource && <source src={videoSource} type="video/mp4" />}
              Your browser does not support the video tag or the source is invalid.
            </video>

            {showCenterButton && (
              <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="h-16 w-16 rounded-full bg-teal-600/90 text-white flex items-center justify-center hover:bg-teal-700 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <div className="text-white/90 text-sm text-center">
                  <div className="text-center text-black text-[15px] font-semibold">
                    Video playing: {title}
                  </div>
                  <div className="mt-1">Spokesperson: {spokespersonData[title]?.name}</div>
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 flex items-center">
              <button onClick={toggleMute} className="text-white mr-4">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            <div className="pt-2 text-gray-700">
              <p className="text-center">{description}</p>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;