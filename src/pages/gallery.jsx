import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
// Replace these with your actual image imports
import { 
    galleryimg1,
    galleryimg2,
    galleryimg3,
    galleryimg4,
    galleryimg5,
    galleryimg6,
    galleryimg7,
    galleryimg8,
    galleryimg9,
    galleryimg10,
    galleryimg11,
    galleryimg12,
} from "../assets/images";

const NewPage = () => {
  const galleryImages = [
      { src: galleryimg2, alt: "Gallery image 2" },
      { src: galleryimg3, alt: "Gallery image 3" },
      { src: galleryimg4, alt: "Gallery image 4" },
      { src: galleryimg5, alt: "Gallery image 5" },
      { src: galleryimg6, alt: "Gallery image 6" },
      { src: galleryimg1, alt: "Gallery image 1" },
    { src: galleryimg7, alt: "Gallery image 7" },
    { src: galleryimg8, alt: "Gallery image 8" },
    { src: galleryimg9, alt: "Gallery image 9" },
    { src: galleryimg10, alt: "Gallery image 10" },
    { src: galleryimg11, alt: "Gallery image 11" },
    { src: galleryimg12, alt: "Gallery image 12" },
  ];

  return (
    <>
      <Helmet>
        <meta property="og:title" content="New Page Title | Your Site" />
        <meta
          property="og:description"
          content="Short description of your new page."
        />
        <meta property="og:image" content={galleryimg1} />
        <meta property="og:url" content="https://yourdomain.com/new-page" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${galleryimg1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Grand Opening At Quay Commons
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl xl:text-3xl text-white/90 font-light tracking-wide drop-shadow-lg max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              “Moments Captured on Opening Day at Quay Commons”
            </motion.p>
          </motion.div>

          <div className="hidden xl:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <motion.section
          className="py-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-lg shadow-lg"
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-62 object-cover"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default NewPage;
