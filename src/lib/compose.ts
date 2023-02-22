const compose =
  (...fns: Function[]) =>
  <T = any>(initialValue: T): T =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

export default compose;
