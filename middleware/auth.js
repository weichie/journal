export default function ({ store, redirect }) {
  if (!store.state.authStore.loggedIn) {
    return redirect('/login')
  }
}