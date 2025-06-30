import { Form, json, useActionData } from '@remix-run/react'
import api from '../config'
import { ActionFunction } from '@remix-run/node'
import Input from '~/components/Input'
import Button from '~/components/Button'

export const loader = ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    return json({ email })
}
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const actionType = form.get("actionType");
    const data = Object.fromEntries(form);
    let errors: Record<string, string> = {};

    if (actionType === "add") {
        const text = data.todoText;
        const body = data.todoBody;
        if (!text) errors.todoText = "Text is required";
        if (!body) errors.todoBody = "Body is required";
        if (Object.keys(errors).length > 0) {
            return json({ errors, values: data }, { status: 400 });
        }
        if (text && body) {
            await api.post('/notes', { text, body });
        }
    }

    return json({ success: true });
};
const todosNew = () => {
    const actionData = useActionData<typeof action>();

    return (
        <div>
            <Form method="post" className="space-y-4 m-10 block">
                <input type="hidden" name="actionType" value="add" />
                <Input type='text' label="Text" name="todoText" placeholder='Enter todo...' error={actionData?.errors?.todoText} />
                <input type="hidden" name="actionType" value="add" />
                <Input type='textarea' label="Body" name="todoBody" rows={9} placeholder='Enter body... ' error={actionData?.errors?.todoBody} />
                <div className="flex justify-end">
                    <Button> Save </Button>
                </div>
            </Form>
        </div>
    )
}

export default todosNew