export function getRandomEnumValue<T extends object>(enumObject: T): T[keyof T] {
  const values = Object.values(enumObject);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}