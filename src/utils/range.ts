export default function range(start: number, end: number): number[] {
  return Array(end - start + 1)
    .fill(start)
    .map((el, i) => el + i);
}
