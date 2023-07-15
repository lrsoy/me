export const testViteEnv = () => {
  return Number(import.meta.env.VITE_USER_AGE) * 2
}