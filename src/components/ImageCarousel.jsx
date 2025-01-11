import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images }) => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize slides with proper positioning
    setSlides([
      { index: getLastIndex(), position: -1 },
      { index: currentIndex, position: 0 },
      { index: getNextIndex(), position: 1 }
    ]);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  const getNextIndex = () => (currentIndex + 1) % images.length;
  const getLastIndex = () => (currentIndex - 1 + images.length) % images.length;

  const handleNext = () => {
    if (isAnimating || !images?.length) return;
    setIsAnimating(true);

    // Update slides with new positions
    setSlides([
      { index: getLastIndex(), position: -2 },
      { index: currentIndex, position: -1 },
      { index: getNextIndex(), position: 0 }
    ]);

    // Update current index
    setTimeout(() => {
      setCurrentIndex(getNextIndex());
      setIsAnimating(false);
      // Reset positions
      setSlides([
        { index: getLastIndex(), position: -1 },
        { index: getNextIndex(), position: 0 },
        { index: (getNextIndex() + 1) % images.length, position: 1 }
      ]);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating || !images?.length) return;
    setIsAnimating(true);

    // Update slides with new positions
    setSlides([
      { index: getLastIndex(), position: 0 },
      { index: currentIndex, position: 1 },
      { index: getNextIndex(), position: 2 }
    ]);

    // Update current index
    setTimeout(() => {
      setCurrentIndex(getLastIndex());
      setIsAnimating(false);
      // Reset positions
      setSlides([
        { index: (getLastIndex() - 1 + images.length) % images.length, position: -1 },
        { index: getLastIndex(), position: 0 },
        { index: currentIndex, position: 1 }
      ]);
    }, 500);
  };

  const handleThumbnailClick = (index) => {
    if (isAnimating || index === currentIndex || !images?.length) return;
    setIsAnimating(true);

    setSlides([
      { index: getLastIndex(), position: -2 },
      { index: currentIndex, position: -1 },
      { index: index, position: 0 }
    ]);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
      setSlides([
        { index: (index - 1 + images.length) % images.length, position: -1 },
        { index: index, position: 0 },
        { index: (index + 1) % images.length, position: 1 }
      ]);
    }, 500);
  };

  if (!images?.length || !slides.length) return null;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      <div className="relative w-full h-[400px] mb-4 overflow-hidden rounded-lg">
        {slides.map((slide, i) => (
          <div
            key={`${slide.index}-${i}`}
            className="absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${slide.position * 100}%)`
            }}
          >
            <img
              src={images[slide.index]}
              alt={`Slide ${slide.index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all transform hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all transform hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 py-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 relative w-20 md:w-28 md:h-20 h-16 overflow-hidden rounded-lg transition-all ${currentIndex === index
                ? 'ring-2 ring-blue-500'
                : 'ring-1 ring-gray-300 opacity-70 hover:opacity-100'
              }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
};

export default ImageCarousel;
