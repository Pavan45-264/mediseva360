import React from 'react';

export default function DesktopFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#121212] text-[#44475B] dark:text-white flex flex-col transition-colors duration-200">
      {children}
    </div>
  );
}
