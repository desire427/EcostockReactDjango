import React from 'react';

function WarehousePageShell({ sidebar, children }) {
  return (
    <div className="flex min-h-screen">
      {sidebar}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}

export default WarehousePageShell;
