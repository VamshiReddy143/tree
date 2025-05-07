import React, { useRef, useState } from 'react';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';

const App = () => {
  const ballRefs = [useRef(null), useRef(null), useRef(null)];
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const timeoutRef = useRef(null);

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
    videoSrc: '',
  });

  // Adjustable distances for each ball (in pixels)
  const distances = [
    { x: 15, y: 15 }, // West Coast
    { x: 15, y: 15 }, // Ottawa
    { x: 15, y: 15 }, // East Coast
  ];

  const handleMouseMove = (e, index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setPositions((prev) => {
        const newPositions = [...prev];
        newPositions[index] = distances[index];
        return newPositions;
      });
    }, 10);
  };

  const handleMouseLeave = (index) => {
    setPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = { x: 0, y: 0 };
      return newPositions;
    });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Debounce function to prevent rapid clicks
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleBallClick = debounce((region) => {
    setModalState({
      isOpen: true,
      title: `${region} Spokesperson`,
      description: getRegionDescription(region),
      videoSrc: getRegionVideo(region),
    });
  }, 300);

  const getRegionDescription = (region) => {
    const descriptions = {
      'West Coast': 'Sharing insights about coastal conservation and sustainable fishing practices',
      Ottawa: 'Discussing governmental policies and national initiatives for environmental protection',
      'East Coast': 'Highlighting maritime traditions and the impact of climate change on coastal communities',
    };
    return descriptions[region];
  };

  const getRegionVideo = (region) => {
    const videos = {
      'West Coast': 'https://videos.pexels.com/video-files/6548176/6548176-sd_640_360_24fps.mp4', // Ensure these paths match your public folder structure
      "Ottawa": 'https://videos.pexels.com/video-files/854040/854040-sd_640_360_30fps.mp4',
      'East Coast': 'https://videos.pexels.com/video-files/6950902/6950902-sd_640_360_25fps.mp4',
    };
    return videos[region];
  };

  return (
    <div className="bg overflow-hidden">
      <div className="flex items-center pt-3 justify-center text-center">
        <h1 className="text-center font-semibold text-3xl text-white">Voices Of Canada</h1>
      </div>
      <div className="flex text-gray-200 gap-[30px] relative items-center justify-center h-screen">
        <div className="mb-[13em] absolute mr-[38em] text-center">
          <div
            ref={ballRefs[0]}
            className="bg-green-700 h-[80px] w-[80px] cursor-pointer rounded-full transition-transform duration-200"
            style={{ transform: `translate(${positions[0].x}px, ${positions[0].y}px)` }}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
            onClick={() => handleBallClick('West Coast')}
          >
            <div className="h-[40px] bg-gray-200/80 w-[40px] absolute top-0 right-6 cursor-pointer rounded-full transition-transform duration-200" />
          </div>
          <p>West Coast</p>
        </div>

        <div className="mt-[2em] absolute mr-[0em] text-center">
          <div
            ref={ballRefs[1]}
            className="bg-blue-700 h-[80px] w-[80px] cursor-pointer rounded-full transition-transform duration-200"
            style={{ transform: `translate(${positions[1].x}px, ${positions[1].y}px)` }}
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={() => handleMouseLeave(1)}
            onClick={() => handleBallClick('Ottawa')}
          >
            <div className="h-[40px] bg-gray-200/80 w-[40px] absolute top-0 mb-10 right-6 cursor-pointer rounded-full transition-transform duration-200" />
          </div>
          <p>Ottawa</p>
        </div>

        <div className="mb-[4em] absolute ml-[25em] text-center">
          <div
            ref={ballRefs[2]}
            className="bg-green-900 h-[80px] w-[80px] cursor-pointer relative rounded-full transition-transform duration-200"
            style={{ transform: `translate(${positions[2].x}px, ${positions[2].y}px)` }}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
            onClick={() => handleBallClick('East Coast')}
          >
            <div className="h-[40px] bg-gray-200/80 w-[40px] absolute top-0 mb-10 right-6 cursor-pointer rounded-full transition-transform duration-200" />
          </div>
          <p>East Coast</p>
        </div>

        <div className="text-black text-center absolute bottom-30">
          <h2 className="font-semibold text-xl">Click On a spokesperson to hear their message</h2>
          <p className="text-[15px] font-italic">Discover perspectives from across Canada</p>
        </div>
      </div>
      <Footer />

      <VideoModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        description={modalState.description}
        videoSrc={modalState.videoSrc}
      />
    </div>
  );
};

export default App;