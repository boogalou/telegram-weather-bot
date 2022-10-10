import { Markup } from "telegraf";
import { CMD_TEXT } from "../constants";


export const mainMenu = Markup.keyboard([
  [CMD_TEXT.inLocation],
  [CMD_TEXT.outLocation]
]).resize();

export const backBtnMenu = Markup.keyboard([
  [CMD_TEXT.menu]
])