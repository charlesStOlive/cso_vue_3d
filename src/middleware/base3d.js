export default async function auth ({
  next,
  store
}) {
  store.dispatch('troisd/getScenes')
  return next()
}
