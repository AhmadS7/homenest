import { Link } from "@remix-run/react";

    export default function Header() {
      return (
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              Real Estate App
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-gray-300">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="hover:text-gray-300">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-gray-300">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      );
    }
