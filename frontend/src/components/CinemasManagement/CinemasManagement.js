import { useEffect, useState, useRef } from "react"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from "primereact/calendar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import CinemaHalls from "../CinemaHalls/CinemaHalls";

const CinemasManagement = () => {
    const axiosPrivate = useAxiosPrivate()
    const [cinemas, setCinemas] = useState([])
    const cinemaTemplate = {
        country: "",
        city: "",
        adress: "",
        openingHours: {
            monday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            tuesday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            wednesday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            thursday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            friday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            saturday: {
                start: new Date(28800000),
                end: new Date(72000000),
            },
            sunday: {
                start: new Date(28800000),
                end: new Date(72000000),
            }
        }

    }
    const [addDataDialogMode, setAddDataDialogMode] = useState("ADD")
    const [addData, setAddData] = useState(cinemaTemplate)
    const toast = useRef(null)
    const [displayAddModal, setDisplayAddModal] = useState(false)

    const getTime = (dateStart, dateEnd) => (
        new Date(dateStart).toLocaleTimeString() + " - " + new Date(dateEnd).toLocaleTimeString()
    )

    const handleCinemasFetch = async () => {
        axiosPrivate.get('http://localhost:3000/cinemas')
        .then(response => setCinemas(response.data))
    } 

    const handleCinemaDelete = async (cinemaId) => {
        axiosPrivate.delete(`http://localhost:3000/cinema/${cinemaId}`)
        .then(response => {
            if(response.status == 200) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Cinema succesfully deleted', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while deleting cinema', life: 3000});
            }
        })
        .catch(async response => {
            console.error(response)
            await toast.current.show({severity:'error', summary: 'Error', detail:'Error while updating cinema', life: 3000});
        })
        handleCinemasFetch()
    }

    const parseDates = (data) => {
        for (const day in data.openingHours) {
            data.openingHours[day].start = new Date(data.openingHours[day].start)
            data.openingHours[day].end = new Date(data.openingHours[day].end)
        }
        return data
    }

    const handleCinemaAdd = async () => {
        axiosPrivate.post(`http://localhost:3000/cinema`, addData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async response => {
            if(response.status == 201) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Cinema succesfully created', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while creating cinema', life: 3000});
            }
            await setDisplayAddModal(false)
            await handleCinemasFetch()
        })
    }

    const handleCinemaEdit = async () => {
        axiosPrivate.put(`http://localhost:3000/cinema`, {
            id: addData._id,
            newCinema: {...addData }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async response => {
            if(response.status == 200) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Cinema succesfully edited', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while editing cinema', life: 3000});
            }
            await setDisplayAddModal(false)
            await handleCinemasFetch()
        })
    }

    const handleFormCancel = () => {
        setAddData(cinemaTemplate)
        setDisplayAddModal(false)
    }

    useEffect(handleCinemasFetch, [])

    return (
        <div>
            <Toolbar
                className="m-2 text-white"
                left={<span>Cinemas Management</span>} 
                right={<Button 
                    icon="pi pi-plus" 
                    label="New cinema"
                    onClick={() => {
                        setAddDataDialogMode("ADD")
                        setAddData(cinemaTemplate)
                        setDisplayAddModal(true)
                    }}
                />} 
            />
            <Dialog 
                header={addDataDialogMode == "ADD" ? "Add cinema" : "Edit cinema"}
                className="m-2"
                visible={displayAddModal}
                onHide={() => {
                    setDisplayAddModal(false)
                }}
                footer={addDataDialogMode == "ADD" 
                ? 
                    <div className="flex">
                        <Button 
                            icon="pi pi-plus"
                            label="Add cinema"
                            onClick={() => {
                                setAddDataDialogMode("ADD")
                                handleCinemaAdd()
                            }}
                        ></Button>
                        <Button icon="pi pi-times" label="Cancel" className="p-button-secondary ml-2" onClick={handleFormCancel}></Button>
                    </div> 
                : 
                    <div className="flex">
                        <Button 
                            icon="pi pi-save"
                            label="Save"
                            onClick={() => {
                                setAddDataDialogMode("EDIT")
                                handleCinemaEdit()
                            }}
                        ></Button>
                        <Button icon="pi pi-times" label="Cancel" className="p-button-secondary ml-2" onClick={handleFormCancel}></Button>
                    </div>}
            >
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="add-country" 
                            value={addData.country} 
                            onChange={(e) => setAddData(prevState => ({
                                ...prevState,
                                country: e.target.value
                            }))}
                        />
                        <label htmlFor="add-country">Country</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="add-country" 
                            value={addData.city} 
                            onChange={(e) => setAddData(prevState => ({
                                ...prevState,
                                city: e.target.value
                            }))}
                        />
                        <label htmlFor="add-country">City</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="add-country" 
                            value={addData.adress} 
                            onChange={(e) => setAddData(prevState => ({
                                ...prevState,
                                adress: e.target.value
                            }))}
                        />
                        <label htmlFor="add-country">Adress</label>
                    </span>
                </div>
                <div className="grid">
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Monday</label>
                            <div className="flex">
                                <Calendar 
                                    id="monday-start" value={addData.openingHours.monday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.monday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="monday-end" value={addData.openingHours.monday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.monday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Tuesday</label>
                            <div className="flex">
                                <Calendar 
                                    id="tuesday-start" value={addData.openingHours.tuesday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.tuesday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="tuesday-end" value={addData.openingHours.tuesday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.tuesday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Wednesday</label>
                            <div className="flex">
                                <Calendar 
                                    id="wednesday-start" value={addData.openingHours.wednesday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.wednesday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="wednesday-end" value={addData.openingHours.wednesday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.wednesday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Thursday</label>
                            <div className="flex">
                                <Calendar 
                                    id="thursday-start" value={addData.openingHours.thursday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.thursday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="thursday-end" value={addData.openingHours.thursday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.thursday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Friday</label>
                            <div className="flex">
                                <Calendar 
                                    id="friday-start" value={addData.openingHours.friday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.friday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="friday-end" value={addData.openingHours.friday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.friday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Saturday</label>
                            <div className="flex">
                                <Calendar 
                                    id="saturday-start" value={addData.openingHours.saturday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.saturday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="saturday-end" value={addData.openingHours.saturday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.saturday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                    <div className="field col-12 md:col-4">
                            <label htmlFor="monday-start">Sunday</label>
                            <div className="flex">
                                <Calendar 
                                    id="sunday-start" value={addData.openingHours.sunday.start} onChange={(e) => setAddData(prevState => {prevState.openingHours.sunday.start = e.target.value; return prevState})} timeOnly
                                /> 
                                <Calendar 
                                    id="sunday-end" value={addData.openingHours.sunday.end} onChange={(e) => setAddData(prevState => {prevState.openingHours.sunday.end = e.target.value; return prevState})} timeOnly
                                />
                            </div>
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
            <div className="grid p-3">
                {cinemas.map(cinema => {
                    return(
                        <Card
                            className="m-1"
                            key={cinema._id}
                            title={`${cinema.adress}`}
                            subTitle={`${cinema.city}, ${cinema.country}`}
                            footer={
                                <span>
                                    <Button 
                                        label="Edit" 
                                        icon="pi pi-pencil"
                                        onClick={() => {
                                            setAddDataDialogMode("EDIT")
                                            setDisplayAddModal(true)
                                            setAddData(parseDates(cinema))
                                        }}
                                    />
                                    <Button 
                                        label="Delete" 
                                        icon="pi pi-times" 
                                        className="p-button-secondary ml-2"
                                        onClick={() => {
                                            handleCinemaDelete(cinema._id)
                                        }}
                                    />
                                </span>
                            }
                        >
                            <div>
                                <ul>
                                    <li>Monday: {getTime(cinema.openingHours.monday.start, cinema.openingHours.monday.end)}</li>
                                    <li>Tuesday: {getTime(cinema.openingHours.tuesday.start, cinema.openingHours.tuesday.end)}</li>
                                    <li>Wednesday: {getTime(cinema.openingHours.wednesday.start, cinema.openingHours.wednesday.end)}</li>
                                    <li>Thursday: {getTime(cinema.openingHours.thursday.start, cinema.openingHours.thursday.end)}</li>
                                    <li>Friday: {getTime(cinema.openingHours.friday.start, cinema.openingHours.friday.end)}</li>
                                    <li>Saturday: {getTime(cinema.openingHours.saturday.start, cinema.openingHours.saturday.end)}</li>
                                    <li>Sunday: {getTime(cinema.openingHours.sunday.start, cinema.openingHours.sunday.end)}</li>
                                </ul>
                            </div>
                            <CinemaHalls cinemaId={cinema._id} />
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default CinemasManagement