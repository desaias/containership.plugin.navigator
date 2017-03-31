export const formatMemory = (memory) => {
  const gigs = memory / 1024 / 1024;
  return gigs >= 1 ? `${(gigs / 1024).toFixed(2)} GB` : `${memory} MB`;
};

export { formatMemory as default };
