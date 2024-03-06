export const enforceanglebounds = (angle: number) => {
  angle %= 360;
  if (angle <= 0) angle += 360;
  return angle;
};

export const rotate = (arr: Array<any>, k: number) =>
  new Uint8Array(arr.slice(k).concat(arr.slice(0, k)));
