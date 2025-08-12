import { useMsal } from "@azure/msal-react";
import { Title, Text, Paper, Code } from '@mantine/core';

export function Profile() {
    const { accounts } = useMsal();
    const account = accounts[0];

    return (
        <Paper shadow="xs" p="md">
            <Title order={2}>Profile</Title>
            {account && (
                 <>
                    <Text><strong>Name:</strong> {account.name}</Text>
                    <Text><strong>Username:</strong> {account.username}</Text>
                    <Text mt="md">Full account details from MSAL:</Text>
                    <Code block>{JSON.stringify(account, null, 2)}</Code>
                 </>
            )}
        </Paper>
    );
}
