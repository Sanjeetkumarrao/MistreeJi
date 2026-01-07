import React, { useState } from 'react';

const WorkerDashboard = () => {
  // Dummy data for pending jobs
  const [jobs, setJobs] = useState([
    { id: 1, customer: 'Aman Sharma', address: 'Flat 402, Green Villa, Sec-62', issue: 'Kitchen light not working', time: 'Today, 4:00 PM', status: 'Pending' },
    { id: 2, customer: 'Priya Verma', address: 'House 12, Block C, Noida', issue: 'Switchboard sparking', time: 'Tomorrow, 10:00 AM', status: 'Pending' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* --- TOP HEADER (WORKER PROFILE) --- */}
      <div className="bg-gray-900 pt-8 pb-12 px-6 rounded-b-[3rem] shadow-xl relative z-10 text-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-xl font-bold border-2 border-orange-400">
              S
            </div>
            <div>
              <h3 className="font-bold text-lg">Ram Singh</h3>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Verified Electrician ✅</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Status</span>
            <div className="flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-500 text-[10px] font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* --- EARNINGS CARD --- */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-6 shadow-2xl flex justify-between items-center -mb-20 relative z-20">
          <div>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
            <h2 className="text-3xl font-black mt-1">₹12,450</h2>
          </div>
          <div className="text-right">
            <p className="text-orange-100 text-xs font-bold uppercase tracking-wider">Jobs Done</p>
            <h2 className="text-3xl font-black mt-1 text-center font-mono">24</h2>
          </div>
        </div>
      </div>

      {/* --- NEW REQUESTS SECTION --- */}
      <div className="mt-20 px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-extrabold text-gray-800 text-lg">New Job Requests</h3>
          <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded-lg">3 NEW</span>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📍</span>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{job.customer}</h4>
                    <p className="text-[10px] text-gray-400 font-medium truncate w-40">{job.address}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-lg text-gray-500">{job.time}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                <p className="text-[11px] text-gray-600 font-medium leading-relaxed italic italic">"{job.issue}"</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-xs active:scale-95 transition-all">
                  DECLINE
                </button>
                <button className="flex-1 bg-orange-600 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-orange-200 active:scale-95 transition-all">
                  ACCEPT JOB
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="px-6 mt-8">
        <h3 className="font-extrabold text-gray-800 text-lg mb-4">Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center">
            <p className="text-yellow-500 text-2xl mb-1">⭐</p>
            <h4 className="font-bold text-gray-800">4.9</h4>
            <p className="text-[9px] text-gray-400 font-bold uppercase">Rating</p>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 text-center">
            <p className="text-blue-500 text-2xl mb-1">⏰</p>
            <h4 className="font-bold text-gray-800">98%</h4>
            <p className="text-[9px] text-gray-400 font-bold uppercase">On-Time</p>
          </div>
        </div>
      </div>

      {/* --- WORKER BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-2xl">
        <div className="flex flex-col items-center gap-1 text-orange-600">
          <span className="text-xl">💼</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Jobs</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">📈</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Growth</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">💰</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Wallet</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">⚙️</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;