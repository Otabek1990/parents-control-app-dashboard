export interface ITranslation {
  uz: string;
  en: string;
  ru: string;
}
export interface IRegion {
  id: number;
  name: ITranslation;
}
export interface IDistrict extends IRegion {
  region_id: number;
}
