import express from 'express';
import cors from 'cors';
import { initializeDb, findOrCreateUser } from './db';
import { expressjwt as jwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const app = express();
const port = process.env.PORT || 4000;

initializeDb().catch(console.error);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const tenantId = process.env.AZURE_AD_TENANT_ID;
const clientId = process.env.AZURE_AD_CLIENT_ID;

if (!tenantId || !clientId) {
    throw new Error("AZURE_AD_TENANT_ID and AZURE_AD_CLIENT_ID must be set");
}

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`
    }) as GetVerificationKey,
    audience: clientId,
    issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
    algorithms: ['RS256']
});

// An extended Express Request type that includes the auth property from express-jwt
interface AuthenticatedRequest extends express.Request {
    auth?: {
        oid: string;
        name: string;
        preferred_username: string;
        [key: string]: any;
    };
}

const upsertUser = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.auth) {
        return res.status(401).send('No authorization token was found');
    }
    
    const userProfile = {
        oid: req.auth.oid,
        displayName: req.auth.name,
        userPrincipalName: req.auth.preferred_username,
        email: req.auth.preferred_username, 
    };

    try {
        const user = await findOrCreateUser(userProfile);
        // Attach user from DB to request for downstream handlers
        (req as any).dbUser = user;
        next();
    } catch (error) {
        console.error('Failed to create or find user', error);
        res.status(500).send('Error processing user data.');
    }
};

app.get('/api/user', checkJwt, upsertUser, async (req: express.Request, res: express.Response) => {
    const user = (req as any).dbUser;
    res.json(user);
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
