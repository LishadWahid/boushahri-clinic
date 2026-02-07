import React from "react";

const posts = [
    {
        category: "PATIENT RESOURCES",
        title: "How electronic health records are changing patient care",
        date: "Dec 25, 2025",
        comments: "2 Comments",
        image:
            "https://i.ibb.co/SwN9F8g2/Skin-W-4.webp",
    },
    {
        category: "MEDICAL INSIGHTS",
        title: "Navigating your treatment options for better outcomes",
        date: "Dec 25, 2025",
        comments: "2 Comments",
        image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
        category: "MEDICAL INSIGHTS",
        title: "How to manage chronic conditions with collaborative care",
        date: "Dec 25, 2025",
        comments: "No Comments",
        image:
            "https://i.ibb.co/MknxZ9GM/Skin-W-2.webp",
    },
    {
        category: "PATIENT RESOURCES",
        title: "Simple ways to communicate effectively with your doctor",
        date: "Dec 25, 2025",
        comments: "No Comments",
        image:
            "https://images.unsplash.com/photo-1576765607924-3f7b8410a787",
    },
];

const HealthcareResources = () => {
    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="uppercase text-xs tracking-widest text-gray-500 mb-3">
                        Redefining modern patient care
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
                        We deliver trusted <br className="hidden md:block" />
                        healthcare services
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {posts.map((post, index) => (
                        <div key={index}>
                            {/* Image */}
                            <div className="overflow-hidden rounded-3xl mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-[260px] object-cover hover:scale-105 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                {post.category}
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-3">
                                {post.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {post.date} • {post.comments}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthcareResources;
