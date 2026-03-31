import React from "react";
import { Country } from "./types";

interface CountryCardProps {
  country: Country;
  onClick: (code: string) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div
      onClick={() => onClick(country.cca3)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200"
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        className="w-full h-40 object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {country.name.common}
        </h3>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Reģions:</span> {country.region}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Iedzīvotāji:</span>{" "}
          {country.population > 0
            ? country.population.toLocaleString()
            : "Neapdzīvota / Nav datu"}
        </p>
      </div>
    </div>
  );
};
