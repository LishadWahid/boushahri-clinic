import React from "react";

const PopularAndTestimonials = () => {
    return (
        <section className="w-full mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

                {/* LEFT SIDE */}
                <div className="bg-[#2e80eb] px-6 md:px-12 py-16">
                    <p className="uppercase text-xs tracking-widest text-white/80 mb-2">
                        From our best dermatologist
                    </p>
                    <h2 className="text-4xl font-semibold text-white mb-12">
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
                                className="bg-white hover:bg-[#3fabf3] p-10 flex flex-col items-center justify-center text-center rounded-2xl"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <p className="text-lg font-medium">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div
                    className="relative bg-cover bg-center px-6 md:px-16 py-20 flex items-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e')",
                    }}
                >
                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative text-white max-w-xl">
                        <h2 className="text-4xl font-semibold mb-2">
                            Client’s Testimonials
                        </h2>
                        <p className="uppercase text-xs tracking-widest text-white/80 mb-8">
                            A bit of our trusted reviews
                        </p>

                        <div className="w-16 h-[2px] bg-white mb-6"></div>

                        <p className="italic text-lg mb-8 leading-relaxed">
                            “Pellentesque ac lectus nec leo euismod ultrices.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit amet risus.”
                        </p>

                        <p className="font-semibold text-lg">John McHill</p>
                        <p className="text-sm text-white/80 mb-6">Customer</p>

                        {/* dots */}
                        <div className="flex gap-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                            <span className="w-2 h-2 bg-white/50 rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularAndTestimonials;
