import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button, Center, Stack, Title } from "@mantine/core";

export function Login() {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
    }

    return (
        <Center style={{ width: '100vw', height: '100vh' }}>
            <Stack align="center">
                <Title>Welcome</Title>
                <Button onClick={handleLogin}>Log in with Microsoft</Button>
            </Stack>
        </Center>
    );
};
