import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "../routes/session.server";

async function logoutAndRedirect(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    console.log('>>> logout', request.headers);

    return redirect("/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export const loader: LoaderFunction = async ({ request }) => {
    return logoutAndRedirect(request);
};