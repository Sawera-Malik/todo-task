import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (userId) {
    return redirect(`/todos?email=${encodeURIComponent(userId)}`);
  } else {
    return redirect("/login");
  }
};

export default function Index() {
  return null;
}