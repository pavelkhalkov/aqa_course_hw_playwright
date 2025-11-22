export const makeUniqueName = (name: string): string => {
  const base = name.trim().replace(/\s+/g, " ").replace(/[^A-Za-z0-9 ]/g, "");
  const rand2 = Math.floor(Math.random() * 90 + 10);
  const suffix = ` ${Date.now().toString().slice(-6)}${rand2}`;
  const room = 40 - suffix.length;
  return (base.slice(0, Math.max(0, room)).trimEnd() + suffix);
};