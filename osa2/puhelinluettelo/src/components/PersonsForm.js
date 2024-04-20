const PersonsForm = ({handleSubmit, handlePersonsChange, handleNumberChange}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>name: <input onChange={handlePersonsChange} /></div>
                <div>number: <input onChange={handleNumberChange} /></div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonsForm