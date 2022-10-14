import { botInit } from "./bot";

const main = async () => {
  try {
    await botInit().launch()
  } catch (err) {
    console.log('error:', err)
  }
}

main().then(() => console.log('Bot started'))
