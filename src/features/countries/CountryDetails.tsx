import React, { useEffect, useState } from "react";
import { getCountryByCode } from "./api";
import { Country } from "./types";

interface CountryDetailsProps {
  countryCode: string;
  onBack: () => void;
}

export const CountryDetails: React.FC<CountryDetailsProps> = ({
  countryCode,
  onBack,
}) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCountryByCode(countryCode);
        
        if (data && data.name) {
          setCountry(data);
        } else {
          throw new Error("Valsts dati netika atrasti vai ir nepilnīgi.");
        }
      } catch (err: any) {
        console.error("Error loading country details:", err);
        setError("Neizdevās ielādēt valsts informāciju.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-semibold">
        {error || "Valsts netika atrasta."}
        <button
          onClick={onBack}
          className="block mx-auto mt-4 text-blue-600 hover:underline"
        >
          Atgriezties atpakaļ
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-200">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
      >
        ← Atpakaļ uz sarakstu
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || country.name.common}
          className="w-full rounded-lg shadow-md border border-gray-100"
          referrerPolicy="no-referrer"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {country.name.common}
          </h2>
          <p className="text-lg text-gray-700 italic">{country.name.official}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Galvaspilsēta
              </p>
              <p className="text-lg text-gray-800">
                {country.capital?.join(", ") || "Nav norādīta"}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Reģions
              </p>
              <p className="text-lg text-gray-800">
                {country.region} ({country.subregion})
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Iedzīvotāji
              </p>
              <p className="text-lg text-gray-800">
                {country.population > 0
                  ? country.population.toLocaleString()
                  : "Neapdzīvota vai informācija nav pieejama"}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Valodas
              </p>
              <p className="text-lg text-gray-800">
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "Nav norādītas"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
