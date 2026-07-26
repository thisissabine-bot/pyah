import Link from "next/link";

export default function DocentFooter() {
  return (
    <footer className="section-moss section-centered footer-inner">
      <div className="container">
        <div className="mb-text">
          <Link href="/voor-docenten">
            <img
              src="/logo-horizontaal-wit.svg"
              alt="Private Yoga at Home"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
        </div>
        <p className="text-small on-dark">
          © {new Date().getFullYear()} Private Yoga at Home · Voor docenten
        </p>
      </div>
    </footer>
  );
}
