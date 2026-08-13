import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Connexion from '../bouton/connexion.jsx';
import apiClient from '../api/axios';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const username = event.target.username.value;
    const password = event.target.password.value;

    apiClient.post('/token', { username, password })
      .then((response) => {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('username', username);
        navigate('/accueil');
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 400) {
          setError('Nom d\'utilisateur ou mot de passe incorrect.');
        } else {
          setError('Impossible de contacter le serveur. Vérifiez que le backend est démarré.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden lg:flex flex-col justify-between bg-slate-900 px-10 py-12 text-white">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">EcoStock</h1>
              <p className="mt-3 text-sm text-slate-300 leading-6">
                Gérez vos stocks avec une interface simple, rapide et professionnelle.
              </p>
            </div>
            <div className="mt-10 space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">Accès sécurisé</p>
                <p className="mt-1">Connexion réservée aux utilisateurs autorisés.</p>
              </div>
              <div>
                <p className="font-medium text-white">Suivi en temps réel</p>
                <p className="mt-1">Consultez vos données et gardez le contrôle de votre activité.</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Bienvenue</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Connexion</h2>
              <p className="mt-2 text-sm text-slate-600">
                Connectez-vous à votre espace pour continuer.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label for="username" className="mb-2 block text-sm font-medium text-slate-700">Nom d'utilisateur</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                  placeholder="Entrez votre nom d'utilisateur"
                />
              </div>

              <div>
                <label for="password" className="mb-2 block text-sm font-medium text-slate-700">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                  placeholder="Entrez votre mot de passe"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500" />
                  Se souvenir de moi
                </label>
                <a href="#" className="font-medium text-slate-700 transition hover:text-slate-900">Mot de passe oublié ?</a>
              </div>

              <Connexion disabled={loading} label={loading ? 'Connexion…' : undefined} />

              {error && (
                <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <p>
                En cas de problème d’accès, veuillez contacter l’administrateur du système.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;