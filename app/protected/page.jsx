import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
export default async function MainPage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <h1>Welcome back, {session.user.name}!</h1>
    </div>
  );
}
