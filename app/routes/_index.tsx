import { Link } from "@remix-run/react";

    export default function Index() {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Real Estate App</h1>
          <p className="mb-4">
            This is the homepage. You can browse featured properties below.
          </p>

          {/* Placeholder for featured properties */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*  Single featured property card (repeated) */}
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="border rounded-lg p-4 shadow-md">
                <img
                  src={`https://via.placeholder.com/300x200?text=Property+${id}`}
                  alt={`Property ${id}`}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h2 className="text-xl font-semibold mb-2">Property {id}</h2>
                <p className="text-gray-600 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-lg font-bold">Price: $1,000,000</p>
                <Link
                  to={`/properties/${id}`}
                  className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
