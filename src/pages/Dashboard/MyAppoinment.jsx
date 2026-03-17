import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, Calendar, User, ClipboardList, Briefcase } from 'lucide-react';

const MyAppoinment = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('https://boushahri-clinic.vercel.app/appointments');
                // Filter appointments for the logged-in user
                const userAppointments = res.data.filter(app => app.email === user?.email);
                setAppointments(userAppointments);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching appointments:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchAppointments();
        }
    }, [user?.email]);

    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(20);
        doc.setTextColor(37, 99, 235); // Blue color
        doc.text('Boushahri Clinic - Appointment Report', 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Patient: ${user?.displayName || 'N/A'}`, 14, 32);
        doc.text(`Email: ${user?.email || 'N/A'}`, 14, 38);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 44);

        // Add Table
        const tableColumn = ["Date", "Service", "Doctor/Person", "Status"];
        const tableRows = appointments.map(app => [
            app.date,
            app.service,
            app.person,
            "Confirmed"
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 50,
            theme: 'grid',
            headStyles: { fillColor: [37, 99, 235], textColor: 255 },
            styles: { fontSize: 10, cellPadding: 3 },
        });

        doc.save(`${user?.displayName || 'User'}_Appointments.pdf`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        My Appointments
                    </h1>
                    <p className="text-gray-500 mt-1">View and manage your scheduled clinic visits.</p>
                </div>
                <button
                    onClick={downloadPDF}
                    disabled={appointments.length === 0}
                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none text-white px-6 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:bg-gray-300"
                >
                    <Download size={20} />
                    Download PDF
                </button>
            </div>

            {/* Content Section */}
            {appointments.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="py-4 px-6 text-gray-600 font-semibold uppercase text-xs tracking-wider">Appointment Info</th>
                                    <th className="py-4 px-6 text-gray-600 font-semibold uppercase text-xs tracking-wider">Service Details</th>
                                    <th className="py-4 px-6 text-gray-600 font-semibold uppercase text-xs tracking-wider">Specialist</th>
                                    <th className="py-4 px-6 text-gray-600 font-semibold uppercase text-xs tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((app, index) => (
                                    <tr key={index} className="hover:bg-blue-50/30 transition-colors border-b border-gray-50">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{app.date}</p>
                                                    <p className="text-xs text-gray-500">Scheduled Date</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-purple-100 rounded-md text-purple-600">
                                                    <Briefcase size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700">{app.service}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-green-100 rounded-md text-green-600">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-medium text-gray-700">{app.person}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                                Confirmed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-16 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                            <ClipboardList size={48} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No Appointments Found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2">
                        You haven't booked any consultations yet. Visit our services page to schedule your first visit.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyAppoinment;
