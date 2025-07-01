import Input from './Input'
import Button from './Button'

type TodoFormProps = {
    actionData?: any;
    defaultText?: string;
    defaultBody?: string;
};
const TodoForm = ({ actionData, defaultBody, defaultText }: TodoFormProps) => {
    return (
        <div> <input type="hidden" name="actionType" value="add" />
            <Input type='text' label="Text" name="todoText" placeholder='Enter todo...' error={actionData?.errors?.todoText} defaultValue={defaultText} />
            <input type="hidden" name="actionType" value="add" />
            <Input key={defaultBody} type='textarea' label="Body" name="todoBody" rows={9} placeholder='Enter body... ' error={actionData?.errors?.todoBody} defaultValue={defaultBody} />
            <div className="flex justify-end">
                <Button> Save </Button>
            </div></div>
    )
}

export default TodoForm