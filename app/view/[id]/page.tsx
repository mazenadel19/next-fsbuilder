'use client'
import Tree from '@/components/custom/tree'
import { Node } from '@/utils/helper'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const ViewPage = ({ params }: { params: { id: string } }) => {
    const node: Node = localStorage.getItem('node') ? JSON.parse(localStorage.getItem('node') as string) : {}

    return node?.children?.length ? <Tree tree={node.children} /> : null
}
export default ViewPage
