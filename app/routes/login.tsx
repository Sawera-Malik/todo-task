import { json, type ActionFunction } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "../session.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { validationError } from "remix-validated-form";
import { validatorLogin } from "~/validation";

async function validateCredentials(email: string | undefined, password: string | undefined) {
  if (email && password) return email;
  return null;
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const form = await request.formData();
  const result = await validatorLogin.validate(
    await form,
  );

  if (result.error) {
    return validationError(result.error)
  }

  const { email, password } = result.data;

  const userId = await validateCredentials(email, password);
  if (userId === null) {
    return json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
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

        <Form method="post" className="space-y-4">
          <div>
            <Input label="Email" type="email" name="email" placeholder='Enter your email' />
            {actionData?.fieldErrors?.email && (
              <p className="text-red-600 text-xs mt-1">{actionData.fieldErrors.email}</p>
            )}
          </div>
          <div>
            <Input label="Password" type="password" name="password" placeholder='Enter your password' />
            {actionData?.fieldErrors?.password && (
              <p className="text-red-600 text-xs mt-1">{actionData.fieldErrors.password}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="danger">Login</Button>
          </div>
        </Form>
      </div>
    </div>

  );
}

