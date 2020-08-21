import defaultSettings from '@/settings'

const title = defaultSettings.title || '词语填写'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
