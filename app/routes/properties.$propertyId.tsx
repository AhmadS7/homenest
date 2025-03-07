import { useLoaderData } from "@remix-run/react";
    import { json } from "@remix-run/node";
    import type { LoaderFunction } from "@remix-run/node";

    export const loader: LoaderFunction = async ({ params }) => {
      const propertyId = params.propertyId;

      // **CRITICAL: Replace with actual data fetching from the database.**
      const property = {
        id: propertyId,
        title: `Property ${propertyId}`,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 1000000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2000,
        location: {
          address: "123 Main St, Anytown, USA",
          latitude: 37.7749,
          longitude: -122.4194,
        },
        agent: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "555-123-4567",
        },
      };

      return json({ property });
    };

    export default function PropertyDetails() {
      const { property } = useLoaderData<typeof loader>();

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <img
              src={`https://via.placeholder.com/600x400?text=Property+${property.id}`}
              alt={property.title}
              className="w-full h-96 object-cover mb-4 rounded-md"
            />
            <p className="text-gray-600 mb-4">{property.description}</p>
            <p className="text-lg font-bold mb-2">Price: ${property.price}</p>
            <p className="mb-2">Bedrooms: {property.bedrooms}</p>
            <p className="mb-2">Bathrooms: {property.bathrooms}</p>
            <p className="mb-2">Sqft: {property.sqft}</p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Location</h2>
            <p className="mb-2">{property.location.address}</p>
            {/* Placeholder for map integration */}
            <div className="h-64 bg-gray-200 rounded-md mb-4">Map Placeholder</div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Agent Contact</h2>
            <p className="mb-2">Name: {property.agent.name}</p>
            <p className="mb-2">Email: {property.agent.email}</p>
            <p>Phone: {property.agent.phone}</p>
          </div>
        </div>
      );
    }
