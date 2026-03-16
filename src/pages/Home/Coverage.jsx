import React, { useState, useRef, useEffect } from 'react';

// Count-up hook
function useCountUp(target, duration, start) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

const Coverage = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapStarted, setMapStarted] = useState(false);
    const [statsStarted, setStatsStarted] = useState(false);
    const mapRef = useRef(null);
    const statsRef = useRef(null);

    // Load map when section enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMapStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (mapRef.current) observer.observe(mapRef.current);
        return () => observer.disconnect();
    }, []);

    // Start stats count when stats row enters viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    // Count-up values (targets)
    const s0 = useCountUp(15, 2800, statsStarted); // 15+
    const s1 = useCountUp(20, 3200, statsStarted); // 20K+
    const s2 = useCountUp(30, 2800, statsStarted); // 30+
    const s3 = useCountUp(1, 1500, statsStarted); // 1

    return (
        <section className="coverage-section">
            {/* Background decoration */}
            <div className="coverage-bg-decoration" />

            <div className="coverage-container">
                {/* Header */}
                <div className="coverage-header">
                    <span className="coverage-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        Find Us
                    </span>
                    <h2 className="coverage-title">
                        Our <span className="coverage-title-accent">Location</span>
                    </h2>
                    <p className="coverage-subtitle">
                        Visit Boushahri Clinic — delivering world-class dental & medical care in the heart of Salmiya, Kuwait.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="coverage-grid">

                    {/* Info Cards (Left Side) */}
                    <div className="coverage-info-panel">

                        {/* Clinic Info Card */}
                        <div className="coverage-clinic-card">
                            <div className="clinic-card-icon-wrapper">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm0 4H7v-2h2v2zm4-4h-2V9h2v2zm0 4h-2v-2h2v2zm4-4h-2V9h2v2zm0 4h-2v-2h2v2zM6 4h12v4H6V4z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="clinic-card-name">Boushahri Clinic</h3>
                                <p className="clinic-card-tagline">Premium Dental & Medical Care</p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="coverage-details-list">

                            <div className="coverage-detail-item">
                                <div className="detail-icon-box detail-icon-blue">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="detail-label">Address</p>
                                    <p className="detail-value">Salmiya, Kuwait City</p>
                                    <p className="detail-sub">Block 12, Ahmad Al-Jaber St.</p>
                                </div>
                            </div>

                            <div className="coverage-detail-item">
                                <div className="detail-icon-box detail-icon-green">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="detail-label">Working Hours</p>
                                    <p className="detail-value">Sat – Thu: 9:00 AM – 9:00 PM</p>
                                    <p className="detail-sub">Friday: 4:00 PM – 9:00 PM</p>
                                </div>
                            </div>

                            <div className="coverage-detail-item">
                                <div className="detail-icon-box detail-icon-purple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="detail-label">Contact</p>
                                    <p className="detail-value">+965 2222 0000</p>
                                    <p className="detail-sub">info@boushariclinic.com</p>
                                </div>
                            </div>

                        </div>

                        {/* Direction Button */}
                        <a
                            href="https://maps.app.goo.gl/2Nwx55EzEurULbuXA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="coverage-direction-btn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                            </svg>
                            Get Directions
                        </a>

                    </div>

                    {/* Map (Right Side) */}
                    <div className="coverage-map-wrapper" ref={mapRef}>
                        <div className="coverage-map-frame">
                            {/* Skeleton shown until map loads */}
                            <div
                                className="map-loader"
                                style={{ opacity: mapLoaded ? 0 : 1, pointerEvents: mapLoaded ? 'none' : 'auto' }}
                            >
                                <div className="map-loader-spinner" />
                                <p>Loading Map...</p>
                            </div>

                            {/* Only inject iframe when section is visible */}
                            {mapStarted && (
                                <iframe
                                    title="Boushahri Clinic Location"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=48.0573%2C29.3175%2C48.0973%2C29.3575&layer=mapnik"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 0,
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: mapLoaded ? 1 : 0,
                                        transition: 'opacity 0.5s ease',
                                    }}
                                    allowFullScreen=""
                                    loading="eager"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    onLoad={() => setMapLoaded(true)}
                                />
                            )}

                            {/* Custom Clinic Marker Overlay */}
                            {mapLoaded && (
                                <div className="map-custom-marker">
                                    <div className="map-marker-popup">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
                                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                                        </svg>
                                        <span>Boushahri Clinic</span>
                                    </div>
                                    <div className="map-marker-pin">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                        </svg>
                                    </div>
                                    <div className="map-marker-ring" />
                                </div>
                            )}
                        </div>

                        {/* Map Badge */}
                        <div className="map-location-badge">
                            <div className="map-badge-dot" />
                            <span>Boushahri Clinic — Salmiya, Kuwait</span>
                        </div>
                    </div>

                </div>

                {/* Stats Row */}
                <div className="coverage-stats-row" ref={statsRef}>
                    {[
                        { value: s0, suffix: '+', label: 'Years of Excellence' },
                        { value: s1, suffix: 'K+', label: 'Happy Patients' },
                        { value: s2, suffix: '+', label: 'Expert Specialists' },
                        { value: s3, suffix: '', label: 'Prime Location' },
                    ].map((stat, i) => (
                        <div className="coverage-stat-card" key={i}>
                            <span className="stat-number">{stat.value}{stat.suffix}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
                .coverage-section {
                    position: relative;
                    background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0faf5 100%);
                    padding: 100px 0;
                    overflow: hidden;
                }
                .coverage-bg-decoration {
                    position: absolute;
                    top: -200px;
                    right: -200px;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }
                .coverage-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Header */
                .coverage-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .coverage-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #dbeafe, #e0f2fe);
                    color: #1d4ed8;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 6px 16px;
                    border-radius: 999px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }
                .coverage-title {
                    font-size: clamp(32px, 5vw, 48px);
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0 0 16px;
                    line-height: 1.1;
                }
                .coverage-title-accent {
                    background: linear-gradient(135deg, #2563eb, #0ea5e9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .coverage-subtitle {
                    color: #64748b;
                    font-size: 17px;
                    max-width: 560px;
                    margin: 0 auto;
                    line-height: 1.7;
                }

                /* Grid */
                .coverage-grid {
                    display: grid;
                    grid-template-columns: 360px 1fr;
                    gap: 32px;
                    align-items: stretch;
                    margin-bottom: 48px;
                }
                @media (max-width: 900px) {
                    .coverage-grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* Info Panel */
                .coverage-info-panel {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .coverage-clinic-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    background: linear-gradient(135deg, #1d4ed8, #0ea5e9);
                    border-radius: 20px;
                    padding: 24px 20px;
                    color: white;
                    box-shadow: 0 8px 32px rgba(29,78,216,0.3);
                }
                .clinic-card-icon-wrapper {
                    width: 56px;
                    height: 56px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .clinic-card-name {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 4px;
                }
                .clinic-card-tagline {
                    font-size: 13px;
                    opacity: 0.85;
                    margin: 0;
                }

                /* Details List */
                .coverage-details-list {
                    background: white;
                    border-radius: 20px;
                    padding: 8px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.07);
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .coverage-detail-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    padding: 16px;
                    border-radius: 14px;
                    transition: background 0.2s;
                }
                .coverage-detail-item:hover {
                    background: #f8fafc;
                }
                .detail-icon-box {
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .detail-icon-blue { background: #dbeafe; color: #2563eb; }
                .detail-icon-green { background: #dcfce7; color: #16a34a; }
                .detail-icon-purple { background: #ede9fe; color: #7c3aed; }

                .detail-label {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    color: #94a3b8;
                    margin: 0 0 3px;
                }
                .detail-value {
                    font-size: 14px;
                    font-weight: 600;
                    color: #1e293b;
                    margin: 0 0 2px;
                }
                .detail-sub {
                    font-size: 13px;
                    color: #64748b;
                    margin: 0;
                }

                /* Direction Button */
                .coverage-direction-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    color: white;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 16px rgba(15,23,42,0.25);
                }
                .coverage-direction-btn:hover {
                    background: linear-gradient(135deg, #1d4ed8, #0ea5e9);
                    box-shadow: 0 8px 24px rgba(29,78,216,0.35);
                    transform: translateY(-2px);
                }

                /* Map */
                .coverage-map-wrapper {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .coverage-map-frame {
                    position: relative;
                    width: 100%;
                    height: 480px;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
                    border: 3px solid white;
                }

                /* Custom Map Marker */
                .map-custom-marker {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -100%);
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: none;
                    animation: marker-drop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
                }
                @keyframes marker-drop {
                    from { opacity: 0; transform: translate(-50%, -130%); }
                    to   { opacity: 1; transform: translate(-50%, -100%); }
                }
                .map-marker-popup {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: white;
                    border-radius: 10px;
                    padding: 8px 14px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #1e293b;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
                    white-space: nowrap;
                    margin-bottom: 6px;
                    border: 1.5px solid #dbeafe;
                    animation: popup-appear 0.4s ease 0.3s both;
                }
                .map-marker-popup::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%) translateY(100%);
                    border: 6px solid transparent;
                    border-top-color: white;
                    margin-top: -6px;
                }
                @keyframes popup-appear {
                    from { opacity: 0; transform: scale(0.8) translateY(4px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .map-marker-pin {
                    width: 48px;
                    height: 48px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    background: linear-gradient(135deg, #2563eb, #0ea5e9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 6px 20px rgba(37,99,235,0.45);
                }
                .map-marker-pin svg {
                    transform: rotate(45deg);
                }
                .map-marker-ring {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: rgba(37,99,235,0.2);
                    margin-top: 4px;
                    animation: ring-pulse 2s ease-in-out infinite;
                }
                @keyframes ring-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(2); opacity: 0; }
                }

                .map-loader {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #f1f5f9;
                    gap: 16px;
                    color: #64748b;
                    font-size: 14px;
                }
                .map-loader-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #e2e8f0;
                    border-top-color: #2563eb;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .map-location-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: white;
                    border-radius: 999px;
                    padding: 10px 20px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #1e293b;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
                    align-self: flex-start;
                }
                .map-badge-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 0 3px rgba(34,197,94,0.25);
                    animation: pulse-dot 2s infinite;
                }
                @keyframes pulse-dot {
                    0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.25); }
                    50% { box-shadow: 0 0 0 7px rgba(34,197,94,0.1); }
                }

                /* Stats Row */
                .coverage-stats-row {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                @media (max-width: 768px) {
                    .coverage-stats-row {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 480px) {
                    .coverage-stats-row {
                        grid-template-columns: 1fr;
                    }
                }
                .coverage-stat-card {
                    background: white;
                    border-radius: 18px;
                    padding: 28px 20px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                    border: 1px solid rgba(226,232,240,0.8);
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    transition: all 0.3s ease;
                }
                .coverage-stat-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(29,78,216,0.12);
                    border-color: #bfdbfe;
                }
                .stat-number {
                    font-size: 36px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #2563eb, #0ea5e9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }
                .stat-label {
                    font-size: 13px;
                    color: #64748b;
                    font-weight: 500;
                }
            `}</style>
        </section>
    );
};

export default Coverage;
