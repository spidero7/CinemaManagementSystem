import { useEffect, useState } from "react"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"



const CinemasManagement = () => {
    const axiosPrivate = useAxiosPrivate()
    const [cinemas, setCinemas] = useState([])

    const handleCinemasFetch = async () => {
        axiosPrivate.get('http://localhost:3000/cinemas')
        .then(response => setCinemas(response.data))
    } 

    useEffect(handleCinemasFetch, [])

    return (
        <div className="grid">
            {cinemas.map(cinema => {
                return(
                    <Card 
                        key={cinema._id}
                        title={`${cinema.adress}`}
                        subTitle={`${cinema.city}, ${cinema.country}`}
                        footer={
                            <span>
                                <Button label="Edit" icon="pi pi-pencil" />
                                <Button label="Delete" icon="pi pi-times" className="p-button-secondary ml-2"/>
                            </span>
                        }
                    >
                        
                    </Card>
                )
            })}
        </div>
    )
}

export default CinemasManagement