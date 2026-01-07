import React, { useState } from 'react';

const CustomerDashboard = () => {
  const [search, setSearch] = useState('');

  const services = [
    { id: 1, name: 'Electrician', icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
    { id: 2, name: 'Plumber', icon: '🚰', color: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Carpenter', icon: '🪚', color: 'bg-orange-100 text-orange-700' },
    { id: 4, name: 'Painter', icon: '🎨', color: 'bg-green-100 text-green-700' },
    { id: 5, name: 'Mason', icon: '🧱', color: 'bg-red-100 text-red-700' },
    { id: 6, name: 'Cleaning', icon: '🧹', color: 'bg-purple-100 text-purple-700' },
  ];

  const nearbyWorkers = [
    { id: 101, name: 'Suresh Kumar', skill: 'Electrician', rating: 4.8, distance: '1.2 km', price: '₹199', image: 'S' },
    { id: 102, name: 'Aslam Bhai', skill: 'Plumber', rating: 4.5, distance: '2.5 km', price: '₹250', image: 'A' },
    { id: 103, name: 'Vikram Singh', skill: 'Carpenter', rating: 4.9, distance: '0.8 km', price: '₹300', image: 'V' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      {/* --- TOP HEADER --- */}
      <div className="bg-orange-600 pt-8 pb-10 px-6 rounded-b-[3rem] shadow-xl relative z-10">
        <div className="flex justify-between items-center text-white mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-xl">📍</div>
            <div>
              <p className="text-orange-100 text-[10px] uppercase tracking-wider font-bold">Your Location</p>
              <h3 className="font-bold text-sm flex items-center gap-1">
                Sector 62, Noida <span className="text-[10px]">▼</span>
              </h3>
            </div>
          </div>
          <button className="relative w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-orange-600"></span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg transition-colors group-focus-within:text-orange-600">🔍</span>
          <input 
            type="text" 
            placeholder="Search for 'Mistry' or 'Plumber'..." 
            className="w-full py-4 pl-12 pr-4 rounded-2xl outline-none shadow-2xl text-gray-700 bg-white placeholder:text-gray-400 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* --- PROMO BANNER --- */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-5 text-white shadow-lg flex items-center justify-between">
          <div className="max-w-[60%]">
            <h4 className="font-bold text-lg leading-tight">First Booking?</h4>
            <p className="text-gray-400 text-xs mt-1">Get 20% OFF on all services today.</p>
            <button className="mt-3 bg-orange-600 text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-wider">Claim Now</button>
          </div>
          <div className="text-5xl opacity-40">🛠️</div>
        </div>
      </div>

      {/* --- SERVICES (Horizontal Scroll) --- */}
      <div className="mt-8">
        <div className="flex justify-between items-center px-6 mb-4">
          <h3 className="font-extrabold text-gray-800 text-lg">Quick Services</h3>
          <button className="text-orange-600 text-xs font-bold bg-orange-50 px-3 py-1 rounded-full uppercase">All</button>
        </div>
        
        <div className="flex overflow-x-auto px-6 gap-5 no-scrollbar pb-2">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center flex-shrink-0 group">
              <div className={`w-16 h-16 ${service.color} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm border border-white active:scale-90 transition-all`}>
                {service.icon}
              </div>
              <span className="text-[11px] font-bold text-gray-500 mt-2 tracking-tight">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- WORKERS LIST --- */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-gray-800 text-lg">Top Experts Near You</h3>
        </div>
        
        <div className="space-y-4">
          {nearbyWorkers.map((worker) => (
            <div key={worker.id} className="bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-4 active:bg-gray-50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl font-black text-orange-600 shadow-inner">
                {worker.image}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{worker.name}</h4>
                    <p className="text-[10px] font-bold text-orange-600 bg-orange-50 inline-block px-2 py-0.5 rounded-md mt-1 italic">{worker.skill}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-black text-sm">{worker.price}</p>
                    <p className="text-[9px] text-gray-400 font-bold">Visiting Fee</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-0.5 rounded-lg">
                      <span className="text-yellow-500 text-[10px]">⭐</span>
                      <span className="text-[10px] font-black text-gray-700">{worker.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">📍 {worker.distance}</span>
                  </div>
                  <button className="bg-gray-900 text-white font-bold px-5 py-2 rounded-xl text-[10px] shadow-lg shadow-gray-200 active:scale-95 transition-all">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION (Fixed) --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-1 text-orange-600">
          <span className="text-xl font-bold">🏠</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">📅</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Bookings</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">💬</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Inbox</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span className="text-xl">👤</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;