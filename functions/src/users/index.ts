import { Request, Response } from "express";
import firestore from "../firestore";
import { TelegramBotUser, TelegramMiniAppUser, TonStoryUser } from "../types";

export const loadUserData = async (req: Request, res: Response) => {
  console.log("Updating points... ");
  const { user } = res.locals.initData;

  try {
    const formattedUser = formatTonStoryUser(user);
    const userData = await getOrCreateTelegramUser(formattedUser);
    res.status(200).json({
      message: "User data loaded successfully",
      data: userData
    });

  } catch (error) {
    console.error(`There was an error loading user`, error);
    res.status(500).send(`There was an error loading user`);
  }
}

export async function getOrCreateTelegramUser(user: TonStoryUser, referrer?: string) {
  const docRef = firestore.collection('users').doc(user.id.toString());
  return await firestore.runTransaction(async (transaction: any) => {
    const doc = await transaction.get(docRef);
    if (!doc.exists) {

      // Update referrer points
      if (referrer) {
        const referrerDocRef = firestore.collection('users').doc(referrer);
        const referrerDoc = await transaction.get(referrerDocRef);
        if (referrerDoc.exists) {
          transaction.set(referrerDocRef.collection('referrals').doc(user.id.toString()), {
            userId: user.id,
            createdAt: new Date()
          })
          const referrerData = referrerDoc.data();
          transaction.update(referrerDocRef, {
            referrals: referrerData.referrals + 1
          });
        }
      }

      transaction.set(docRef, user);

      return user;
    } else {
      return doc.data();
    }
  });
}

export function formatTonStoryUser(user: TelegramMiniAppUser | TelegramBotUser): TonStoryUser {
  // Determine if the user is a TelegramMiniAppUser
  const isMiniAppUser = (user: any): user is TelegramMiniAppUser => 'allowsWriteToPm' in user;

  return {
    id: user.id,
    username: user.username,
    firstName: 'firstName' in user ? user.firstName : user.first_name,
    lastName: 'lastName' in user ? user.lastName : user.last_name,
    languageCode: 'languageCode' in user ? user.languageCode : user.language_code,
    allowsWriteToPm: isMiniAppUser(user) ? user.allowsWriteToPm : false, // Default to false if not provided
    level: 1,
    stamina: 100,
    points: 0,
    weapon: 0,
    referrals: 0,
    referralURL: `https://t.me/TonStoryBot?start=user_${user.id}`,
    createdAt: new Date(),
  };
}

