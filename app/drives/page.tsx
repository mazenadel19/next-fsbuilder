'use client'
import Tree from '@/components/custom/tree'
import { FirebaseContext } from '@/providers/context/firebase-context'
import { Box, Typography } from '@mui/material'
import { useContext } from 'react'

export default function Drives() {
    const { tree } = useContext(FirebaseContext)

    if (!tree.length) {
        return (
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">No items found.</Typography>
            </Box>
        )
    }

    return <Tree tree={tree} />
}
