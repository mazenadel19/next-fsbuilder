'use client'
import Tree from '@/components/custom/tree'
import Button from '@mui/material/Button'
import { Node } from '@/utils/helper'
import { ArrowBack } from '@mui/icons-material'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

interface IView {
    searchParams: { data: string }
}
const ViewPage = ({ searchParams }: IView) => {
    const node: Node = searchParams.data ? JSON.parse(searchParams.data) : {}

    return node?.children?.length ? (
        <Box>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }} align="center">
                {node.name.toUpperCase()}
            </Typography>
            <Tree tree={node.children} />
            <Button
                aria-label="Go Home"
                startIcon={<ArrowBack />}
                component={Link}
                href="/"
                sx={{
                    marginBottom: '1rem',
                    padding: '0.5rem 2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                }}
            >
                Go Home
            </Button>
        </Box>
    ) : null
}
export default ViewPage
