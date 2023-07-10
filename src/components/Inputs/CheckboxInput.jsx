//props: text, name, checked, onChange
export default function CheckboxInput({text, name, checked, onChange}) {

    return (
        <div className="input">
            <p>{text}</p>
            <input type="checkbox" name={name} checked={checked} onChange={event => onChange(event.target.name, event.target.name)}></input>
        </div>
    )
}