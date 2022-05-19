export default function getLocationCode() {
  return navigator.language.slice(navigator.language.length - 2);
}
