export function getRedirectPath({type, avatar}) {
  let url = `/${type}` // /boss /genius
  url += avatar ? '' : 'Info' // /bossInfo /geniusInfo
  return url
}