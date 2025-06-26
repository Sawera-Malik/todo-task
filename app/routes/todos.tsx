import { json, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";

let todos: Array<{ id: number; text: string }> = [];

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
        throw new Response("Email is missing", { status: 400 });
    }
    try {
        const res = await axios.get('http://localhost:5000/notes');
        if (!res.data) {
            throw new Response("No data returned from server", { status: 500 });
        }
        return json({ todos: res.data, email });
    } catch (error) {
        console.error(error);
        throw new Response("Server error", { status: 500 });
    }

};


export const action: ActionFunction = async ({ request }) => {

    const form = await request.formData();
    const actionType = form.get("actionType");

    if (actionType === "add") {
        const text = form.get("todoText")?.toString();
        const body = form.get("todoBody")?.toString();
        if (text && body) {
            axios.post('http://localhost:5000/notes', { text, body })
        }
    } else if (actionType === "delete") {
        const id = Number(form.get("id"));
        await axios.delete(`http://localhost:5000/notes/${id}`);

    }


    return json({ todos });
};



export default function TodoList() {


    const { todos, email } = useLoaderData<typeof loader>();
    const [selectedTodo, setSelectedTodo] = useState<{ id: number; text: string; body: string } | null>(null);
    const [selectedForm, setSelectedForm] = useState(false);
    const navigaet = useNavigate()

    return (

        <div>
            <div className="flex h-full min-h-screen flex-col bg-white">
                <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                    <h1 className="text-3xl font-bold">
                        <span >Notes</span>
                    </h1>
                    <div>{email}</div>
                    <button
                        onClick={() => navigaet("/logout")}
                        type="submit"
                        className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                    >
                        Logout
                    </button>

                </header>


                <div className='flex w-full h-screen '>
                    <div className='border w-1/4 h-96 bg-gray-100 border-r-none h-screen'>
                        <h1 className=' text-blue-500 p-2 text-2xl border cursor-pointer' onClick={() => {
                            setSelectedForm(true);
                            setSelectedTodo(null);
                        }}>+ Add Notes</h1>
                        <ul>
                            {todos.map((todo: any) => (
                                <li key={todo.id} className="w-full border p-4 bg-white cursor-pointer flex justify-around" onClick={() => {
                                    setSelectedForm(false);
                                    setSelectedTodo(todo);
                                }}>
                                    <span className="text-black  w-96" >
                                        📝 {todo.text}{" "}
                                    </span>
                                    <Form method="post" className="flex justify-around" style={{ display: "inline" }}>
                                        <input type="hidden" name="actionType" value="delete" />
                                        <input type="hidden" name="id" value={todo.id} />
                                    </Form>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="w-3/4 h-screen">
                        {selectedForm && (
                            <Form method="post" className="space-y-4 m-10 block">
                                <input type="hidden" name="actionType" value="add" />
                                <label className="block text-sm font-medium mb-1 text-black " htmlFor="text">Text</label>

                                <input
                                    className="border bg-white text-black p-2 w-full m-4 rounded  outline-blue-500 "
                                    name="todoText"
                                    placeholder="Enter todo..."
                                    required
                                />
                                <input type="hidden" name="actionType" value="add" />
                                <label className="block text-sm font-medium mb-1 text-black" htmlFor="body">Body</label>
                                <textarea
                                    className="border bg-white text-black p-2 w-full m-4 rounded"
                                    name="todoBody"
                                    placeholder="Enter body..."
                                    required
                                    rows={9}
                                />
                                <div className="flex justify-end">

                                    <button className="bg-blue-500 px-4 py-2 text-white rounded ml-5" type="submit">
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                        {selectedTodo ? (
                            <div className="text-black h-96 w-full p-4 center  justify-center items-center m-10">
                                <div className="text-black h-96 w-full ">
                                    <h1 className="text-4xl font-bold">{selectedTodo.text}</h1>

                                    <p className="mt-2 text-gray-500 mb-10">{selectedTodo.body}</p>

                                    <hr />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white mt-6"
                                        onClick={() => setSelectedTodo(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
