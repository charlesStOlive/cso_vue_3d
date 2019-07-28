export default async function base3d({
  next,
  store
}) {
  store.dispatch('troisd/getScenes')
  return next()
}
