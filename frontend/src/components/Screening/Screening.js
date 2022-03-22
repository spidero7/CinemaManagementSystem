import { useEffect, useState } from "react"
// import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Screening = () => {
    const axiosPrivate = useAxiosPrivate()

    const [cinemas, setCinemas] = useState([])
    const [selectedCinema, setSelectedCinema] = useState("")
    const cities = [
        { name: 'New York', code: 'NY' },
    ];

    const handleCinemaChange = () => {

    }

    useEffect(() => {
        axiosPrivate.get('http://localhost:3000/cinemas')
        .then(response => setCinemas(response.data))
    },[])
    
    return (
        <div>
            <div>
                <Toolbar left={<>
                    <Dropdown 
                        value={selectedCity1} 
                        options={cinemas} 
                        onChange={onCityChange} 
                        optionLabel="cinema" 
                        placeholder="Select cinema" 
                    />
                </>} right={<></>} />
            </div>
        </div>
    )
}

export default Screening