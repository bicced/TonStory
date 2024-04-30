import { Request, Response } from "express";
import firestore from "../firestore";

export const getScoreboard = async (req: Request, res: Response) => {
  try {
    const querySnapshot = await firestore.collection('users').orderBy('points', 'desc').get();
    const counters = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.send(counters);
  } catch (error) {
    console.error("Error fetching counters:", error);
    res.status(500).send('Error fetching scoreboard');
    
  }
}