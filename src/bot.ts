import { Markup, Scenes, session, Telegraf, } from "telegraf";
import 'dotenv/config';
import { todayScene } from "./scenes/todayScene";
import { tomorrowScene } from "./scenes/tomorrowScene";


const bot = new Telegraf<Scenes.SceneContext>(process.env.TEST_BOT_TOKEN!);
const { enter, leave } = Scenes.Stage;

const stage = new Scenes.Stage<Scenes.SceneContext>([todayScene, tomorrowScene]);

export const botInit = () => {

  bot.use(session());
  bot.use(stage.middleware());

  bot.use((ctx, next) => {
    return next();
  })

  bot.start(async ctx => {
     await ctx.reply(
      "Добро пожаловать в погодный бот.",
      Markup.keyboard([
        ["сегодня", "завтра"],
      ])
        .oneTime()
        .resize(),
    );
  });

  bot.hears("сегодня", (ctx) => ctx.scene.enter('today'))
  bot.hears("завтра", (ctx) => ctx.scene.enter('tomorrow'))
  return bot;
}