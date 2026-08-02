export function isPinching(indexTip: { x: number; y: number }, thumbTip: { x: number; y: number }, threshold = 0.08): boolean {
  const dx = indexTip.x - thumbTip.x;
  const dy = indexTip.y - thumbTip.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < threshold;
}