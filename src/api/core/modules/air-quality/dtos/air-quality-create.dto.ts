export interface AirQualityCreateDto {
  city: string,
  state: string,
  country: string,
  ts: Date;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}