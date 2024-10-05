import { Button } from '@mui/material'
import { fetchData, writeData } from './utils/actions'

export default async function Home() {
    writeData()
    const response = await fetchData()
    console.log(response)
    return (
        <div>
            <Button variant="contained">Hello world</Button>
        </div>
    )
}
