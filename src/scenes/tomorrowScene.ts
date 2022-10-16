import { Scenes } from "telegraf";
import { apiService } from "../services/apiService";

const {leave} = Scenes.Stage;

export const tomorrowScene = new Scenes.BaseScene<Scenes.SceneContext>("tomorrow");
tomorrowScene.enter(ctx =>  ctx.reply("Отправь название города"));
tomorrowScene.leave();
tomorrowScene.command("start", leave<Scenes.SceneContext>());

tomorrowScene.on('text', async (ctx) => {
  try {
    const city = ctx.message.text
    console.log(city)
    const response = await apiService.getWeather(city);
    const tomorrow = response.data.forecast.forecastday[1]



    await ctx.replyWithHTML
    (`<b>${response.data.location.country}</b>
   <b>${response.data.location.region}</b>
   <b>${response.data.location.name}</b>
   <b>${tomorrow.date}</b>
   <b>${tomorrow.day.condition.text}</b>
   🌡️ Температура: ${tomorrow.day.avgtemp_c} &#8451;
   ↗️ ️Направление ветра ${tomorrow.hour[0].wind_dir}
   💨 Сила ветра ${tomorrow.day.maxwind_kph} Км/ч
   🕛 Атм. давление ${tomorrow.hour[0].pressure_mb} мбар
   ☂️ Влажность ${tomorrow.day.avghumidity} %`
    );
  } catch (err) {
    console.log(err)
  }
});