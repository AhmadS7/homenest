import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, redirect as redirect$1 } from "@remix-run/node";
import { RemixServer, Link, Outlet as Outlet$1, Meta, Links, ScrollRestoration, Scripts, useLoaderData, Form, useActionData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-gray-800 text-white py-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex items-center justify-between", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "text-xl font-bold", children: "Real Estate App" }),
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-4", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-gray-300", children: "Home" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/properties", className: "hover:text-gray-300", children: "Properties" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/auth/login", className: "hover:text-gray-300", children: "Login" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/auth/register", className: "hover:text-gray-300", children: "Register" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/admin", className: "hover:text-gray-300", children: "Admin" }) })
    ] }) })
  ] }) });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Header, {}),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Outlet$1, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ params }) => {
  const propertyId = params.propertyId;
  const property = {
    id: propertyId,
    title: `Property ${propertyId}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 1e6,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2e3,
    location: {
      address: "123 Main St, Anytown, USA",
      latitude: 37.7749,
      longitude: -122.4194
    },
    agent: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567"
    }
  };
  return json({ property });
};
function PropertyDetails() {
  const { property } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: property.title }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-md", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `https://via.placeholder.com/600x400?text=Property+${property.id}`,
          alt: property.title,
          className: "w-full h-96 object-cover mb-4 rounded-md"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: property.description }),
      /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold mb-2", children: [
        "Price: $",
        property.price
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        "Bedrooms: ",
        property.bedrooms
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        "Bathrooms: ",
        property.bathrooms
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        "Sqft: ",
        property.sqft
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "Location" }),
      /* @__PURE__ */ jsx("p", { className: "mb-2", children: property.location.address }),
      /* @__PURE__ */ jsx("div", { className: "h-64 bg-gray-200 rounded-md mb-4", children: "Map Placeholder" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-6 mb-2", children: "Agent Contact" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        "Name: ",
        property.agent.name
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
        "Email: ",
        property.agent.email
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Phone: ",
        property.agent.phone
      ] })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PropertyDetails,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function AdminNewProperty() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Add New Property" }),
    /* @__PURE__ */ jsxs(
      Form,
      {
        method: "post",
        className: "bg-white rounded-lg p-6 shadow-md",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700", children: "Title" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "title",
                name: "title",
                required: true,
                className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "description",
                className: "block text-sm font-medium text-gray-700",
                children: "Description"
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                name: "description",
                required: true,
                rows: 4,
                className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "price", className: "block text-sm font-medium text-gray-700", children: "Price" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                id: "price",
                name: "price",
                required: true,
                className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
              children: "Create Property"
            }
          ) })
        ]
      }
    )
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminNewProperty
}, Symbol.toStringTag, { value: "Module" }));
function AdminProperties() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Manage Properties" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "This is where you can manage all property listings." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/admin/properties/new",
        className: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block",
        children: "Add New Property"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-4 shadow-md", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Property list will go here..." }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminProperties
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  if (password !== confirmPassword) {
    return json({ error: "Passwords do not match" }, { status: 400 });
  }
  if (email && password) {
    return redirect$1("/admin", {
      // Redirect to login after successful registration
      headers: {
        "Set-Cookie": "user=newuser; Path=/; HttpOnly"
        // VERY INSECURE!
      }
    });
  }
  return json({ error: "Registration failed" }, { status: 400 });
};
function Register() {
  const actionData = useActionData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Register" }),
    /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email:" }),
        /* @__PURE__ */ jsx("input", { type: "email", id: "email", name: "email", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password:" }),
        /* @__PURE__ */ jsx("input", { type: "password", id: "password", name: "password", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password:" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            id: "confirmPassword",
            name: "confirmPassword",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "Register" })
    ] }),
    (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("p", { style: { color: "red" }, children: actionData.error })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("user=admin")) {
    return redirect("/auth/login");
  }
  const data = {
    userCount: 10,
    // Replace with actual data
    propertyCount: 25
    // Replace with actual data
  };
  return json(data);
};
function AdminIndex() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Admin Dashboard" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Welcome to the admin dashboard." }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Users" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Total Users: ",
          data.userCount
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/users",
            className: "mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
            children: "Manage Users"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Properties" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Total Properties: ",
          data.propertyCount
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/properties",
            className: "mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
            children: "Manage Properties"
          }
        )
      ] })
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminIndex,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email === "test@example.com" && password === "password") {
    return redirect$1("/admin", {
      headers: {
        "Set-Cookie": "user=admin; Path=/; HttpOnly"
        // VERY INSECURE!
      }
    });
  }
  return json({ error: "Invalid credentials" }, { status: 401 });
};
function Login() {
  const actionData = useActionData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Login" }),
    /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email:" }),
        /* @__PURE__ */ jsx("input", { type: "email", id: "email", name: "email", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password:" }),
        /* @__PURE__ */ jsx("input", { type: "password", id: "password", name: "password", required: true })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", children: "Login" })
    ] }),
    (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("p", { style: { color: "red" }, children: actionData.error })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request }) => {
  const cookie = request.headers.get("Cookie");
  if (!cookie || !cookie.includes("user=admin")) {
    return redirect$1("/auth/login");
  }
  const users = [
    { id: 1, email: "user1@example.com", role: "buyer" },
    { id: 2, email: "user2@example.com", role: "seller" },
    { id: 3, email: "admin@example.com", role: "admin" }
  ];
  return json({ users });
};
function AdminUsers() {
  const { users } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Manage Users" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "This is where you can manage all users." }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-4 shadow-md", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: "ID"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: "Email"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: "Role"
          }
        ),
        /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: "Actions"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: users.map((user) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: user.id }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: user.role }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("button", { className: "text-blue-500 hover:text-blue-700 mr-2", children: "Edit" }),
          /* @__PURE__ */ jsx("button", { className: "text-red-500 hover:text-red-700", children: "Delete" })
        ] })
      ] }, user.id)) })
    ] }) })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminUsers,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Welcome to the Real Estate App" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4", children: "This is the homepage. You can browse featured properties below." }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((id) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4 shadow-md", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `https://via.placeholder.com/300x200?text=Property+${id}`,
          alt: `Property ${id}`,
          className: "w-full h-48 object-cover mb-4 rounded-md"
        }
      ),
      /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold mb-2", children: [
        "Property ",
        id
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-2", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: "Price: $1,000,000" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: `/properties/${id}`,
          className: "mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          children: "View Details"
        }
      )
    ] }, id)) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
