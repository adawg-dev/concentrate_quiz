import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';
import { getUserByEmail, upsertUserByEmail } from './db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load OpenAPI specification
const swaggerDocument = YAML.load(path.join(__dirname, '../api/openapi.yaml'));

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.get('/api/v0/users/by-email', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email parameter is required' });
    }

    const userData = await getUserByEmail(email);

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the fields we need for the API response
    const user = {
      id: userData.id || null,
      email: userData.email,
      name: userData.name
    };

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/v0/users', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    // Create user data object
    const userData = {
      email,
      name,
      // Add any other fields you might need
    };

    await upsertUserByEmail(userData);

    // Return the upserted data (matching your OpenAPI spec)
    res.json({ email, name });
  } catch (error) {
    console.error('Error upserting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;