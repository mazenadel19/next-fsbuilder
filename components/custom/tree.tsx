import { Node } from '@/utils/helper'
import Folder from './folder'
import File from './file'
import { Box } from '@mui/material'

const Tree = ({ tree }: { tree: Node[] }) => {
    return (
        <>
            {tree.map((node) => (
                <Box sx={{ my: 2 }} key={node.id}>
                    {node.type === 'folder' ? <Folder node={node} /> : <File node={node} />}
                </Box>
            ))}
        </>
    )
}

export default Tree
