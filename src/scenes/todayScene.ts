import { Scenes } from "telegraf";
import { apiService } from "../services/apiService";

const {leave} = Scenes.Stage;

export const todayScene = new Scenes.BaseScene<Scenes.SceneContext>("today");
todayScene.enter(ctx => ctx.reply("Отправь название города"));
todayScene.leave();
todayScene.command("start", leave<Scenes.SceneContext>());
todayScene.on('text', async (ctx) => {
  try {
    const city = ctx.message.text
    console.log(city)
    const response = await apiService.getWeather(city)
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
    );
  } catch (err) {
    console.log(err)
  }
});