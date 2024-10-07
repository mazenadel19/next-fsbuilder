import { Node } from '@/utils/helper'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'
const Folder = ({ node }: { node: Node }) => {
    const onClick = () => {
        localStorage.setItem('node', JSON.stringify(node))
    }

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
                border: '1px solid',
                borderColor: 'primary.main',
                boxShadow: 1,
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Typography variant="body1">{node.name}</Typography>
            <Box display="flex" gap={1}>
                {(node?.children?.length ?? 0) > 0 && (
                    <Button
                        aria-label="View"
                        variant="outlined"
                        onClick={onClick}
                        component={Link}
                        href={`/view/${node.id}`}
                    >
                        View
                    </Button>
                )}
                <Button aria-label="Edit" variant="outlined" component={Link} href={`/edit/${node.id}`}>
                    Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => console.log('Delete clicked')}>
                    Delete
                </Button>
            </Box>
        </Box>
    )
}
export default Folder
