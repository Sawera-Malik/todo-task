import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import api from "../config";
import Button from "~/components/Button";

export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id;
    const res = await api.get(`/notes/${id}`);
    return json(res.data);
}

export async function action({ request }: LoaderFunctionArgs) {
    const form = await request.formData();
    const id = form.get("id");
    if (id) {
        await api.delete(`/notes/${id}`);
    }
    return json({});
}

export default function TodoDetail() {
    const todo = useLoaderData<typeof loader>();

    return (
        <div className="text-black h-96 w-full p-4 center justify-center items-center m-10">
            <h1 className="text-4xl font-bold">{todo.text}</h1>
            <p className="mt-2 text-gray-500 mb-10">{todo.body}</p>
            <hr />
            <Form method="delete" className="mt-10 block">
                <Button>Delete</Button>
            </Form>
        </div>
    );
}
