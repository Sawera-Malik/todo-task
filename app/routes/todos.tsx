import { json, type LoaderFunction } from "@remix-run/node";
import { Form, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import api from "../config";
import Button from "~/utils/Button";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    try {
        const res = await api.get('/notes');
        if (!res.data) {
            throw new Response("No data returned from server", { status: 500 });
        }
        return json({ todos: res.data, email });
    } catch (error) {
        throw new Response("Server error", { status: 500 });
    }
};

export default function TodoList() {
    const { todos, email } = useLoaderData<typeof loader>();
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex h-full min-h-screen flex-col bg-white">
                <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                    <h1 className="text-3xl font-bold">
                        <span >Notes</span>
                    </h1>
                    <div>{email}</div>
                    <Button onClick={() => navigate("/logout")}> Logout </Button>
                </header>
                <div className='flex w-full h-screen '>
                    <div className='border w-1/4 h-96 bg-gray-100 border-r-none h-screen'>
                        <h1 className=' text-blue-500 p-2 text-2xl border cursor-pointer' onClick={() => navigate(`/todos/new?email=${email}`)}>+ Add Notes</h1>
                        <ul>
                            {todos.map((todo: any) => (
                                <li key={todo.id} className="w-full border p-4 bg-white cursor-pointer flex justify-around" onClick={() => navigate(`/todos/${todo.id}?email=${email}`)}>
                                    <span className="text-black  w-96" >
                                        📝 {todo.text}{" "}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-3/4 h-screen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
