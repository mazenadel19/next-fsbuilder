import { onValue, push, ref, set } from 'firebase/database'
import { db } from '@/lib/firebase'

export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, '/posts')
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

export const writeData = async () => {
    const dbRef = ref(db, 'posts')
    const newDbRef = push(dbRef)
    await set(newDbRef, {
        title: 'My First Blog Post',
        content: 'This is the content of my blog post ',
        author: 'John Doe',
    })
    console.log('Data written successfully!')
}
