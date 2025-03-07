import { Link, useLoaderData } from "@remix-run/react";
    import { json } from "@remix-run/node";
    import type { LoaderFunction } from "@remix-run/node";

    export const loader: LoaderFunction = async ({ request }) => {
      // **CRITICAL: Implement proper authentication check.**
      const cookie = request.headers.get("Cookie");
      if (!cookie || !cookie.includes("user=admin")) { // VERY INSECURE!
        return redirect("/auth/login");
      }

      // Fetch data for the admin dashboard (e.g., user count, property count)
      const data = {
        userCount: 10, // Replace with actual data
        propertyCount: 25, // Replace with actual data
      };
      return json(data);
    };

    export default function AdminIndex() {
      const data = useLoaderData<typeof loader>();

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p className="mb-4">Welcome to the admin dashboard.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Users</h2>
              <p>Total Users: {data.userCount}</p>
              <Link
                to="/admin/users"
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage Users
              </Link>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Properties</h2>
              <p>Total Properties: {data.propertyCount}</p>
              <Link
                to="/admin/properties"
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage Properties
              </Link>
            </div>
          </div>
        </div>
      );
    }
