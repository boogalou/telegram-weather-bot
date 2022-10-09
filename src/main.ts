import { ApiService } from "./apiService";
import { Telegraf, Markup, Composer, Scenes, session } from "telegraf";
import { convertTime } from "./convertTime";

require('dotenv').config()


const token = process.env.TOKEN!;

const bot = new Telegraf(token);

bot.start(async (ctx) => {
  await ctx.reply('Привет, я погодный бот, и я умею показывать погоду', Markup.inlineKeyboard([
    Markup.button.callback('Узнать погоду?', 'yes')
  ]))

});

bot.action('yes', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Отправь название своего города в ответном сообщении')
});

bot.on('text', async (ctx) => {
  const city = ctx.message.text
  const response = await ApiService.getCurrentWeather(city);
  const { location, current, forecast } = response.data;
  await ctx.reply('Выбрать',  Markup.inlineKeyboard([
    Markup.button.callback('Погода на сегодня', 'today'),
    Markup.button.callback('Погода на завтра', 'tomorrow'),
    Markup.button.callback('Погода на три дня', 'three')
  ]) )

  bot.action('today', async (ctx) => {
    await ctx.answerCbQuery();
    const {country, region, name, localtime} = location;
    const {temp_c, wind_kph, wind_dir, condition, pressure_mb, humidity} = current;
    await ctx.replyWithHTML(`<b>${country}\n${region}\n${name}\n ${localtime}</b>\n<b>${condition.text}</b>\n\n<b>🌡️ Температура: ${temp_c}&#8451;</b>\n<b>↗️ Направление ветра ${wind_dir}</b>\n<b>💨 Сила ветра ${wind_kph} Км/ч</b>\n<b>🕛 Атм. давление ${pressure_mb} мм рт. ст.; </b>\n<b>☂️ Влажность ${humidity}%</b> `)
  })
})


bot.launch().then(() => {
  console.log('Bot started!')
});