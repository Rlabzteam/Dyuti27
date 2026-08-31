export function getAspectRatioPadding(width: number, height: number): string {
  return `${((height / width) * 100).toFixed(2)}%`;
}
