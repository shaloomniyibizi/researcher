import db from '@/lib/db';
import { currentUser } from '@/lib/userAuth';
import Settings from './_components/Settings';

async function SettingsPage() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      name: true,
      email: true,
      phoneNumber: true,
      avatar: true,
    },
  });
  return <Settings user={userInfo!} />;
}

export default SettingsPage;
