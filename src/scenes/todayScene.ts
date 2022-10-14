import { Scenes } from "telegraf";
import { apiService } from "../services/apiService";


export const todayScene = new Scenes.BaseScene<Scenes.SceneContext>("today");
todayScene.enter(ctx => ctx.reply("Send your city name"));
todayScene.on('text', async (ctx) => {
  const city = ctx.message.text;
  const response = await apiService.getWeather(city)
  console.log(response.data)

  await ctx.replyWithHTML
  (`<b>${response.data.location.country}</b>
   <b>${response.data.location.region}</b>
   <b>${response.data.location.name}</b>
   <b>${response.data.location.localtime}</b>
   <b>${response.data.current.condition.text}</b>
   🌡️ Температура: ${response.data.current.temp_c} &#8451;
   ↗️ ️Направление ветра ${response.data.current.wind_dir}
   💨 Сила ветра ${response.data.current.wind_kph} Км/ч
   🕛 Атм. давление ${response.data.current.pressure_mb} мбар 
   ☂️ Влажность ${response.data.current.humidity} %`
  )
})


