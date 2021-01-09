import Link from 'next/link';

export default function Footer({ admin, signedIn }) {
  return (
    <div className="border-t mt-16">
      <footer className="mt-10 mb-20 container mx-auto px-4">
        <div className="flex flex-wrap">
          <ul className="w-40">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/search?animal=cat">
                <a>Cats</a>
              </Link>
            </li>
            <li>
              <Link href="/search?animal=dog">
                <a>Dogs</a>
              </Link>
            </li>
          </ul>
          {signedIn && (
            <ul className="w-40">
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <Link href="/mypets">
                  <a>My Pets</a>
                </Link>
              </li>
            </ul>
          )}
          {admin && (
            <ul className="w-40">
              <li>
                <Link href="/profile">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/pets/add">
                  <a>Add a Pet</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/users/manage">
                  <a>Manage Users</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/pets/manage">
                  <a>Manage Pets</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="mt-12 pt-3 border-t text-center">
          <div>
            SPCA
            {` - ${new Date().getFullYear()} - `}
            All rights reserved to their proper owners
          </div>
          <div>Created with React (Next.js) and Tailwindcss, by Idan Amati</div>
        </div>
      </footer>
    </div>
  );
}
