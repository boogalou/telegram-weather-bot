import axios, { AxiosResponse } from "axios";
import { IWeatherResponse } from "./type";
require('dotenv').config()




export class ApiService {

  static async getCurrentWeather(city: string | number): Promise<AxiosResponse<IWeatherResponse>> {
    return await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
      params: {
        q: city,
        days: 7,
        key: process.env.WEATHER_TOKEN,
        aqi: 'yes',
        alerts: 'no',
      }
    });
  }
}
