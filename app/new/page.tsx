'use client'
import { writeData } from '@/utils/actions'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useFormStatus, useFormState } from 'react-dom'

const initialState = {
    name: '',
    type: 'file',
    parent: 'root',
}

export type stateType = typeof initialState

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button variant="contained" type="submit" color="primary" disabled={pending}>
            {pending ? 'please wait... ' : 'Submit'}
        </Button>
    )
}

export default function NewPage() {
    const [state, formAction] = useFormState<stateType>(writeData, initialState)

    return (
        <Container
            maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Create A New File or Folder
            </Typography>

            <Box component="form" noValidate autoComplete="off" action={formAction} sx={{ width: '100%', mt: 2 }}>
                {/* Name Input */}
                <TextField
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    required
                    aria-label="Name of file or folder"
                    defaultValue={state.name}
                />

                {/* Type Select */}
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        name="type"
                        labelId="type-label"
                        id="type"
                        defaultValue={state.type}
                        label="Type"
                        aria-label="Pick the type"
                    >
                        <MenuItem value="file">File</MenuItem>
                        <MenuItem value="folder">Folder</MenuItem>
                    </Select>
                </FormControl>

                {/* Parent Select */}
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="parent-label">Parent</InputLabel>
                    <Select
                        name="parent"
                        labelId="parent-label"
                        id="parent"
                        defaultValue={state.parent}
                        label="Parent"
                        aria-label="Select parent folder"
                    >
                        <MenuItem value="root">Root</MenuItem>
                        <MenuItem value="folder1">Folder 1</MenuItem>
                        <MenuItem value="folder2">Folder 2</MenuItem>
                        <MenuItem value="folder3">Folder 3</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="outlined" component={Link} href="/">
                        Back
                    </Button>
                    <SubmitButton />
                </Box>
            </Box>
        </Container>
    )
}
