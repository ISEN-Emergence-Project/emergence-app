import React, {useState} from "react"
import {LaureateDropDownButton} from "../../components/LaureateDropDownButton"
import GodfatherMeetings from "../components/GodfatherMeetings";


export function MeetingPlanning() {
    const [ godfathers, setGodfathers ] = useState([]);
    
    return (
        <>
            <div className='container py-4'>
                <h1>Speed Meeting Planning</h1>
                <div className='col-2'>

                </div>
                <div className="col-8">

                </div>
                <div className="col-2">

                </div>
                {godfathers.map((godfather) => {
                    return (
                        <div className='container' key={godfather.accountId}>
                            <GodfatherMeetings godfather={godfather} />
                        </div>
                    )
                })}
            </div>
            <div>
                <div className="container d-flex flex-direction-row justify-content-between">
                    <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
                    <LaureateDropDownButton name = "Bibo huinej"/>
                    <LaureateDropDownButton name = "OK letsgo"/>
                    <LaureateDropDownButton name = "hello everyone"/>
                    <LaureateDropDownButton name = "everyone what'sup"/>
                </div>

                <div className="container d-flex flex-direction-row justify-content-between">
                    <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
                    <LaureateDropDownButton name = "Bibo huinej"/>
                    <LaureateDropDownButton name = "OK letsgo"/>
                    <LaureateDropDownButton name = "hello everyone"/>
                    <LaureateDropDownButton name = "everyone what'sup"/>
                </div>


                <div className="container d-flex flex-direction-row justify-content-between">
                    <p className="mt-5 btn btn-primary "> <strong>Godfather</strong></p>
                    <LaureateDropDownButton name = "Bibo huinej"/>
                    <LaureateDropDownButton name = "OK letsgo"/>
                    <LaureateDropDownButton name = "hello everyone"/>
                    <LaureateDropDownButton name = "everyone what'sup"/>
                </div>
            </div>
            <div className="container-fluid fixed-bottom bg-light shadow border-top">
                <div className="d-flex flex-nowrap flex-column flex-sm-row">
                    <div className='d-flex flex-nowrap align-items-center ml-auto py-2 '>
                        <p className='m-0 mr-3 text-secondary text-small'>Sélectionnez 4 lauréats</p>
                        {(false) ? (
                            <button className='btn btn-danger cursor-not-allowed' disabled data-toggle="tooltip" data-placement="top" title="Sélectionnez 4 laureats">Valider</button>
                        ) : (
                            <button className='btn btn-success' type='submit'>Valider</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
