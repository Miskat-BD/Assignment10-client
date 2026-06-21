import LoginFormPage from './LoginFormPage';

const LoginPage = async ({ searchParams }) => {
    const params = await searchParams;
    const redirectTo = params?.redirect || "/"; 

    return <LoginFormPage redirectTo={redirectTo} />;
};

export default LoginPage;