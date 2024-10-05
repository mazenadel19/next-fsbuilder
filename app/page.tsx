'use client'
import { Button } from '@mui/material'
import { fetchData, writeData } from './utils/actions'

export default function Home() {
    const handleClick = async () => {
        await writeData()
        const response = await fetchData()
        console.log(response)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Hello world
            </Button>
        </div>
    )
}
