import { useState } from "react"

export default function Player({name , symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    let editablePlayerName = !isEditing 
    ? <span className="player-name">{playerName}</span> 
    : <input type="text" required value={playerName} onChange={handleChange}/>;

    function handleChange(event){
        setPlayerName(event.target.value)       
    }

    function IsEdit(){
        setIsEditing(isEditing => !isEditing)
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button
                onClick={IsEdit}
            >{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}