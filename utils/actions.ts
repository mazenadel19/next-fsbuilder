import { onValue, push, ref, set } from 'firebase/database'
import { db } from '@/lib/firebase'
import { stateType } from '@/app/new/page'
import { redirect } from 'next/navigation'

export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, 'fs')
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                resolve(data)
            } else {
                reject(new Error('No data found'))
            }
        })
    })
}

export const writeData: any = async (prevState: stateType, formData: FormData) => {
    const name = formData.get('name')
    const type = formData.get('type')
    const parent = formData.get('parent')

    const dbRef = ref(db, 'fs')
    const newDbRef = push(dbRef)
    await set(newDbRef, {
        name,
        type,
        parent,
    })

    redirect('/')
}
