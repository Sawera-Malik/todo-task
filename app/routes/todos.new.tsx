import { json, useActionData } from '@remix-run/react'
import { ActionFunction } from '@remix-run/node'
import { createNote } from '~/services/api'
import TodoForm from '~/components/TodoForm'
import { validationError } from 'remix-validated-form'
import { todoValidator } from '~/validation'

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    return json({ email });
}
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);
    const result = await todoValidator.validate(
        await data
    )
    if (result.error) {
        return validationError(result.error)
    }
    const { text, body } = result.data;
    await createNote({ text, body });
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

export default TodosNew;