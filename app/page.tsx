'use client'
import { useContext } from 'react'
import { FirebaseContext } from '@/providers/context/firebase-context'
import { Button, Box, Typography } from '@mui/material'

export default function Home() {
    const { tree } = useContext(FirebaseContext)
    if (!tree.length) {
        return (
            <Box textAlign="center" sx={{ textJustify: 'inter-word' }}>
                <Typography variant="h6">No items found.</Typography>
            </Box>
        )
    }

    return (
        <div>
            <Button variant="contained">Hello world</Button>
        </div>
    )
}
