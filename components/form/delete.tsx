'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteData } from '@/utils/actions'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { FirebaseContext } from '@/providers/context/firebase-context'

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button variant="contained" type="submit" color="error" disabled={pending}>
            {pending ? 'please wait... ' : 'Delete'}
        </Button>
    )
}

const cantDelete = () => {
    toast.error('Cant Delete A Folder Before Deleting All Its Content', {
        ariaProps: {
            role: 'alert',
            'aria-live': 'assertive',
        },
    })
}

interface FormState {
    message: null | 'success' | 'failed'
}

const initialState = {
    message: null,
}
const DeleteForm = ({ id }: Readonly<{ id: string }>) => {
    const [state, formAction] = useFormState<FormState>(deleteData, initialState)
    const { deleteFirebaseData, data } = useContext(FirebaseContext)
    const flattenedData = useMemo(() => Object.entries(data).map(([key, value]) => ({ ...value, id: key })), [data])
    const children = flattenedData.filter((f) => f.parent === id)

    useEffect(() => {
        if (state.message === 'failed') {
            const errorMsg = 'Failed To Delete Data'
            toast.error(errorMsg, {
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            })
        }
        if (state.message === 'success') {
            toast.success(state.message, {
                ariaProps: {
                    role: 'status',
                    'aria-live': 'off',
                },
            })
            deleteFirebaseData(id)
            redirect('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.message])

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            action={children.length ? cantDelete : formAction}
            sx={{ width: '100%' }}
        >
            <input type="hidden" name="id" value={id} />
            <SubmitButton />
        </Box>
    )
}
export default DeleteForm
