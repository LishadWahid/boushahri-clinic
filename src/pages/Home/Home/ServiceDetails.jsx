import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ServiceDetails = () => {

    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/services/${id}`)
            .then(res => setService(res.data))
            .catch(error => console.error(error));
    }, [id])

    if (!service) return <p>Loading...</p>

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <img
                src={service.image}
                alt={service.title}
                className="w-full h-96 object-cover rounded-lg"
            />
            <h2 className="text-4xl font-bold mt-6">{service.title}</h2>
            <p className="text-gray-600 mt-4">{service.description}</p>
        </div>
    );
};

export default ServiceDetails;