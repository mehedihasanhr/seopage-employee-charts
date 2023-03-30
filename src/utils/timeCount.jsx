export const timeCount = (lastHour) => {
  const time = new Date().getTime();

  const s = time - 3600 * 1000 * Number(lastHour);

  return [new Date(s), new Date()];
};
