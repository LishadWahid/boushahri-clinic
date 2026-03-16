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
import Brands from './Brands';
import DentalServices from './DentalServices';
import ClientsStory from '../ClientsStory';
import Coverage from '../Coverage';



const Home = () => {
    return (
        <div className="bg-gray-20"
            >
            <Banner />
            <Brands />
            <PatientsCare />
            <DentalServices />
            <MordernHealthcare />
            <ConsultationForm />
            <ClientsStory />
            <PopularAndTestimonials />
            {/* <HealthcareResources/> */}
            {/* <ExpertsSection/> */}
            <ClinicIntro />
            <VideoHero />
            <Coverage/>
        </div>
    );
};

export default Home;