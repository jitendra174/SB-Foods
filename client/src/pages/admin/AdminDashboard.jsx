import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Utensils, LogOut, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;

    sessionStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 text-2xl font-extrabold text-red-600">SB Admin</div>
        <nav className="mt-4 flex-1 space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition rounded-r-full border-l-4 
              ${isActive ? 'bg-red-100 border-red-600 text-red-600 font-semibold' : 'border-transparent text-gray-700 hover:bg-red-50 hover:text-red-600'}`
            }
          >
            <Utensils className="w-5 h-5" />
            Add Food
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition rounded-r-full border-l-4 
              ${isActive ? 'bg-red-100 border-red-600 text-red-600 font-semibold' : 'border-transparent text-gray-700 hover:bg-red-50 hover:text-red-600'}`
            }
          >
            <ClipboardList className="w-5 h-5" />
            View Orders
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-md px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Hello, Admin</span>
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="admin avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
