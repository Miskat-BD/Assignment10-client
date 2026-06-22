import { requiredRole } from "@/app/lib/core/session";

const CollaboratorLayout = async ({children}) => {
    await requiredRole('collaborator')
    return children
};

export default CollaboratorLayout;