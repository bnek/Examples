import * as msal from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "<Client ID of your app registration>",
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: "<your redirect URI i.e. https://localhost:44317>",
    }
};
const loginRequest = {
    scopes: ["someApiScope"]
};

const myMSALObj = new msal.PublicClientApplication(msalConfig);

class Auth {
    async getToken() {
        try {
            const tokenRequest = {
                account: myMSALObj.getAllAccounts()[0],
                scopes: ["someApiScope"]
            };
            const tokenResponse = await myMSALObj.acquireTokenSilent(tokenRequest);
            return tokenResponse.accessToken;
        }
        catch (err1) {
            try {
                await myMSALObj.loginRedirect(loginRequest);
            } catch (err2) {
                console.error(err2);
            }
        }
    }
}

const auth = new Auth();
export default auth;

myMSALObj.handleRedirectPromise().then((tokenResponse) => {
    if (tokenResponse !== null) {
        console.log("Authenticated!")
    }
}).catch((error) => {
    console.error(error);
});