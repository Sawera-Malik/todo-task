import Input from './Input'
import Button from './Button'
import { Form } from '@remix-run/react';

type TodoFormProps = {
    actionData?: any;
    defaultText?: string;
    defaultBody?: string;
};
const TodoForm = ({ actionData, defaultBody, defaultText }: TodoFormProps) => {
    return (
        <div>
            <Form method="post" className="space-y-4 m-10 block">
                <Input type='text' label="Text" name="text" placeholder='Enter todo...' defaultValue={defaultText} />
                {actionData?.fieldErrors?.text && <p className="text-red-600 text-xs mt-1">{actionData.fieldErrors.text}</p>}
                <Input key={defaultBody} type='textarea' label="Body" name="body" rows={9} placeholder='Enter body... ' defaultValue={defaultBody} />
                {actionData?.fieldErrors?.body && <p className="text-red-600 text-xs mt-1">{actionData.fieldErrors.body}</p>}
                <div className="flex justify-end">
                    <Button> Save </Button>
                </div>
            </Form>
        </div>
    )
}

export default TodoForm