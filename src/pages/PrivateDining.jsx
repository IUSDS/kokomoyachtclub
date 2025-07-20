import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  pvt_din_hero,
  menu_pd,
  tablefour,
  tableone,
  tablethree,
  tabletwo,
  pd,
  pd2,
  pd3,
  pd4,
} from "../assets/images";
import Button from "../components/Button";

const PrivateDining = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Private Dining Experience | Kokomo Charters" />
        <meta property="og:description" content="A Five-Star Meal with a Million-Star View on the Gulf." />
        <meta property="og:image" content="https://kokomoyachtclub.vip/images/pvt_din_hero.webp" />
        <meta property="og:url" content="https://kokomoyachtclub.vip/private-dining" />
      </Helmet>

      <div className="flex flex-col">
        {/* Hero Section */}
        <section
          className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pvt_din_hero})` }}
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
              PRIVATE DINING EXPERIENCE
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl xl:text-3xl text-white/90 font-light tracking-wide drop-shadow-lg max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              A Five-Star Meal with a Million-Star View
            </motion.p>
          </motion.div>

          <div className="hidden xl:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <motion.section
          className="py-16 md:py-24 px-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-center xl:text-left">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-midnightblue leading-tight">
                  Reimagine Fine Dining
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Welcome aboard a dining experience unlike any other, where the
                  sun melts into the Gulf and your private table floats on the
                  calm waters. Kokomo Charters invites you to reimagine what
                  dining can be: elevated cuisine served on open water, with the
                  Gulf breeze as your backdrop and each course a celebration of
                  craftsmanship.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-midnightblue leading-tight">
                  Artistry Meets Exclusivity
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  In partnership with Taste & Design Catering, this experience
                  blends the artistry of fine dining with the exclusivity of your
                  own private yacht. A table like no other at your service, where
                  the view is ever-changing and the menu is anything but standard.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Button
                text="Inquire For Membership"
                bg_color="midnightblue"
                text_color="white"
                navigate_to="contact"
                className="cursor-pointer"
              />
            </div>
          </div>
        </motion.section>

        {/* Menu Section */}
        <motion.section
          className="bg-midnightblue w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col-reverse xl:flex-row min-h-[600px]">
            <div className="xl:w-1/2 flex flex-col justify-center items-center xl:items-start px-6 md:px-12 py-12 md:py-16 space-y-8">
              <div className="text-center xl:text-left">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6">
                  Menu as Unique as You Are
                </h2>
                <div className="w-24 h-1 bg-white mx-auto xl:mx-0 mb-8" />
              </div>

              <div className="xl:hidden relative">
                <motion.img
                  src={menu_pd}
                  alt="Exquisite oysters on the half shell showcasing our culinary artistry"
                  className="w-full h-full object-cover shadow-xl rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent xl:rounded-l-lg" />
              </div>

              <div className="space-y-6 text-white/90 text-center xl:text-left">
                <p className="text-lg leading-relaxed">
                  This isn't pre-fixed, it's personal. Our culinary team crafts
                  your menu around your palate—refined, relaxed, or daring. Start
                  with Wagyu tartare kissed with caviar, or a South American
                  octopus sear. Move into the likes of duck fat pavé, celery root
                  purée, or tropical panna cotta that echoes the colors of the
                  sunset overhead.
                </p>
                <p className="text-lg leading-relaxed">
                  Have a vision already? We'll design around it. Prefer to be
                  surprised? Let our chef guide your voyage through flavor.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  text="Explore Our Menu"
                  bg_color="white"
                  text_color="midnightblue"
                  navigate_to="https://image-bucket-kokomo-yacht-club.s3.ap-southeast-2.amazonaws.com/KYC+Provisioning+and+chef+menus.pdf"
                />
              </div>
            </div>

            <div className="hidden xl:block xl:w-1/2 relative">
              <motion.img
                src={menu_pd}
                alt="Exquisite oysters on the half shell showcasing our culinary artistry"
                className="w-full h-full object-cover xl:rounded-l-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent xl:rounded-l-lg" />
            </div>
          </div>
        </motion.section>

        {/* Gallery & Experience Section */}
        <motion.section
          className="py-16 md:py-24 px-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-midnightblue mb-6">
                Your Table, Set to Sea
              </h2>
              <div className="w-24 h-1 bg-midnightblue mx-auto mb-8" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
              {[
                { src: tableone, alt: "Elegant table setting on deck" },
                { src: tabletwo, alt: "Intimate dining atmosphere" },
                { src: tablethree, alt: "Sunset dining experience" },
                { src: tablefour, alt: "Luxurious yacht dining setup" },
              ].map((image, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg shadow-xl">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 lg:h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Step aboard your private yacht, where soft linens, ambient
                lighting, and perfectly chilled wine await. Whether you prefer a
                romantic sunset dinner or a stylish celebration under the stars,
                every detail is handled. All you have to do is relax, indulge,
                and take in the view.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Hospitality Section */}
        <motion.section
          className="bg-midnightblue w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col-reverse xl:flex-row min-h-[600px]">
            <div className="xl:w-1/2 flex flex-col justify-center px-6 md:px-12 py-12 md:py-16 space-y-8">
              <div className="text-center xl:text-left">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-6">
                  Hosted by Hospitality
                </h2>
                <div className="w-24 h-1 bg-white mx-auto xl:mx-0 mb-4" />
              </div>

              <div className="space-y-6 text-white/90 text-center xl:text-left">
                <p className="text-lg leading-relaxed">
                  This is where world-class service meets barefoot ease. Our crew,
                  in concert with Taste & Design's culinary stylists, ensures your
                  experience is seamless, intimate, and meticulously executed—from
                  the first sip to the final course.
                </p>
                <p className="text-lg leading-relaxed">
                  Every detail is choreographed to perfection, yet feels
                  effortlessly natural. From the moment you step aboard until the
                  last star reflects on the water, you're in the hands of true
                  hospitality professionals.
                </p>
              </div>
            </div>

            <div className="xl:w-1/2 relative flex items-center justify-center xl:justify-end px-6 xl:pr-10 py-12 xl:py-0">
              <div className="relative w-full max-w-lg xl:max-w-none">
                <div className="relative z-10 w-full xl:w-[80%] aspect-[4/3] xl:ml-auto">
                  <motion.img
                    src={pd2}
                    alt="Professional yacht crew providing exceptional service"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>

                <div className="absolute -bottom-8 -left-4 md:-left-20 md:-bottom-20 xl:-left-4 xl:-bottom-10 z-20 w-[60%] xl:w-[40%] aspect-[4/3]">
                  <motion.img
                    src={pd}
                    alt="Elegant dining setup showcasing attention to detail"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-white/30 rounded-full hidden xl:block" />
                <div className="absolute -bottom-4 right-8 w-16 h-16 border-2 border-white/20 rounded-full hidden xl:block" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="w-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col xl:flex-row min-h-[600px]">
            {/* Image Column */}
            <div className="xl:w-1/2 relative flex items-center justify-center xl:justify-end px-6 xl:pl-10 py-12 xl:py-0">
              <div className="relative w-full max-w-lg xl:max-w-none">
                <div className="relative z-10 w-full xl:w-[80%] aspect-[4/3] xl:mr-auto">
                  <motion.img
                    src={pd3}
                    alt="Yacht crew prepping dining experience"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>

                <div className="absolute -bottom-8 -right-4 xl:-right-4 md:-right-20 md:-bottom-20 xl:-bottom-10 z-20 w-[60%] xl:w-[40%] aspect-[4/3]">
                  <motion.img
                    src={pd4}
                    alt="Luxurious table details and decor"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                </div>

                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-black/30 rounded-full hidden xl:block" />
                <div className="absolute -bottom-4 left-8 w-16 h-16 border-2 border-black/20 rounded-full hidden xl:block" />
              </div>
            </div>

            {/* Text Column */}
            <div className="xl:w-1/2 flex flex-col justify-center items-center xl:items-start px-6 md:px-12 py-12 md:py-16 space-y-8">
              <div className="text-center xl:text-left">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-midnightblue mb-6">
                  An Experience Worth Celebrating
                </h2>
                <div className="w-24 h-1 bg-midnightblue mx-auto xl:mx-0" />
              </div>

              <div className="space-y-6 text-midnightblue/90 text-center xl:text-left">
                <p className="text-lg leading-relaxed">
                  Perfect for proposals, milestone birthdays, anniversary
                  surprises, or no reason at all except joy. Because some
                  occasions deserve more than a reservation—they deserve a
                  journey.
                </p>
              </div>

              <Button
                text="Inquire For Membership"
                bg_color="midnightblue"
                text_color="white"
                navigate_to="contact"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default PrivateDining;
