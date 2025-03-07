import { Form, useActionData } from "@remix-run/react";
    import { json, redirect } from "@remix-run/node";
    import type { ActionFunction } from "@remix-run/node";

    export const action: ActionFunction = async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
          return json({ error: "Passwords do not match" }, { status: 400 });
        }

      // **CRITICAL: Replace this with actual user creation logic (including password hashing).**
      if (email && password) {
        // **CRITICAL: Use a secure session management system in a real app.**
        return redirect("/admin", { // Redirect to login after successful registration
          headers: {
            "Set-Cookie": "user=newuser; Path=/; HttpOnly", // VERY INSECURE!
          },
        });
      }

      return json({ error: "Registration failed" }, { status: 400 });
    };

    export default function Register() {
      const actionData = useActionData<typeof action>();

      return (
        <div>
          <h1>Register</h1>
          <Form method="post">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </div>
            <button type="submit">Register</button>
          </Form>
          {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
        </div>
      );
    }
