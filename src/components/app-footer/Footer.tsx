import { Grid, Typography } from '@mui/material'
import React from 'react'

export default function AppicationFooter() {
    return (
        <Grid container sx={{mt: 4, mb: 4}}>
            <Grid item textAlign="center" xs={12}>
            <Typography variant='subtitle1'>© Reserved by 2022 Olegacy</Typography>
            </Grid>
        </Grid>
    )
}
