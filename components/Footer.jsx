import Link from 'next/link';

export default function Footer() {
  return (
    <div className="border-t">
      <footer className="mt-10 mb-20 container mx-auto px-4">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/cats">
              <a>Cats</a>
            </Link>
          </li>
          <li>
            <Link href="/dogs">
              <a>Dogs</a>
            </Link>
          </li>
        </ul>
        <div className="mt-12 pt-3 border-t text-center">
          SPCA
          {` - ${new Date().getFullYear()} - `}
          All rights reserved to their proper owners
        </div>
      </footer>
    </div>
  );
}
