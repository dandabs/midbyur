export const rem = {
  get(): number {
    return 16;
  },
  set(_nextValue: number): void {
    // No-op in Storybook web runtime.
  },
};

export default { rem };
