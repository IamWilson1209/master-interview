import { auth } from '@/auth';
import React, { Suspense } from 'react';
import Image from 'next/image';
import UserArticles from './_components/UserArticles';

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  console.log('id: ', id);
  const session = await auth();
  console.log('session: ', session);

  const user = {
    image: '',
    name: 'name',
    username: 'username',
    email: 'jfkls@gmail.com',
    bio: 'This is a sample bio for the user. It can be a short description about the user.',
  };

  return (
    <section className="profile_container">
      <div className="profile_card">
        <Image
          src={user.image}
          alt={user.name}
          width={400}
          height={400}
          className="profile_image"
        />

        <div className="flex flex-col items-center mt-5">
          <h3 className="text-24-black uppercase text-center line-clamp-1">
            {user.name}
          </h3>
        </div>

        <p className="text-30-extrabold text-center">@{user?.username}</p>
        <p className="text-20-medium text-center">{user?.email}</p>
        <p className="mt-1 text-center text-14-normal dark:text-white-100/80">
          {user?.bio}
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:-mt-5">
        <p className="text-30-bold pl-4">
          {session?.user.id === id ? 'Your' : 'All'} Articles
        </p>
        <hr className="my-4 border-black-100/20" />
        <ul className="card_grid-sm">
          <Suspense fallback={<p>Loading</p>}>
            <UserArticles />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};
export default UserPage;
