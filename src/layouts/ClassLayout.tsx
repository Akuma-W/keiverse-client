import { Outlet } from 'react-router-dom';

// import { useState } from 'react';
// import { AppSidebar } from '@/components/layout/AppSidebar';

const ClassLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ClassLayout;
