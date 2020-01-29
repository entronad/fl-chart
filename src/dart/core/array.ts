export const remove = <T>(arr: Array<T>, ele: T) => {
  const index = arr.indexOf(ele);
  if (index > -1) {
    arr.splice(index, 1);
  }
}