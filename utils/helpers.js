export const formatMemory = (memory) => {
  const gigs = memory / 1024;
  return gigs >= 1 ? `${gigs.toFixed(2)} GB` : `${memory.toFixed(0)} MB`;
};

export { formatMemory as default };
