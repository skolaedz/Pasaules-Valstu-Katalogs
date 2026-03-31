/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Login } from "./features/auth/Login";
import { User } from "./features/auth/types";
import { CountryList } from "./features/countries/CountryList";
import { CountryDetails } from "./features/countries/CountryDetails";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const handleLogout = () => {
    setUser(null);
    setSelectedCountryCode(null);
  };

  if (!user) {
    return <Login onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setSelectedCountryCode(null)}
          >
            Pasaules Valstis
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:inline">
              Sveiki, <span className="font-semibold">{user.username}</span>!
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition font-medium"
            >
              Iziet
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCountryCode ? (
          <CountryDetails
            countryCode={selectedCountryCode}
            onBack={() => setSelectedCountryCode(null)}
          />
        ) : (
          <CountryList onSelectCountry={(code) => setSelectedCountryCode(code)} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© 2026 Programmēšana II Projekts.</p>
          <p className="mt-1">Dati no REST Countries API.</p>
        </div>
      </footer>
    </div>
  );
}
