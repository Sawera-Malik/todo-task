import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../routes/session.server";

// Helper function
async function logoutAndRedirect(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

// Remix loader
export const loader: LoaderFunction = async ({ request }) => {
    return logoutAndRedirect(request);
};