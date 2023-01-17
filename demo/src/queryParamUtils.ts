export function readFromQueryParam(name: string): string | null {
  const searchParams = new URLSearchParams(window.location.search)
  if (!searchParams.has(name)) {
    return null
  }
  try {
    return atob(searchParams.get(name)!)
  } catch (e) {
    console.error(e)
    return null
  }
}

export function writeToQueryParam(name: string, value: string): void {
  const url = new URL(window.location.href)
  url.searchParams.set(name, btoa(value))
  window.history.replaceState(window.history.state, '', url.toString())
}
