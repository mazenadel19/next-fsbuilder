'use client'
import { createContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchData, FSDataType } from '../../utils/actions'
import { DataWithId } from '@/app/new/page'

interface FirebaseContextData {
    folders: {
        id: string
        name: string
        parent: string
        type: string
    }[]
    setFirebaseData: (node: DataWithId) => void
}
export const FirebaseContext = createContext<FirebaseContextData>({
    folders: [],
    setFirebaseData: () => {},
})

function FirebaseProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [tree, setTree] = useState<FSDataType>({})

    const folders = useMemo(
        () =>
            Object.entries(tree)
                .filter(([, value]) => value.type === 'folder')
                .map(([key, value]) => ({ ...value, id: key })),
        [tree]
    )

    const setFirebaseData = (node: DataWithId) => {
        const { id, name, parent, type } = node
        setTree((prev) => ({ ...prev, [id]: { name, parent, type } }))
    }

    const memoizedContextValue = useMemo(() => ({ folders, setFirebaseData }), [folders])

    useEffect(() => {
        fetchData()
            .then((data) => {
                if (data) {
                    setTree(data)
                }
            })
            .catch((error) => {
                toast.error(error.message, {
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                })
            })
    }, [])

    return <FirebaseContext.Provider value={memoizedContextValue}>{children}</FirebaseContext.Provider>
}
export default FirebaseProvider
