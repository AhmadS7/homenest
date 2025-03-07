import { Link } from "@remix-run/react";

    export default function AdminProperties() {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
          <p className="mb-4">
            This is where you can manage all property listings.
          </p>
          <Link
            to="/admin/properties/new"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
          >
            Add New Property
          </Link>

          {/* Placeholder for property list */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600">Property list will go here...</p>
          </div>
        </div>
      );
    }
