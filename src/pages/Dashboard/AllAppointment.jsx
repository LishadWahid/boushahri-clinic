import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AllAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = () => {
        fetch("http://localhost:3000/appointments")
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            axios.delete(`http://localhost:3000/appointments/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        alert('Deleted successfully!');
                        fetchAppointments();
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text('All Appointments Report', 14, 20);
            doc.setFontSize(10);
            doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
            doc.text(`Total Appointments: ${appointments.length}`, 14, 34);

            autoTable(doc, {
                startY: 40,
                head: [['Patient Name', 'Email', 'Service', 'Doctor/Person', 'Date']],
                body: appointments.map(app => [
                    app.name,
                    app.email,
                    app.service,
                    app.person,
                    app.date
                ]),
                theme: 'grid',
                headStyles: { fillColor: [59, 130, 246] },
                styles: { fontSize: 8 }
            });

            doc.save(`Appointments_Report_${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error('PDF Error:', error);
            alert('Could not generate PDF.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-6 w-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
                <button
                    onClick={generatePDF}
                    disabled={appointments.length === 0}
                    className="btn btn-sm btn-primary flex items-center gap-2"
                >
                    <Download size={16} />
                    Download PDF
                </button>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700">
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th>Doctor/Person</th>
                            <th>Appointment Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((app) => (
                                <tr key={app._id} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="font-medium text-gray-800">{app.name}</td>
                                    <td className="text-gray-600">{app.email}</td>
                                    <td>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {app.service}
                                        </span>
                                    </td>
                                    <td className="text-gray-600">{app.person}</td>
                                    <td className="text-gray-600 font-medium">{app.date}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleDelete(app._id)}
                                                className="btn btn-xs btn-error text-white gap-1"
                                            >
                                                <Trash2 size={12} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-400">
                                    No appointments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAppointment;
