import axios, { AxiosResponse } from "axios";
import { IWeatherResponse } from "../types";
require('dotenv').config()




export class ApiService {

   async getWeather(city: string): Promise<AxiosResponse<IWeatherResponse>> {
    return await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
      params: {
        q: city,
        days: 2,
        key: process.env.WEATHER_TOKEN,
        aqi: 'yes',
        alerts: 'no',
      }
    });
  }
}

export const apiService = new ApiService()
