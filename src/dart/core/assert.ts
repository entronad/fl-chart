export const assert = (expression: boolean) => {
  if (expression === false) {
    throw new Error();
  }
};
