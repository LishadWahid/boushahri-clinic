import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

// Count-up hook
function useCountUp(target, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

const VideoHero = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const scrollToNext = () => {
        if (sectionRef.current) {
            const next = sectionRef.current.nextElementSibling;
            if (next) next.scrollIntoView({ behavior: "smooth" });
        }
    };

    const stats = [
        { target: 20000, suffix: "K+", divisor: 1000, label: "Patients Served" },
        { target: 15, suffix: "+", divisor: 1, label: "Years of Excellence" },
        { target: 30, suffix: "+", divisor: 1, label: "Specialists" },
        { target: 98, suffix: "%", divisor: 1, label: "Satisfaction Rate" },
    ];

    // Individual counters — each only starts after isVisible
    const c0 = useCountUp(20, 3500, isVisible); // 20 → display as "20K+"
    const c1 = useCountUp(15, 3200, isVisible);
    const c2 = useCountUp(30, 3200, isVisible);
    const c3 = useCountUp(98, 3500, isVisible);
    const counts = [c0, c1, c2, c3];
    const suffixes = ["K+", "+", "+", "%"];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

                /* ── Section ── */
                .vh2-section {
                    position: relative;
                    width: 100%;
                    height: 70vh;
                    min-height: 500px;
                    max-height: 720px;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                    overflow: hidden;
                }

                /* ── Video ── */
                .vh2-video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }

                /* ── Overlays ── */
                .vh2-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    background:
                        linear-gradient(to bottom,
                            rgba(3,12,32,0.15) 0%,
                            rgba(3,12,32,0.25) 50%,
                            rgba(3,12,32,0.60) 100%
                        );
                }
                .vh2-vignette {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    background: radial-gradient(ellipse 100% 90% at 50% 40%, transparent 60%, rgba(0,0,0,0.18) 100%);
                }

                /* ── Glow orbs ── */
                .vh2-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                    z-index: 3;
                    animation: vh2-orb-float 9s ease-in-out infinite;
                }
                .vh2-orb-1 {
                    width: 500px; height: 500px;
                    top: -120px; left: -120px;
                    background: radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%);
                    animation-delay: 0s;
                }
                .vh2-orb-2 {
                    width: 400px; height: 400px;
                    bottom: 80px; right: -80px;
                    background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
                    animation-delay: 3s;
                }
                @keyframes vh2-orb-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-28px); }
                }

                /* ── Main content wrapper ── */
                .vh2-body {
                    position: relative;
                    z-index: 10;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 70px 20px 90px;
                    text-align: center;
                    max-width: 860px;
                    margin: 0 auto;
                    width: 100%;
                }

                /* ── Tag ── */
                .vh2-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 18px;
                    border-radius: 999px;
                    background: rgba(14,165,233,0.15);
                    border: 1px solid rgba(14,165,233,0.35);
                    color: #7dd3fc;
                    font-size: 11.5px;
                    font-weight: 600;
                    letter-spacing: 1.8px;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
                }
                .vh2-tag.show { opacity: 1; transform: translateY(0); }
                .vh2-tag-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #38bdf8;
                    animation: vh2-pulse 2.2s ease-in-out infinite;
                }
                @keyframes vh2-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.6); }
                    50% { box-shadow: 0 0 0 5px rgba(56,189,248,0); }
                }

                /* ── Headline ── */
                .vh2-h1 {
                    margin: 0 0 12px;
                    font-size: clamp(36px, 6.5vw, 76px);
                    font-weight: 900;
                    line-height: 1.06;
                    letter-spacing: -1.5px;
                    color: #ffffff;
                    opacity: 0;
                    transform: translateY(22px);
                    transition: opacity 0.75s ease 0.25s, transform 0.75s ease 0.25s;
                }
                .vh2-h1.show { opacity: 1; transform: translateY(0); }
                .vh2-accent {
                    position: relative;
                    display: inline-block;
                    background: linear-gradient(110deg, #38bdf8 0%, #818cf8 55%, #c084fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .vh2-accent::after {
                    content: '';
                    position: absolute;
                    left: 4%;
                    bottom: -6px;
                    width: 92%;
                    height: 3px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
                    opacity: 0.6;
                }

                /* ── Sub ── */
                .vh2-sub {
                    margin: 20px auto 40px;
                    max-width: 560px;
                    font-size: clamp(14px, 1.8vw, 17px);
                    color: rgba(255,255,255,0.65);
                    line-height: 1.8;
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.75s ease 0.4s, transform 0.75s ease 0.4s;
                }
                .vh2-sub.show { opacity: 1; transform: translateY(0); }

                /* ── Trust badges ── */
                .vh2-trust {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin-bottom: 36px;
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.75s ease 0.5s, transform 0.75s ease 0.5s;
                }
                .vh2-trust.show { opacity: 1; transform: translateY(0); }
                .vh2-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 14px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.13);
                    color: rgba(255,255,255,0.82);
                    font-size: 12px;
                    font-weight: 500;
                    backdrop-filter: blur(8px);
                    transition: all 0.25s ease;
                }
                .vh2-badge:hover {
                    background: rgba(56,189,248,0.15);
                    border-color: rgba(56,189,248,0.4);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .vh2-badge svg { color: #38bdf8; flex-shrink: 0; }

                /* ── CTA Buttons ── */
                .vh2-cta {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    flex-wrap: wrap;
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.75s ease 0.6s, transform 0.75s ease 0.6s;
                }
                .vh2-cta.show { opacity: 1; transform: translateY(0); }

                .vh2-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 15px 30px;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #0ea5e9, #6366f1);
                    color: #fff;
                    font-size: 14.5px;
                    font-weight: 700;
                    text-decoration: none;
                    box-shadow: 0 6px 28px rgba(14,165,233,0.4);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                .vh2-btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 36px rgba(14,165,233,0.55);
                }
                .vh2-btn-ghost {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 15px 30px;
                    border-radius: 12px;
                    background: rgba(255,255,255,0.08);
                    border: 1.5px solid rgba(255,255,255,0.22);
                    color: #fff;
                    font-size: 14.5px;
                    font-weight: 600;
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                .vh2-btn-ghost:hover {
                    background: rgba(255,255,255,0.15);
                    border-color: rgba(56,189,248,0.45);
                    transform: translateY(-3px);
                }

                /* ── Stats bar ── */
                .vh2-stats {
                    position: absolute;
                    bottom: 0;
                    left: 0; right: 0;
                    z-index: 10;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    background: rgba(5,15,40,0.75);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border-top: 1px solid rgba(255,255,255,0.09);
                    opacity: 0;
                    transition: opacity 0.8s ease 0.7s;
                }
                .vh2-stats.show { opacity: 1; }
                .vh2-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                    padding: 18px 12px;
                    border-right: 1px solid rgba(255,255,255,0.07);
                    transition: background 0.25s;
                }
                .vh2-stat:last-child { border-right: none; }
                .vh2-stat:hover { background: rgba(255,255,255,0.04); }
                .vh2-stat-num {
                    font-size: clamp(20px, 2.5vw, 28px);
                    font-weight: 800;
                    line-height: 1;
                    background: linear-gradient(135deg, #fff 30%, #7dd3fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .vh2-stat-lbl {
                    font-size: clamp(10px, 1.1vw, 12px);
                    color: rgba(255,255,255,0.5);
                    font-weight: 500;
                    letter-spacing: 0.3px;
                }

                /* ── Controls ── */
                .vh2-controls {
                    position: absolute;
                    right: 24px;
                    bottom: 90px;
                    z-index: 15;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .vh2-ctrl-btn {
                    width: 42px; height: 42px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    color: white;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }
                .vh2-ctrl-btn:hover {
                    background: rgba(56,189,248,0.22);
                    border-color: #38bdf8;
                    transform: scale(1.1);
                }

                /* ── Scroll arrow ── */
                .vh2-scroll {
                    position: absolute;
                    bottom: 90px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 15;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    border: none;
                    background: none;
                    cursor: pointer;
                    color: rgba(255,255,255,0.45);
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-family: inherit;
                    transition: color 0.25s;
                }
                .vh2-scroll:hover { color: rgba(255,255,255,0.9); }
                .vh2-scroll-track {
                    width: 1.5px;
                    height: 36px;
                    background: rgba(255,255,255,0.15);
                    position: relative;
                    overflow: hidden;
                    border-radius: 2px;
                }
                .vh2-scroll-dot {
                    position: absolute;
                    top: -10px; left: 50%;
                    transform: translateX(-50%);
                    width: 3px; height: 10px;
                    border-radius: 2px;
                    background: #38bdf8;
                    animation: vh2-scroll-drop 1.6s ease-in-out infinite;
                }
                @keyframes vh2-scroll-drop {
                    0%   { top: -10px; opacity: 0; }
                    20%  { opacity: 1; }
                    100% { top: 40px; opacity: 0; }
                }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .vh2-body { padding: 80px 16px 90px; }
                    .vh2-h1 { letter-spacing: -0.5px; }
                    .vh2-trust { gap: 8px; }
                    .vh2-controls { right: 14px; bottom: 80px; }
                    .vh2-scroll { display: none; }
                    .vh2-stats { grid-template-columns: repeat(2, 1fr); }
                    .vh2-stat:nth-child(2) { border-right: none; }
                    .vh2-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); }
                    .vh2-stat:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.07); }
                }
                @media (max-width: 480px) {
                    .vh2-badge { font-size: 11px; padding: 6px 11px; }
                    .vh2-btn-primary, .vh2-btn-ghost { padding: 13px 22px; font-size: 13.5px; width: 100%; justify-content: center; }
                    .vh2-cta { flex-direction: column; align-items: stretch; padding: 0 8px; }
                    .vh2-stat-num { font-size: 20px; }
                    .vh2-stat { padding: 14px 8px; }
                }
            `}</style>

            <section ref={sectionRef} className="vh2-section">

                {/* Video */}
                <video
                    ref={videoRef}
                    className="vh2-video"
                    autoPlay muted loop playsInline preload="auto"
                >
                    <source
                        src="https://md.axiomthemes.com/wp-content/uploads/2025/12/new-custom-video-001.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Overlays */}
                <div className="vh2-overlay" />
                <div className="vh2-vignette" />
                <div className="vh2-orb vh2-orb-1" />
                <div className="vh2-orb vh2-orb-2" />

                {/* ── Centre Content ── */}
                <div className="vh2-body">

                    {/* Tag */}
                    <div className={`vh2-tag ${isVisible ? "show" : ""}`}>
                        <span className="vh2-tag-dot" />
                        Boushahri Clinic &nbsp;·&nbsp; Salmiya, Kuwait
                    </div>

                    {/* Headline */}
                    <h1 className={`vh2-h1 ${isVisible ? "show" : ""}`}>
                        Your Health,{" "}
                        <span className="vh2-accent">Our Priority</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`vh2-sub ${isVisible ? "show" : ""}`}>
                        World-class dental &amp; medical care delivered with compassion,
                        precision, and the latest technology — right here in Kuwait.
                    </p>

                    {/* Trust badges */}
                    <div className={`vh2-trust ${isVisible ? "show" : ""}`}>
                        {[
                            {
                                label: "ISO Certified",
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>,
                            },
                            {
                                label: "Expert Team",
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>,
                            },
                            {
                                label: "24/7 Emergency",
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 10h-2v-2h2v2zm0-4h-2V5h2v4z" /></svg>,
                            },
                            {
                                label: "Modern Facility",
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
                            },
                        ].map((b, i) => (
                            <span key={i} className="vh2-badge">
                                {b.icon}
                                {b.label}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className={`vh2-cta ${isVisible ? "show" : ""}`}>
                        <Link to='/consultation' className="vh2-btn-primary">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                            Book Appointment
                        </Link>
                        <a href="#services" className="vh2-btn-ghost">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                            </svg>
                            Our Services
                        </a>
                    </div>
                </div>

                {/* Stats bar */}
                <div className={`vh2-stats ${isVisible ? "show" : ""}`}>
                    {stats.map((s, i) => (
                        <div key={i} className="vh2-stat">
                            <span className="vh2-stat-num">{counts[i]}{suffixes[i]}</span>
                            <span className="vh2-stat-lbl">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="vh2-controls">
                    <button className="vh2-ctrl-btn" onClick={toggleMute} aria-label="Toggle mute">
                        {isMuted ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Scroll indicator */}
                <button className="vh2-scroll" onClick={scrollToNext} aria-label="Scroll down">
                    <span style={{ fontFamily: "inherit" }}>Scroll</span>
                    <div className="vh2-scroll-track">
                        <div className="vh2-scroll-dot" />
                    </div>
                </button>

            </section>
        </>
    );
};

export default VideoHero;
