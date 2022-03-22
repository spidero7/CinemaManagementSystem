import { useEffect, useState, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from "primereact/calendar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

const Screening = () => {
    const axiosPrivate = useAxiosPrivate()
    const toast = useRef(null)

    const [cinemas, setCinemas] = useState([])
    const [cinemasList, setCinemasList] = useState([])
    const [selectedCinema, setSelectedCinema] = useState("")

    const [cinemaHalls, setCinemaHalls] = useState([])
    const [cinemaHallsList, setCinemaHallsList] = useState([])
    const [selectedCinemaHall, setSelectedCinemaHall] = useState("")

    const [movies, setMovies] = useState([])

    const [screeningDate, setScreeningDate] = useState(new Date()) 
    const [screeningMovie, setScreeningMovie] = useState("") 

    const [screenings, setScreenings] = useState([])

    const handleCinemaChange = (e) => {
        setSelectedCinemaHall("")
        setScreenings([])
        setSelectedCinema(e.value)
    }

    const handleScreeningMovieChange = (e) => {
        setScreeningMovie(e.value)
    }

    const handleCinemaHallChange = (e) => {
        setSelectedCinemaHall(e.value)
    }

    const handleScreeningDelete = (e) => {
        axiosPrivate.delete(`http://localhost:3000/screening/${e}`)
        .then(response => {
            if(response.status == 200) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Screening succesfully deleted', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while deleting screening', life: 3000});
            }
            handleScreeningFetch()
        })
    }

    const handleScreeningFetch = () => {
        axiosPrivate.get(`http://localhost:3000/screenings/hall/${selectedCinemaHall}`)
        .then(response => setScreenings(response.data))
    }

    const handleScreeningAdd = async () => {
        axiosPrivate.post(`http://localhost:3000/screening`, {
            cinemaId: selectedCinema,
            cinemaHallId: selectedCinemaHall,
            movieId: screeningMovie,
            screeningDate: screeningDate
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async response => {
            if(response.status == 201) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Screening added succesfully', life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error while creating screening', life: 3000});
            }
            handleScreeningFetch()
        })
        .catch(async response => {
            await toast.current.show({severity:'error', summary: 'Error', detail:'Error while updating cinema. ' + response.response.data, life: 3000});
        })

    }
    useEffect(() => {
        axiosPrivate.get('http://localhost:3000/cinemas')
        .then(response => setCinemas(response.data))
        axiosPrivate.get(`http://localhost:3000/movies`)
        .then(result => setMovies(result.data))
    },[])

    useEffect(() => {
        setCinemasList(cinemas.map(e => {
            return {
                label: `${e.country}, ${e.city}, ${e.adress}`,
                value: e._id
            }
        }))
    },[cinemas])

    useEffect(() => {
        if(selectedCinema!="") {
            axiosPrivate.get(`http://localhost:3000/cinema-halls/${selectedCinema}`)
            .then(response => setCinemaHalls(response.data))
        }
    }, [selectedCinema])

    useEffect(() => {
        setCinemaHallsList(cinemaHalls.map(e => {
            return {
                label: `${e.name}`,
                value: e._id
            }
        }))
    },[cinemaHalls])

    useEffect(() => {
        axiosPrivate.get(`http://localhost:3000/screenings/hall/${selectedCinemaHall}`)
        .then(response => setScreenings(response.data))

    }, [selectedCinemaHall])
    
    return (
        <div>
            <Toast ref={toast} />
            <div>
                <Toolbar left={<>
                    <Dropdown 
                        value={selectedCinema} 
                        options={cinemasList} 
                        onChange={handleCinemaChange} 
                        optionValue="value"
                        optionLabel="label" 
                        placeholder="Select cinema" 
                    />
                </>} right={<span className="text-white">Screenings management</span>} />
            </div>
            <div className="m-3">
                <div>
                    <Dropdown 
                        value={selectedCinemaHall} 
                        options={cinemaHallsList} 
                        onChange={handleCinemaHallChange} 
                        optionValue="value"
                        optionLabel="label" 
                        placeholder="Select cinema hall" 
                    />
                </div>
                {
                    selectedCinemaHall != "" ?
                        <div className="text-white m-3">
                            <div>Create screening:</div>
                            <div className="field">
                                <label htmlFor="time24">Date/time:</label><br></br>
                                <Calendar id="time24" value={screeningDate} onChange={(e) => setScreeningDate(e.value)} showTime />
                            </div>
                            <div className="field">
                                <label htmlFor="movie">Movie:</label><br></br>
                                <Dropdown
                                    id="movie" 
                                    value={screeningMovie} 
                                    options={movies} 
                                    onChange={handleScreeningMovieChange} 
                                    optionValue="_id"
                                    optionLabel="title" 
                                    placeholder="Select movie"
                                />
                            </div>
                            <div>
                                <Button
                                    icon="pi pi-plus"
                                    label="Add screening"
                                    onClick={handleScreeningAdd}
                                />
                            </div>
                        </div>
                    :
                    <></>
                }

                <div className="text-white m-3">Screenings:</div>
                <div>
                    <DataTable
                        value={screenings}
                        responsiveLayout="scroll"
                        className="m-2"
                    >
                        <Column 
                            field="screeningDate" 
                            header="Date"
                            body={e => (new Date(e.screeningDate).toLocaleString())}
                        >
                        </Column>
                        <Column field="movieId" header="Movie Id"></Column>
                        <Column 
                            header="Title"
                            body={e => {
                                for(const movie of movies) {
                                    if(movie._id == e.movieId) {
                                        return movie.title
                                    }
                                }
                            }}
                        ></Column>
                        <Column
                            header="Delete"
                            body={e => 
                                (<Button
                                    icon="pi pi-times p-button-secondary"
                                    onClick={() => {handleScreeningDelete(e._id)}}
                                ></Button>)
                            }
                        ></Column>
                    </DataTable>
                </div>

            </div>
        </div>
    )
}

export default Screening