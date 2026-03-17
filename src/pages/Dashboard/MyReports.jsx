import React, { useState, useEffect } from "react";
import { FileText, Download, Search, Calendar, Filter, Eye } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyReports = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Current User:", user?.email);

  // Since we don't have a dedicated reports API yet, 
  // we'll mock some data based on their appointments or generic medical records
  useEffect(() => {
    const fetchMockReports = async () => {
      try {
        setLoading(true);
        // We can simulate fetching or use appointment data as base
        const res = await axios.get('https://boushahri-clinic.vercel.app/appointments');
        console.log("All Appointments:", res.data);
        const userAppointments = res.data.filter(app => app.email === user?.email);
        console.log("User Appointments:", userAppointments);

        // Transform appointments into "Reports"
        const transformedReports = userAppointments.map((app, index) => ({
          id: `REP-${1000 + index}`,
          title: `${app.service} Summary`,
          date: app.date,
          type: "Consultation Report",
          doctor: app.person,
          status: "Available",
          fileSize: "1.2 MB"
        }));

        setReports(transformedReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMockReports();
    } else if (user === null) {
      // If user is explicitly null (not logged in), stop loading
      setLoading(false);
    }
  }, [user]);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Medical Reports</h1>
          <p className="text-gray-500 mt-2">Access and download your official clinic documentation.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-110"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">{report.fileSize}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{report.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Calendar size={14} /> {report.date}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-2">Dr. {report.doctor}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100">
                    {report.status}
                  </span>
                  <div className="flex gap-2">
                    <button title="View Online" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                    <button title="Download PDF" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-gray-100 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <FileText size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">No Reports Available</h2>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            Once you complete your consultation, your medical reports will appear here for download.
          </p>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
            <Calendar size={32} />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">Need a specific report?</h3>
            <p className="text-white/80 mt-1">If you can't find a report from a previous visit, please contact our support desk.</p>
          </div>
          <button className="md:ml-auto px-6 py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
            Request Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
