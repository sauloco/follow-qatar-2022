export function getFromLS(key) {
  return localStorage.getItem(key)
}

export function setToLS(key, value) {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    console.error(e);
  }
  return false
}