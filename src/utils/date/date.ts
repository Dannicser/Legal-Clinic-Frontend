export const onGetCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10).split("-").reverse().join(".");
};
