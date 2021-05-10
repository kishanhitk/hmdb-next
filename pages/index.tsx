import Link from "next/link";
import classes from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>HMDB</h1>
      <p>Humara Movie Data Base</p>
      <Link href="/popular">
        <button className={classes.card}>
          <p>Popular Movies</p>
        </button>
      </Link>
    </div>
  );
}
