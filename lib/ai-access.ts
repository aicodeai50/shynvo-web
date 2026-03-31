export type AiAccessUser = {
  id: string;
  createdAt: string | Date;
  plan?: "free" | "pro" | "team" | "custom" | null;
  dailyAiUses?: number;
  lastAiUseDate?: string | null;
};

export type AiAccessResult =
  | {
      allowed: true;
      mode: "trial" | "paid" | "free";
      remaining?: number;
      updatedUser: AiAccessUser;
    }
  | {
      allowed: false;
      reason: string;
      updatedUser?: AiAccessUser;
    };

function getDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function checkAiAccess(user: AiAccessUser | null): AiAccessResult {
  if (!user) {
    return {
      allowed: false,
      reason: "Please create an account or sign in to use Shynvo AI.",
    };
  }

  const now = new Date();
  const createdAt = new Date(user.createdAt);
  const diffMs = now.getTime() - createdAt.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays <= 7) {
    return {
      allowed: true,
      mode: "trial",