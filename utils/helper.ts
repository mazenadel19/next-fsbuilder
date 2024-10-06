import { DataWithId } from '@/app/new/page'
import { FSDataType } from './actions'

export interface Node extends DataWithId {
    children?: Node[]
}

export function convertToTree(data: FSDataType): Node[] {
    const tree: Node[] = []
    const map: Record<string, Node> = {}

    // Convert data to map for easier lookup
    for (const id in data) {
        const node = {
            ...data[id],
            id,
        }

        if (node.type === 'folder') {
            (node as Node).children = []
        }

        map[id] = node
    }

    // Build the tree structure
    for (const id in map) {
        const node = map[id]
        if (node.parent === 'root') {
            tree.push(node)
        } else {
            map[node.parent]?.children?.push(node)
        }
    }
    return tree
}
