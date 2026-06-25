import { getUserById } from "@/app/lib/api/users";
import { getUserSession } from "@/app/lib/core/session";
import CollaboratorProfile from "@/components/dashboard/CollaboratorProfile";

export default async function ProfilePage() {
    const user = await getUserSession();
    const mongoUser = await getUserById(user?.id)

    return <CollaboratorProfile initialData={user} mongoUser={mongoUser} />;
}