import { Form, json } from '@remix-run/react'
import api from '../config'
import { ActionFunction } from '@remix-run/node'
import Input from '~/utils/Input'
import Button from '~/utils/Button'
import TextArea from '~/utils/TextArea'

export const loader = ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    return json({ email })
}
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const actionType = form.get("actionType");
    const data = Object.fromEntries(form);

    if (actionType === "add") {
        const text = data.todoText;
        const body = data.todoBody;
        if (text && body) {
            await api.post('/notes', { text, body });
        }
    } 

    return json({ form });
};
const todosNew = () => {
    return (
        <div>
            <Form method="post" className="space-y-4 m-10 block">
                <input type="hidden" name="actionType" value="add" />
                <Input label="Text" name="todoText" required placeholder='Enter todo...' />
                <input type="hidden" name="actionType" value="add" />
                <TextArea label="Body" name="todoBody" required placeholder='Enter body...' />
                <div className="flex justify-end">
                    <Button> Save </Button>
                </div>
            </Form>
        </div>
    )
}

export default todosNew