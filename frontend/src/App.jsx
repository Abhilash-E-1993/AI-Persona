import React, { useState } from 'react';
import Landing from './pages/Landing';
import Chat from './pages/Chat';

/**
 * Main React Application Entry.
 * Coordinates view state based on mentor selection.
 */
export default function App() {
  const [activeMentor, setActiveMentor] = useState(null);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-200 flex flex-col antialiased selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Page Content Area */}
      <main className="flex-1 flex flex-col relative">
        {activeMentor ? (
          <Chat
            mentor={activeMentor}
            onExit={() => setActiveMentor(null)}
            onSelectMentor={setActiveMentor}
          />
        ) : (
          <Landing onSelectMentor={setActiveMentor} />
        )}
      </main>

    </div>
  );
}
