export default function NumberInput({text, value, handleChange}) {
    
    return (
        <div className="input">
            <p>{text}</p>
            <input type="number" value={value} onChange={handleChange}></input>
        </div>
    )
}