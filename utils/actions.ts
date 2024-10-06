'use server'
import { BASE_URL } from '@/app/constants'
import { stateType } from '@/app/new/page'

const FS_END_POINT = `${BASE_URL}/fs.json`

export const fetchData = async () => {
    const response = await fetch(FS_END_POINT)
    return response.json()
}

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

        return { data: { name: '', type: '', parent: '' }, message: 'success' }
    } catch (error: unknown) {
        console.error((error as Error).message)
        return { data: { name, type, parent }, message: 'failed' }
    }
}
