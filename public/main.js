"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiService_1 = require("./apiService");
const { Telegraf, Markup, Context } = require('telegraf');
require('dotenv').config();
const token = process.env.TOKEN;
const bot = new Telegraf(token);
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Привет, я погодный бот, и я умею показывать погоду', Markup.inlineKeyboard([
        Markup.button.callback('Узнать погоду?', 'yes')
    ]));
}));
bot.action('yes', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCbQuery();
    yield ctx.reply('Отправь название своего города в ответном сообщении');
}));
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const city = ctx.message.text;
    const response = yield apiService_1.ApiService.getCurrentWeather(city);
    const { location, current, forecast } = response.data;
    yield ctx.reply('Выбрать', Markup.inlineKeyboard([
        Markup.button.callback('Погода на сегодня', 'today'),
        Markup.button.callback('Погода на завтра', 'tomorrow'),
        Markup.button.callback('Погода на три дня', 'three')
    ]));
    bot.action('today', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.answerCbQuery();
        const { country, region, name, localtime } = location;
        const { temp_c, wind_kph, wind_dir, condition, pressure_mb, humidity } = current;
        yield ctx.replyWithHTML(`<b>${country}\n${region}\n${name}\n ${localtime}</b>\n<b>${condition.text}</b>\n\n<b>🌡️ Температура: ${temp_c}&#8451;</b>\n<b>↗️ Направление ветра ${wind_dir}</b>\n<b>💨 Сила ветра ${wind_kph} Км/ч</b>\n<b>🕛 Атм. давление ${pressure_mb} мм рт. ст.; </b>\n<b>☂️ Влажность ${humidity}%</b> `);
    }));
}));
bot.launch().then(() => {
    console.log('Bot started!');
});
//# sourceMappingURL=main.js.map