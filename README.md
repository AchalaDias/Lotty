# Lotty

## Getting Started

### Prerequisites
-   `Node.js` (version 10 or above).

### Configure the Sample

Update configuration file `src/config.json` with your registered app details.

**Note:** You will only have to paste in the `client ID` generated for the application you registered.

```json
{
    "clientID": "<ADD_CLIENT_ID_HERE>",
    "baseUrl": "https://api.asgardeo.io/t/<org_name>",
    "signInRedirectURL": "https://localhost:3000",
    "signOutRedirectURL": "https://localhost:3000",
    "scope": ["profile"]
}
```

### Run the Application

```bash
npm install && npm start
```
The app should open at [`https://localhost:3000`](https://localhost:3000)


