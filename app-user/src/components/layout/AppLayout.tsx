import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[var(--color-panel)]">
      <Sidebar />
      {/* Responsive margin-left: 0 on mobile, 64px (w-16) on desktop */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-16">
        <TopNav />
        {/* Responsive padding:
            - Mobile (xs): px-3 py-4
            - Small (sm): px-4 py-5
            - Medium (md): px-6 py-6
            - Large (lg+): px-8 py-8
        */}
        <main className="flex-1 overflow-y-auto px-3 py-4 xs:px-4 xs:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
          {/* Max width constraint for ultra-wide screens */}
          <div className="max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
