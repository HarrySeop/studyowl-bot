export interface Session {
  start: Date;
  end: Date | null;
  duration: number;
}

export interface Settings {
  voiceChannelId: string | null;
  notifyChannelId: string | null;
}

export const registeredUsers = new Set<string>();

export const settings: Settings = {
  voiceChannelId: null,
  notifyChannelId: null,
};

export const activeSessions = new Map<string, Date>();

export const dailyAccumulated = new Map<string, number>();

export const sessionHistory = new Map<string, Session[]>();

export function registerUser(userId: string): boolean {
  if (registeredUsers.has(userId)) {
    return false;
  }
  registeredUsers.add(userId);
  return true;
}

export function unregisterUser(userId: string): boolean {
  if (!registeredUsers.has(userId)) {
    return false;
  }
  registeredUsers.delete(userId);
  activeSessions.delete(userId);
  dailyAccumulated.delete(userId);
  sessionHistory.delete(userId);
  return true;
}

export function isUserRegistered(userId: string): boolean {
  return registeredUsers.has(userId);
}

export function startSession(userId: string): void {
  const now = new Date();
  activeSessions.set(userId, now);

  const sessions = sessionHistory.get(userId) || [];
  sessions.push({
    start: now,
    end: null,
    duration: 0,
  });
  sessionHistory.set(userId, sessions);
}

export function endSession(userId: string): number {
  const startTime = activeSessions.get(userId);
  if (!startTime) {
    return 0;
  }

  const endTime = new Date();
  const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

  activeSessions.delete(userId);

  const accumulated = dailyAccumulated.get(userId) || 0;
  dailyAccumulated.set(userId, accumulated + duration);

  const sessions = sessionHistory.get(userId);
  if (sessions && sessions.length > 0) {
    const lastSession = sessions[sessions.length - 1];
    if (lastSession) {
      lastSession.end = endTime;
      lastSession.duration = duration;
    }
  }

  return duration;
}

export function isUserActive(userId: string): boolean {
  return activeSessions.has(userId);
}

export function getUserSessions(userId: string): Session[] {
  return sessionHistory.get(userId) || [];
}

export function getDailyTotal(userId: string): number {
  let total = dailyAccumulated.get(userId) || 0;

  if (activeSessions.has(userId)) {
    const startTime = activeSessions.get(userId)!;
    const currentDuration = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 1000
    );
    total += currentDuration;
  }

  return total;
}

export function getAllUsersTime(): Map<string, number> {
  const result = new Map<string, number>();

  for (const userId of registeredUsers) {
    const total = getDailyTotal(userId);
    if (total > 0) {
      result.set(userId, total);
    }
  }

  return result;
}

export function resetDailyData(): void {
  for (const userId of registeredUsers) {
    if (activeSessions.has(userId)) {
      activeSessions.set(userId, new Date());

      const sessions = sessionHistory.get(userId) || [];
      sessions.push({
        start: new Date(),
        end: null,
        duration: 0,
      });
      sessionHistory.set(userId, sessions);
    } else {
      sessionHistory.delete(userId);
    }
  }

  dailyAccumulated.clear();
}
