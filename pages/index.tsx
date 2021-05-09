import Link from "next/link";
export default function Home() {
  return (
    <div>
      <button>
        <Link href="/popular">
          <a>Popular Movies</a>
        </Link>
      </button>
    </div>
  );
}
