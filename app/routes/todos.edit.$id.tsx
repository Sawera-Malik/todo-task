import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, json, useActionData, useLoaderData } from '@remix-run/react';
import TodoForm from '~/components/TodoForm'
import { getNote, updateNote } from '~/config/api';

export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const res = await getNote(id);

    return json(res.data);
}
export async function action({ request, params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const form = await request.formData();
    const text = form.get("todoText") as string;
    const body = form.get("todoBody") as string;
    let errors: Record<string, string> = {};

    if (!text) errors.todoText = "Text is required";
    if (!body) errors.todoBody = "Body is required";
    if (Object.keys(errors).length > 0) {
        return json({ errors, values: { text, body } }, { status: 400 });
    }

    await updateNote(id, { text, body });
    return json({ success: true });
}
const TodosEdit = () => {
    const loaderData = useLoaderData<{ body: string, text: string }>();
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <TodoForm actionData={actionData} defaultBody={loaderData.body} defaultText={loaderData.text} />
        </div>
    )
}

export default TodosEdit