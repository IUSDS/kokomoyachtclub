import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle } from 'react-icons/fa';

const MembershipLevels = () => {
    const membershipData = [
        {
            title: "Silver",
            description: "Best for Occasional Boater",
            points: "1,850 Mariner Points Annually",
            benefits: [
                "2 Open Reservations",
                "12 Weekend Outings Annually",
                "Unlimited Last-Minute Reservations",
                "1 Overnight Trip Included",
                "Base Tier Scheduling",
            ],
            bgColor: "bg-white",
            borderColor: 'border-black',
            textColor: "text-midnightblue",
            buttonText: "Request a Member Packet",
        },
        {
            title: "Gold",
            description: "Our most popular, ideal for snowbirds",
            points: "3,350 Mariner Points Annually",
            benefits: [
                "4 Open Reservations",
                "24 Weekend Outings Annually",
                "Unlimited Last-Minute Reservations",
                "2 Overnight Trip Included",
                "Gold Priority Tier Scheduling",
            ],
            bgColor: "bg-midnightblue",
            borderColor: 'border-white',
            textColor: "text-white",
            buttonText: "Request a Member Packet",
        },
        {
            title: "Platinum",
            description: "Perfect for full-time Residents",
            points: "4,900 Mariner Points Annually",
            benefits: [
                "6 Open Reservations",
                "Unlimited Weekend Outings",
                "Unlimited Last-Minute Reservations",
                "2 Multi-Day Trips Included",
                "Platinum Priority Scheduling",
            ],
            bgColor: "bg-white",
            borderColor: 'border-black',
            textColor: "text-midnightblue",
            buttonText: "Request a Member Packet",
        },
        {
            title: "Diamond",
            description: "The Ultimate Membership for Water Warriors",
            points: "7,500 Mariner Points Annually",
            benefits: [
                "8 Open Reservations",
                "Unlimited Weekend Outings",
                "Unlimited Last-Minute Reservations",
                "3 Multi-Day Trips Included",
                "Top Priority Scheduling",
            ],
            bgColor: "bg-white",
            borderColor: 'border-black',
            textColor: "text-midnightblue",
            buttonText: "Request a Member Packet",
        }
    ];

    return (
        <div className="bg-gray-100 space-y-8 py-20 px-6 md:px-16">
            <p className="text-midnightblue text-4xl text-center font-medium">
                Membership Levels
            </p>
            <p className="text-left md:text-center">
                Membership has its privileges. The higher the tier, the higher the privileges. Membership components of Mariner Points, the number of open reservations allowed in the system and the flexibility of booking outings on weekdays, weekends and multi days. All Yachting Memberships begin with a one-time capital contribution then simply choose which membership suits you best. Membership is an annual commitment, paid annually or quarterly.
            </p>

            <div className="relative">
                {/* Conditional Blur Overlay */}
                {/* {!isLoggedIn && (
                    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-50 backdrop-blur-sm z-30">
                        <div>
                            <form action=""></form>
                        </div>
                    </div>
                )} */}

                {/* Dynamically Render Membership Tiers */}
                <div className="w-full p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-4 md:flex-row">
                    {membershipData.map((tier, index) => (
                        <motion.div
                            key={index}
                            className={`px-4 md:h-[510px] w-full flex flex-col items-center ${tier.bgColor} rounded-lg space-y-4 py-4`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                            }}
                        >
                            {/* Title and Description */}
                            <p className={`${tier.textColor} text-xl text-center font-normal`}>
                                {tier.title}
                            </p>
                            <p className={`${tier.textColor} text-md text-center font-normal`}>
                                {tier.description}
                            </p>

                            {/* Points and Benefits */}
                            <div className="flex flex-col space-y-2">
                                <div className="flex flex-col pl-2 text-sm justify-start">
                                    <div
                                        className={`flex items-center gap-2 border-b border-dashed ${tier.borderColor} pb-2`}
                                    >
                                        <FaRegCheckCircle className={`${tier.textColor}`} />
                                        <p className={`${tier.textColor}`}>{tier.points}</p>
                                    </div>
                                </div>
                                {tier.benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col pl-2 text-sm justify-start"
                                    >
                                        <div
                                            className={`flex items-center gap-2 border-b border-dashed ${tier.borderColor} pb-2`}
                                        >
                                            <FaRegCheckCircle className={`${tier.textColor}`} />
                                            <p className={`${tier.textColor}`}>{benefit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <p className={`text-3xl pt-6 ${tier.textColor} font-medium`}>
                                Inquire for Details
                            </p>
                            <a href="/contact" target="_blank" rel="noopener noreferrer">
                                <button
                                    className={`w-fit px-6 py-3 text-sm bg-blue-600 hover:bg-opacity-90 text-white shadow-lg font-semibold rounded-full transition-all`}
                                >
                                    {tier.buttonText}
                                </button>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="text-left md:text-center">
                <p>
                    See detailed membership overview for specific terms and conditions regarding rules by membership tier. Higher tiers have greater flexibility. Reservations may have restrictions based on day of week, time of year and number of open reservations. Vessel, staff, fuel for coastal cruising, water toys, insurance and core provisioning included in membership. Additional provisioning of catering and adult beverages, $85 booking fee, excess fuel and optional staff gratuity not included. Kokomo Yacht Club is a private luxury boat membership club. All potential members must be approved for membership by Kokomo Yacht Club.
                </p>
            </div>
        </div>
    );
};

export default MembershipLevels;
