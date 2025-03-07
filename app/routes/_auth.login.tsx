import { Form, useActionData } from "@remix-run/react";
    import { json, redirect } from "@remix-run/node";
    import type { ActionFunction } from "@remix-run/node";

    export const action: ActionFunction = async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");

      // **CRITICAL: Replace this with actual authentication logic.**
      if (email === "test@example.com" && password === "password") {
        // **CRITICAL: Use a secure session management system in a real app.**
        return redirect("/admin", {
          headers: {
            "Set-Cookie": "user=admin; Path=/; HttpOnly", // VERY INSECURE!
          },
        });
      }

      return json({ error: "Invalid credentials" }, { status: 401 });
    };

    export default function Login() {
      const actionData = useActionData<typeof action>();

      return (
        <div>
          <h1>Login</h1>
          <Form method="post">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
          </Form>
          {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        </div>
      );
    }
