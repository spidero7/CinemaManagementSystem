import { useEffect, useState } from "react"
import { DataTable } from 'primereact/datatable';
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Screening = () => {
    const axiosPrivate = useAxiosPrivate()

    const [cinemas, setCinemas] = useState()

    useEffect(() => {
        axiosPrivate.get('http://localhost:3000/cinemas')
        .then(response => setCinemas(response.data))
    },[])
    return (
        <div>
            <DataTable value={cinemas} responsiveLayout="scroll">
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    )
}

export default Screening