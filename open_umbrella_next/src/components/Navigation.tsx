import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky bottom-0 w-full bg-background border-t border-gray-200 dark:border-gray-800 py-2">
      <ul className="flex justify-around">
        <li>
          <Link href="/" className="hover:text-foreground/80">
            🏠 Home
          </Link>
        </li>
        <li>
          <Link href="/share" className="hover:text-foreground/80">
            🔄 Share
          </Link>
        </li>
        <li>
          <Link href="/history" className="hover:text-foreground/80">
            📜 History
          </Link>
        </li>
        <li>
          <Link href="/contributor" className="hover:text-foreground/80">
            👥 Contributors
          </Link>
        </li>
        <li>
          <Link href="/mypage" className="hover:text-foreground/80">
            👤 My Page
          </Link>
        </li>
      </ul>
    </nav>
  );
} 