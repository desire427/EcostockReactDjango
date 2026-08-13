import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Deconnexion from '../bouton/deconnexion.jsx';

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Utilisateur';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };
  return (
    <aside className="hidden w-72 flex-col justify-between border-r border-slate-800 bg-slate-900 p-6 lg:flex">
      <div>
        <div className="mb-10">
          <h1 className="text-xl font-semibold tracking-wide text-white">EcoStock</h1>
          <p className="mt-1 text-sm text-slate-400">Tableau de bord</p>
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/accueil"
            end
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/entrepots"
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            Entrepôts
          </NavLink>
          <NavLink
            to="/produits"
            className={({ isActive }) =>
              `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            Produits
          </NavLink>
        </nav>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
        <p className="text-slate-400">Bonjour, {username}</p>
        <Deconnexion onClick={handleLogout} />
      </div>
    </aside>
  );
}

export default Sidebar;
