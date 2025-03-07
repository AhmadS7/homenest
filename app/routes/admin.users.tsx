import { useLoaderData } from "@remix-run/react";
    import { json, redirect } from "@remix-run/node";
    import type { LoaderFunction } from "@remix-run/node";

    export const loader: LoaderFunction = async ({ request }) => {
      const cookie = request.headers.get("Cookie");
        if (!cookie || !cookie.includes("user=admin")) { // VERY INSECURE!
          return redirect("/auth/login");
        }

      // **CRITICAL: Replace with actual user data fetching.**
      const users = [
        { id: 1, email: "user1@example.com", role: "buyer" },
        { id: 2, email: "user2@example.com", role: "seller" },
        { id: 3, email: "admin@example.com", role: "admin" },
      ];
      return json({ users });
    };

    export default function AdminUsers() {
      const { users } = useLoaderData<typeof loader>();

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
          <p className="mb-4">
            This is where you can manage all users.
          </p>

          {/* User List */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Placeholder for actions (edit, delete) */}
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
