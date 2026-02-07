import React from 'react';
import Banner from '../Banner/Banner';
import MordernHealthcare from './MordernHealthcare';
import ConsultationForm from './ConsultationForm';
import ExpertsSection from './ExpertsSection';
import PatientsCare from './PatientsCare';
import PopularAndTestimonials from '../PopularAndTestimonials';
import VideoHero from './VideoHero';
import HealthcareResources from './HealthcareResources';
import ClinicIntro from './ClinicInfo';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PatientsCare/>
            <MordernHealthcare/>
            <ConsultationForm/>
            <PopularAndTestimonials/>
            <ClinicIntro/>
            <HealthcareResources/>
            <VideoHero/>
            <ExpertsSection/>
        </div>
    );
};

export default Home;