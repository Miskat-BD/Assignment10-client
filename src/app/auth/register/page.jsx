import RegisterFormPage from './RegisterFormPage';

const RegisterPage = async ({ searchParams }) => {

    const params = await searchParams;
    const redirectTo = params?.redirect || "/";
    return <RegisterFormPage redirectTo={redirectTo}></RegisterFormPage>

};

export default RegisterPage;