import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useActionData, useLoaderData } from '@remix-run/react';
import TodoForm from '~/components/TodoForm'
import { getNote, updateNote } from '~/config/api';
import { validationError } from 'remix-validated-form';
import { validatorTodo } from '~/validation';

export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const res = await getNote(id);

    return json(res.data);
}
export async function action({ request, params }: LoaderFunctionArgs) {
    const id = params.id as string;
    const form = await request.formData();
    const data = Object.fromEntries(form);
    const result = await validatorTodo.validate(
        await data
    )
    if (result.error) {
        return validationError(result.error)
    }
    const { text, body } = result.data;

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

export default TodosEdit;