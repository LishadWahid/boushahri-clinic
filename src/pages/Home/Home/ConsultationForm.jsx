import React, { useState } from 'react';

const ConsultationForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const date = e.target.date.value;
        const service = e.target.service.value;
        const person = e.target.person.value;

        // Validation
        if (!name || !email || !date || !service || !person) {
            setError('All fields are required');
            setSuccess(false);
            return;
        }

        // Reset message
        setError('');

        const formData = { name, email, date, service, person };
        console.log('Form data to send:', formData);

        try {
            const res = await fetch('http://localhost:3000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                e.target.reset();

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }
        } catch (error) {
            setError('Something went wrong!');
            setSuccess(false);
        }
    };

    return (
        <div className='relative w-full py-16 px-4 sm:px-8 lg:px-16 bg-cover bg-center bg-no-repeat' style={{
            backgroundImage: "url('https://i.ibb.co/HDYkh6pZ/Laser-4.webp')"
        }}>
            <div className="max-w-6xl mx-auto mt-10 p-6">
                <div className="text-center mb-6">
                    <p className="uppercase text-xs tracking-widest text-gray-500">Request For Your</p>
                    <h1 className="text-4xl font-bold text-blue-600">Consultation</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="select select-border text-gray-500 p-3 rounded-md w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="select select-border text-gray-500 p-3 rounded-md w-full"
                        />
                        <input
                            type="date"
                            name="date"
                            min={new Date().toISOString().split('T')[0]}
                            placeholder="Date"
                            className="select select-border text-gray-500 p-3 rounded-md w-full"
                        />
                        <select
                            name="service"
                            className="select select-border text-gray-500 p-3 rounded-md w-full"
                        >
                            <option value="">Type of Service</option>
                            <option>Consulting</option>
                            <option>Products</option>
                            <option>Servicing</option>
                        </select>
                        <select
                            name="person"
                            className="select select-border text-gray-500 p-3 rounded-md w-full"
                        >
                            <option value="">Name of Person</option>
                            <option>Salman</option>
                            <option>Sarah</option>
                            <option>Sibran</option>
                        </select>
                        <button className="btn bg-blue-600 text-white hover:bg-blue-900 p-3 rounded-md w-full sm:w-auto">
                            BOOK APPOINTMENT
                        </button>
                    </fieldset>

                    {/* Message */}
                    {success && (
                        <p className="text-green-500 mt-3 text-center">Appointment booked successfully!</p>
                    )}
                    {error && (
                        <p className="text-red-500 mt-3 text-center">{error}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ConsultationForm;
