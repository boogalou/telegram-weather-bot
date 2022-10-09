import axios, { AxiosResponse } from "axios";
import { IWeatherResponse } from "./type";
import * as process from "process";

const TOKEN = process.env.WEATHER_TOKEN;


export class ApiService {

  static async getCurrentWeather(city: string | number): Promise<AxiosResponse<IWeatherResponse>> {
    return await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
      params: {
        q: city,
        days: 7,
        key: TOKEN,
        aqi: 'yes',
        alerts: 'no',
      }
    });
  }
}
