import { Form, json, useActionData } from '@remix-run/react'
import { ActionFunction } from '@remix-run/node'
import Input from '~/components/Input'
import Button from '~/components/Button'
import api from '~/config/apiClient'
import { createNote, getNote } from '~/config/api'
import TodoForm from '~/components/TodoForm'

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    return json({ email });

}
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const actionType = form.get("actionType");
    const data = Object.fromEntries(form);
    let errors: Record<string, string> = {};

    if (actionType === "add") {
        const text = data.todoText as string;
        const body = data.todoBody as string;
        if (!text) errors.todoText = "Text is required";
        if (!body) errors.todoBody = "Body is required";
        if (Object.keys(errors).length > 0) {
            return json({ errors, values: data }, { status: 400 });
        }
        if (text && body) {
            await createNote({ text, body });
        }
    }

    return json({ success: true });
};
const TodosNew = () => {
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <TodoForm actionData={actionData} />
        </div>
    )
}

export default TodosNew