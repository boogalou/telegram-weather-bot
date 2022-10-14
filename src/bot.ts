import { Markup, Scenes, session, Telegraf, } from "telegraf";
import 'dotenv/config';
import { todayScene } from "./scenes/todayScene";



const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN!);
  const { enter, leave } = Scenes.Stage;

const stage = new Scenes.Stage<Scenes.SceneContext>([todayScene]);

export const botInit = () => {

  bot.use(session());
  bot.use(stage.middleware());

  bot.use((ctx, next) => {
    return next();
  })

  bot.start(async (ctx) => ctx.reply('Welcome to weather bot', Markup.keyboard(
    ["/get"])
    .oneTime()
    .resize()));

  bot.command('get', (ctx) => ctx.scene.enter('today'))
  return bot;
}