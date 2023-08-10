export default function CreateEditMappingFile({ columns }){
    const submit = (event) => {
        event.preventDefault();
    }

    return (
        <form id={"create-edit-mapping-form"} onSubmit={(e) => submit(e)}>

        </form>
    );
}