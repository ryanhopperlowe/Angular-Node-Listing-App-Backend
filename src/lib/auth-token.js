import { unauthorized } from "@hapi/boom";
import { auth } from "firebase-admin";

export async function verifyIsAuthorized({ headers }, userId) {
  const { userId: uid } = await extractUser({ headers });
  if (uid !== userId) throw unauthorized('User is not authorized');
}

export async function extractUser({ headers }) {
  const token = headers.authtoken;
  const user = await auth().verifyIdToken(token);
  if (!user.uid) unauthorized('User is not authenticated');
  return { userId: user.uid };
}