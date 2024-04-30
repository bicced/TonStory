import { Request, Response } from "express";
import * as functions from 'firebase-functions';
import { formatTonStoryUser, getOrCreateTelegramUser } from "../users";

import { Telegraf } from "telegraf";

const bot = new Telegraf(functions.config().tgbot.key);

export const telegramBotUpdate = async (req: Request, res: Response) => {
  console.log("Telegram update received!");
  const {text, from} = req.body.message;

  if (text.includes("/start user_")) {
    const referrer = text.split("user_")[1];
    const formattedUser = formatTonStoryUser(from);
    await getOrCreateTelegramUser(formattedUser, referrer);
  }
  bot.telegram.sendMessage(from.id, `Welcome to TonStory ${from.first_name}!`);
  res.status(200).send("Telegram update received!");
}