
export interface TonStoryUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  allowsWriteToPm?: boolean;
  referrer?: string;
  level: number;
  stamina: number;
  points: number;
  weapon: number;
  createdAt: Date;
  referrals: number;
  referralURL: string;
}

export interface TelegramMiniAppUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  allowsWriteToPm: boolean;
}

export interface TelegramBotUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

