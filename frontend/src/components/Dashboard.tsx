import { useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { apiRequest } from "../authConfig";
import { Title, Text, Code, Paper } from '@mantine/core';

export function Dashboard() {
    const { instance, accounts } = useMsal();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (accounts[0]) {
            instance.acquireTokenSilent({
                ...apiRequest,
                account: accounts[0]
            }).then(response => {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
                    headers: {
                        'Authorization': `Bearer ${response.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => setUserData(data))
                .catch(error => console.error(error));
            });
        }
    }, [instance, accounts]);

    return (
        <Paper shadow="xs" p="md">
            <Title order={2}>Dashboard</Title>
            <Text>Welcome, {accounts[0] && accounts[0].name}.</Text>
            {userData && (
                <>
                    <Text mt="md">User data from database:</Text>
                    <Code block>{JSON.stringify(userData, null, 2)}</Code>
                </>
            )}
        </Paper>
    );
}