/* @__PURE__ */ jsx(Outlet, {});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-eV2UqeqF.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DsNYfkEr.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": ["/assets/root-BplO1K5I.css"] }, "routes/properties.$propertyId": { "id": "routes/properties.$propertyId", "parentId": "root", "path": "properties/:propertyId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/properties._propertyId-RbQ8kfsc.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/admin.properties_.new": { "id": "routes/admin.properties_.new", "parentId": "root", "path": "admin/properties/new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/admin.properties_.new-B5FGCj6j.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/admin.properties": { "id": "routes/admin.properties", "parentId": "root", "path": "admin/properties", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/admin.properties-CkFzhJiP.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/_auth.register": { "id": "routes/_auth.register", "parentId": "routes/_auth", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.register-Dn4nFHIz.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/admin._index": { "id": "routes/admin._index", "parentId": "root", "path": "admin", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/admin._index-B6JdyYrk.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/_auth.login": { "id": "routes/_auth.login", "parentId": "routes/_auth", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth.login-BqVEhJ7p.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/admin.users": { "id": "routes/admin.users", "parentId": "root", "path": "admin/users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/admin.users-CARDh9-a.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C51I_WKJ.js", "imports": ["/assets/components-BiZfNbNv.js"], "css": [] }, "routes/_auth": { "id": "routes/_auth", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_auth-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-5ce6a891.js", "version": "5ce6a891" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/properties.$propertyId": {
    id: "routes/properties.$propertyId",
    parentId: "root",
    path: "properties/:propertyId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/admin.properties_.new": {
    id: "routes/admin.properties_.new",
    parentId: "root",
    path: "admin/properties/new",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/admin.properties": {
    id: "routes/admin.properties",
    parentId: "root",
    path: "admin/properties",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_auth.register": {
    id: "routes/_auth.register",
    parentId: "routes/_auth",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/admin._index": {
    id: "routes/admin._index",
    parentId: "root",
    path: "admin",
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_auth.login": {
    id: "routes/_auth.login",
    parentId: "routes/_auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/admin.users": {
    id: "routes/admin.users",
    parentId: "root",
    path: "admin/users",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_auth": {
    id: "routes/_auth",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
