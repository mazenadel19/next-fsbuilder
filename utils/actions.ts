/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { BASE_URL } from '@/app/constants'
import { Data, StateType } from '@/app/new/page'

const FS_END_POINT = (id?: string) => `${BASE_URL}/fs${id ? `/${id}` : ''}.json`

export type FSDataType = Record<string, Data<'file' | 'folder'>>
export const fetchData = async () => {
    try {
        const response = await fetch(FS_END_POINT())
        return response.json() as Promise<FSDataType>
    } catch (error: unknown) {
        throw new Error((error as Error).message)
    }
}
let bang = ''
export const writeData: any = async (prevState: StateType, formData: FormData) => {
    const name = formData.get('name')
    const type = formData.get('type')
    const parent = formData.get('parent')

    try {
        if (!name) {
            bang += '!'
            throw new Error(`Please Add Name${bang}`)
        }
        if (!type) {
            bang += '!'
            throw new Error(`Please Add Type${bang}`)
        }
        if (!parent) {
            bang += '!'
            throw new Error(`Please Add Parent${bang}`)
        }

        const data = { name, type, parent }
        const response = await fetch(FS_END_POINT(), {
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
        return { data: { name, type, parent }, message: (error as Error).message }
    }
}

export const editData: any = async (prevState: StateType, formData: FormData) => {
    const id = formData.get('id') as string
    const name = formData.get('name')
    const type = formData.get('type')
    const parent = formData.get('parent')

    try {
        if (!id || !name || !type || !parent) {
            throw new Error('Please Add All Fields')
        }

        const data = { name, type, parent }
        const response = await fetch(FS_END_POINT(id), {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed To Send Data')
        }

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

export const deleteData: any = async (prevState: StateType, formData: FormData) => {
    const id = formData.get('id') as string

    try {
        if (!id) {
            throw new Error('Id Is Missing')
        }

        const response = await fetch(FS_END_POINT(id), {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed To Delete Data')
        }

        return { message: 'success' }
    } catch (error: unknown) {
        console.error((error as Error).message)
        return { message: 'failed' }
    }
}
