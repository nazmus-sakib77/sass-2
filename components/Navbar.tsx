import Link from "next/link";
import { site } from "@/lib/content";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="brand-mark" aria-hidden />
          {site.name}
        </Link>

        <ul className="nav-links">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <Link href="/login" className="btn btn-ghost btn-sm">
            Client login
          </Link>
          <Link href="/get-quote" className="btn btn-primary btn-sm">
            Get a quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
