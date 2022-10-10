import { Context, Telegraf } from "telegraf";
require('dotenv').config()
import { backMenu, start } from "./controllers/commands";
import { CMD_TEXT } from "./constants";

const bot = new Telegraf(process.env.TEST_BOT_TOKEN!);

export const botInit = () => {
  bot.use((ctx: Context, next) => {
    console.log(ctx);
    return next();
  })

  bot.start(start);
  bot.hears(CMD_TEXT.menu, backMenu)

  return bot;
}