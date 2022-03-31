import { createAuthProvider } from 'react-token-auth';

 const Session = { accessToken: String, refreshToken: String };

export const { useAuth, authFetch, login, logout } = createAuthProvider<Session>({
    getAccessToken: session => session.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('/auth/refresh', {
            method: 'POST',
            body: token.refreshToken, // react-token-auth docs
        }).then(r => r.json()),
});