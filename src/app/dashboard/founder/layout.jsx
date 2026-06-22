import { requiredRole } from "@/app/lib/core/session";

const FounderLayout = async ({children}) => {
    await requiredRole('founder')
    return children
};

export default FounderLayout;