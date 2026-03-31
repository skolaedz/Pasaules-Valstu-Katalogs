
export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: { [key: string]: string };
}
