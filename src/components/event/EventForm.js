import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"


export const EventForm = () => {
    const history = useHistory()
    const { getGames, games } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    const [currentEvent, setCurrentEvent] = useState({
        organizer: 0,
        description: "",
        game: 0,
        date: 0,
        time: 0
    })

    useEffect(() => {
        getGames()
    }, [])

    const changeEventGameState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.game = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDescriptionState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.description = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventDateState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.date = event.target.value
        setCurrentEvent(newEventState)
    }

    const changeEventTimeState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState.time = event.target.value
        setCurrentEvent(newEventState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_id">Game: </label>
                    <select name="game_id" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventGameState }>
                        <option value="0">Select a game...</option>
                        {
                            games?.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.name}
                            </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventDescriptionState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start_date">Start Date: </label>
                    <input type="date" name="startDate" required className="form-control"
                        value={currentEvent.start_date}
                        onChange={changeEventDateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Start Time: </label>
                    <input type="time" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventTimeState}
                    />
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game_id: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}