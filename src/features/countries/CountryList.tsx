import React, { useEffect, useState } from "react";
import { getAllCountries } from "./api";
import { Country } from "./types";
import { CountryCard } from "./CountryCard";

interface CountryListProps {
  onSelectCountry: (code: string) => void;
}

export const CountryList: React.FC<CountryListProps> = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          throw new Error("Saņemtie dati nav masīva formātā.");
        }
      } catch (err: any) {
        console.error("Fails to load countries:", err);
        setError("Neizdevās ielādēt valstu datus. Lūdzu, mēģiniet vēlreiz vēlāk.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === "" || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-semibold">
        {error}
      </div>
    );
  }

  const regions = Array.from(new Set(countries.map((c) => c.region))).sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Meklēt valsti..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-full md:w-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Visi reģioni</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={onSelectCountry}
          />
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          Netika atrasta neviena valsts ar šādiem kritērijiem.
        </p>
      )}
    </div>
  );
};
