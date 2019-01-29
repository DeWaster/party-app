export function isAuthenticated() {
  if (!localStorage.getItem('token')) {
    return false;
  }
  return true;
}
