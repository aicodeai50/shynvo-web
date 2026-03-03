export type Mission = {
  id: string;
  title: string;
  createdAt: number;
  status: 'active' | 'done';
};

export type LogEntry = {
  id: string;
  createdAt: number;
  text: string;
};

const KEY = {
  missions: 'shynvo.os.missions',
  activeMissionId: 'shynvo.os.activeMissionId',
  focus: 'shynvo.os.focus',
  momentum: 'shynvo.os.momentum',
  logbook: 'shynvo.os.logbook',
  robotEnabled: 'shynvo.os.robotEnabled',
};

function isBrowser() {
  return typeof window !== 'undefined';
}

function storageGet(key: string) {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(key);
}

function storageSet(key: string, value: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, value);
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getMissions(): Mission[] {
  return safeParse<Mission[]>(storageGet(KEY.missions), []);
}

export function setMissions(missions: Mission[]) {
  storageSet(KEY.missions, JSON.stringify(missions));
}

export function addMission(title: string): Mission {
  const missions = getMissions();
  const m: Mission = {
    id: isBrowser() && 'crypto' in window ? crypto.randomUUID() : String(Date.now()),
    title: title.trim(),
    createdAt: Date.now(),
    status: 'active',
  };
  const next = [m, ...missions];
  setMissions(next);
  setActiveMissionId(m.id);
  return m;
}

export function setMissionStatus(id: string, status: Mission['status']) {
  const missions = getMissions();
  const next = missions.map((m) => (m.id === id ? { ...m, status } : m));
  setMissions(next);
}

export function getActiveMissionId(): string | null {
  return storageGet(KEY.activeMissionId);
}

export function setActiveMissionId(id: string) {
  storageSet(KEY.activeMissionId, id);
}

export function getActiveMission(): Mission | null {
  const id = getActiveMissionId();
  if (!id) return null;
  const missions = getMissions();
  return missions.find((m) => m.id === id) ?? null;
}

export type FocusState = {
  running: boolean;
  startedAt: number | null;
  durationMin: number;
};

export function getFocus(): FocusState {
  return safeParse<FocusState>(storageGet(KEY.focus), {
    running: false,
    startedAt: null,
    durationMin: 25,
  });
}

export function setFocus(s: FocusState) {
  storageSet(KEY.focus, JSON.stringify(s));
}

export type MomentumState = {
  streakDays: number;
  lastUpdateDay: string | null;
};

export function getMomentum(): MomentumState {
  return safeParse<MomentumState>(storageGet(KEY.momentum), {
    streakDays: 0,
    lastUpdateDay: null,
  });
}

export function setMomentum(s: MomentumState) {
  storageSet(KEY.momentum, JSON.stringify(s));
}

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function bumpMomentumOncePerDay(): MomentumState {
  const s = getMomentum();
  const t = todayKey();
  if (s.lastUpdateDay === t) return s;
  const next = { ...s, streakDays: Math.max(0, s.streakDays) + 1, lastUpdateDay: t };
  setMomentum(next);
  return next;
}

export function getLogbook(): LogEntry[] {
  return safeParse<LogEntry[]>(storageGet(KEY.logbook), []);
}

export function addLogEntry(text: string): LogEntry {
  const entries = getLogbook();
  const e: LogEntry = {
    id: isBrowser() && 'crypto' in window ? crypto.randomUUID() : String(Date.now()),
    createdAt: Date.now(),
    text: text.trim(),
  };
  const next = [e, ...entries];
  storageSet(KEY.logbook, JSON.stringify(next));
  return e;
}

/* Robot Toggle (OS-only) */
export function getRobotEnabled(): boolean {
  return safeParse<boolean>(storageGet(KEY.robotEnabled), true);
}
export function setRobotEnabled(v: boolean) {
  storageSet(KEY.robotEnabled, JSON.stringify(v));
}
