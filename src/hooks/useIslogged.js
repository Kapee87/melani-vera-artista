export function useIsLogged() {
    return sessionStorage.getItem('token')
}