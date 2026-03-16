import React from "react";

const PopularAndTestimonials = () => {
    return (
        <section className="w-full py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full gap-10">

                {/* LEFT SIDE */}
                <div className="bg-gray-50 px-6 md:px-12 py-16">
                    <p className="uppercase text-xs tracking-widest text-gray/80 mb-2">
                        From our best dermatologist
                    </p>
                    <h2 className="text-4xl font-semibold text-black mb-12">
                        Popular Services
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: "Face Treatment", icon: "🧖‍♀️" },
                            { title: "Body Treatment", icon: "🧍‍♀️" },
                            { title: "Breast Treatment", icon: "🤱" },
                            { title: "Mens Treatment", icon: "🧔" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white hover:bg-blue-400 p-10 flex flex-col items-center justify-center text-center rounded-2xl"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <p className="text-lg font-medium">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                
                {/* RIGHT SIDE */}
                <div
                    className="relative bg-cover bg-center bg-no-repeat px-6 md:px-16 py-20 flex items-center w-full h-[450px] top-30"
                    style={{
                        backgroundImage:
                            "url('https://i.ibb.co/W4TXWVkC/Laser-1.webp')",
                    }}
                >
                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative text-white w-full max-w-full md:max-w-3xl lg:max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 text-center md:text-left">
                            Client’s Testimonials
                        </h2>
                        <p className="uppercase text-xs sm:text-sm md:text-base tracking-widest text-white/80 mb-8 text-center md:text-left">
                            A bit of our trusted reviews
                        </p>

                        <div className="w-12 sm:w-16 h-[2px] bg-white mb-6 mx-auto md:mx-0"></div>

                        <p className="italic text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed text-center md:text-left">
                            “Pellentesque ac lectus nec leo euismod ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit amet risus.”
                        </p>

                        <p className="font-semibold text-lg sm:text-xl text-center md:text-left">John McHill</p>
                        <p className="text-sm sm:text-base text-white/80 mb-6 text-center md:text-left">Customer</p>

                        {/* dots */}
                        <div className="flex justify-center md:justify-start gap-2">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></span>
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full"></span>
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-white/50 rounded-full"></span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PopularAndTestimonials;
