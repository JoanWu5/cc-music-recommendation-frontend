const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000";
const clientId = "ab9e1685ad7449c488cc0434e557f9a6";
const responseType = "token"

const scopes = [
    // "streaming",
    // "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
    "user-read-recently-played"
]

export const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scopes.join("%20")}`;
