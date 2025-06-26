import { json, type ActionFunction } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import {
  getSession,
  commitSession,
} from "./session.server";
import { LoaderFunctionArgs } from "@remix-run/node";


export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const form = await request.formData();
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  async function validateCredentials(email: string | undefined, password: string | undefined) {
    if (email && password) return email;
    return null;
  }

  const userId = await validateCredentials(email, password);


  if (userId === null) {
    return redirect("/login")
  }

  session.set("userId", userId);
  return redirect(`/todos?email=${encodeURIComponent(userId)}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });

};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  console.log('session', session);

  if (session.has("userId")) {
    return redirect("/todos")
  }
  const data = {
    error: session.get("error"),
  };
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}



export default function LoginPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-800 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-gray-300">
        <h2 className="text-4xl font-bold mb-6 text-center text-slate-800">Login Form</h2>

        {actionData?.error && (
          <p className="text-red-600 text-sm mb-4 text-center">{actionData.error}</p>
        )}
        {actionData?.message && (
          <p className="text-green-600 text-sm mb-4 text-center">{actionData.message}</p>
        )}

        <Form method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black" htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full  bg-gray-200  text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black" htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full bg-gray-200 text-black mb-8  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </Form>
      </div>
    </div>

  );
}

