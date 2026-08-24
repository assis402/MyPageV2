import { auth } from "@/auth";
import { isOwnerEmail } from "@/lib/auth/admin";

export async function getAdminSession() {
  const session = await auth();
  if (!isOwnerEmail(session?.user?.email)) return null;
  return session;
}
