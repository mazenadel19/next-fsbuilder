'use server'
import { BASE_URL } from '@/app/constants'
import { stateType } from '@/app/new/page'

const FS_END_POINT = `${BASE_URL}/fs.json`

interface Node {
    name: string
    parent: string
    type: string
}
export type FSDataType = Record<string, Node>
export const fetchData = async () => {
    try {
        const response = await fetch(FS_END_POINT)
        return response.json() as Promise<FSDataType>
    } catch (error: unknown) {
        throw new Error((error as Error).message)
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeData: any = async (prevState: stateType, formData: FormData) => {
    const name = formData.get('name')
    const type = formData.get('type')
    const parent = formData.get('parent')

    try {
        if (!name || !type || !parent) {
            throw new Error('Please Add All Fields')
        }

        const data = { name, type, parent }
        const response = await fetch(FS_END_POINT, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed To Send Data')
        }

        const postedItem = await response.json()
        const id = postedItem?.name

        return {
            data: { name: '', type: '', parent: '' },
            message: 'success',
            extra: {
                id,
                name,
                type,
                parent,
            },
        }
    } catch (error: unknown) {
        console.error((error as Error).message)
        return { data: { name, type, parent }, message: 'failed' }
    }
}
