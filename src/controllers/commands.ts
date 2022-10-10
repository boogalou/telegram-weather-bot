import { Context } from "telegraf";
import { backBtnMenu, mainMenu } from "../utils/buttons";


export const start = (ctx: Context) => ctx.reply('Yolo!', {
  ...mainMenu
});

export const backMenu = (ctx: Context) => ctx.reply('Ты в меню', {
  ...backBtnMenu
})