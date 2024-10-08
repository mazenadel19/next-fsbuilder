import { Node } from '@/utils/helper'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
import DeleteForm from '../form/delete'

const File = ({ node }: { node: Node }) => {
    return (
        <Box
            p={2}
            borderRadius={2}
            bgcolor="background.paper"
            boxShadow={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                border: '1px dashed',
                borderColor: 'secondary.main',
                boxShadow: 1,
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Typography variant="body1">{node.name}</Typography>
            <Box display="flex" gap={1}>
                <Button aria-label="Edit" variant="outlined" component={Link} href={`/edit/${node.id}`}>
                    Edit
                </Button>
                <DeleteForm id={node.id} />
            </Box>
        </Box>
    )
}

export default File
