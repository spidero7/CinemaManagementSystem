import { useState, useEffect, useRef } from "react"
import { Accordion, AccordionTab } from 'primereact/accordion'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber"
import { Toast } from 'primereact/toast';
import { Dialog } from "primereact/dialog";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import PropTypes from 'prop-types';


const CinemaHalls = ({cinemaId}) => {
    const axiosPrivate = useAxiosPrivate()
    
    CinemaHalls.propTypes = {
        cinemaId: PropTypes.string
    };

    const hallTemplate = {
        name: "",
        rows: 10,
        cols: 10,
        cinemaId: cinemaId
    }

    const [cinemaHalls, setCinemaHalls] = useState([])
    const [activeCinemaHall, setActiveCinemaHall] = useState(null)
    const [cinemaHallDialogMode, setCinemaHallDialogMode] = useState("ADD")
    const [displayCinemaHallModal, setDisplayCinemaHallModal] = useState(false)
    const [hallData, setHallData] = useState(hallTemplate)
    const toast = useRef(null)

    useEffect(() => {
        handleCinemaHallsFetch()
    },[])

    const handleCinemaHallsFetch = async () => {
        axiosPrivate.get(`http://localhost:3000/cinema-halls/${cinemaId}`)
        .then(response => {
            setCinemaHalls(response.data)
            setHallData(hallTemplate)
        })
    }

    const handleCinemaHallClick = (itemIndex) => {
        let _activeCinemaHall = activeCinemaHall ? [...activeCinemaHall] : [];

        if (activeCinemaHall.length === 0) {
            activeCinemaHall.push(itemIndex);
        } else {
            const index = _activeCinemaHall.indexOf(itemIndex);
            if (index === -1) {
                _activeCinemaHall.push(itemIndex);
            } else {
                _activeCinemaHall.splice(index, 1);
            }
        }

        setActiveCinemaHall(_activeCinemaHall);
    }

    const handleCinemaHallAdd = () => {
        axiosPrivate.post('http://localhost:3000/cinema-hall', hallData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            handleCinemaHallsFetch()
            if(response.status == 201) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Hall succesfully created', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while creating cinema', life: 3000});
            }
            setHallData(hallTemplate)
            handleCinemaHallsFetch()
        })
        .catch(response => {
            console.error(response)
            toast.current.show({severity:'error', summary: 'Error', detail:'Error while creating cinema', life: 3000});
        })
    }

    const handleCinemaHallDelete = (id) => {
        axiosPrivate.delete(`http://localhost:3000/cinema-hall/${id}`,)
        .then(response => {
            handleCinemaHallsFetch()
            if(response.status == 200) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Hall succesfully deleted', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while deleting cinema', life: 3000});
            }
            setHallData(hallTemplate)
        })
    }

    const handleCinemaHallEdit = async () => {
        axiosPrivate.put('http://localhost:3000/cinema-hall', {
            id: hallData.id,
            newCinemaHall: {
                name: hallData.name,
                rows: hallData.rows,
                cols: hallData.cols
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async response => {
            console.log(response)
            await handleCinemaHallsFetch()
            if(response.status == 200) {
                console.log("xD")
                await toast.current.show({severity:'success', summary: 'Success', detail:'Hall succesfully updated', life: 3000});
            }
            await setHallData(hallTemplate)
        })
        .catch(async response => {
            console.error(response)
            await toast.current.show({severity:'error', summary: 'Error', detail:'Error while updating cinema', life: 3000});
        })
    }

    const handleFormCancel = () => {
        setHallData(hallTemplate)
        setDisplayCinemaHallModal(false)
    }

    return (
        <div>
            <Toast ref={toast} />
            <Dialog 
                header={cinemaHallDialogMode == "ADD" ? "Add hall" : "Edit hall"}
                className="m-2"
                visible={displayCinemaHallModal}
                onHide={() => {
                    setDisplayCinemaHallModal(false)
                }}
                footer={cinemaHallDialogMode == "ADD" 
                ? 
                    <div className="flex">
                        <Button 
                            icon="pi pi-plus"
                            label="Add hall"
                            onClick={() => {
                                setDisplayCinemaHallModal(false)
                                handleCinemaHallAdd()
                            }}
                        ></Button>
                        <Button icon="pi pi-times" label="Cancel" className="p-button-secondary ml-2"
                            onClick={handleFormCancel}
                        ></Button>
                    </div> 
                : 
                    <div className="flex">
                        <Button 
                            icon="pi pi-save"
                            label="Save"
                            onClick={() => {
                                setDisplayCinemaHallModal(false)
                                handleCinemaHallEdit()
                            }}
                        ></Button>
                        <Button icon="pi pi-times" label="Cancel" className="p-button-secondary ml-2"
                            onClick={handleFormCancel}
                        ></Button>
                    </div>}
            >
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="name" 
                            value={hallData.name} 
                            onChange={(e) => setHallData(prevState => ({
                                ...prevState,
                                name: e.target.value
                            }))}
                        />
                        <label htmlFor="name">Name</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <span>Number of rows:</span><br />
                        <InputNumber id="rows" 
                            value={hallData.rows} 
                            showButtons
                            buttonLayout="horizontal"
                            step={1}
                            decrementButtonClassName="p-button-danger" 
                            incrementButtonClassName="p-button-success" 
                            incrementButtonIcon="pi pi-plus" 
                            decrementButtonIcon="pi pi-minus"
                            onValueChange={(e) => setHallData(prevState => ({
                                ...prevState,
                                rows: e.target.value
                            }))}
                            min={1}
                            max={200}
                        />
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <span>Number of columns:</span><br />
                        <InputNumber id="cols" 
                            value={hallData.cols} 
                            showButtons
                            buttonLayout="horizontal"
                            step={1}
                            decrementButtonClassName="p-button-danger" 
                            incrementButtonClassName="p-button-success" 
                            incrementButtonIcon="pi pi-plus" 
                            decrementButtonIcon="pi pi-minus"
                            onValueChange={(e) => setHallData(prevState => ({
                                ...prevState,
                                cols: e.target.value
                            }))}
                            min={1}
                            max={200}
                        />
                    </span>
                </div>
            </Dialog>
            <div className="m-2">Halls:</div>
            <Accordion 
                activeIndex={null}
            >
            {cinemaHalls.map((cinemaHall) => {
                return (
                    <AccordionTab 
                    key={cinemaHall._id}
                    header={cinemaHall.name}
                    onClick={handleCinemaHallClick}
                    >
                        <span>Seats:</span>
                        <ul>
                            <li>Row count: {cinemaHall.rows}</li>
                            <li>Columns count: {cinemaHall.cols}</li>
                        </ul>
                        <Button 
                            icon="pi pi-pencil" 
                            label="Edit hall"
                            onClick={() => {
                                setCinemaHallDialogMode("EDIT")
                                setHallData({
                                    name: cinemaHall.name,
                                    rows: cinemaHall.rows,
                                    cols: cinemaHall.cols,
                                    id: cinemaHall._id,
                                    cinemaId: cinemaHall.cinemaId
                                })
                                setDisplayCinemaHallModal(true)
                            }}
                        />
                        <Button 
                            icon="pi pi-times" 
                            label="Delete hall"
                            className="p-button-secondary ml-2"
                            onClick={() => {
                                handleCinemaHallDelete(cinemaHall._id)
                                handleCinemaHallsFetch()
                            }}
                        />
                    </AccordionTab>
                )
            })}
            </Accordion>
            <div className="m-2">
                <Button 
                    icon="pi pi-plus" 
                    label="New hall"
                    onClick={() => {
                        setDisplayCinemaHallModal(true)
                        setHallData(hallTemplate)
                        setCinemaHallDialogMode("ADD")
                    }}
                />
            </div>
        </div>
    )
}

export default CinemaHalls