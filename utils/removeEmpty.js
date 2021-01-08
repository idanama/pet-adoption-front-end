export default function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== ''));
}
