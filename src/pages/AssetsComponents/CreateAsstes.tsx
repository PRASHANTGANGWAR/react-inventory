
import React from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import { deepOrange } from '@mui/material/colors';

interface propsCreateAsset {
  openDialouge : () => void;
  assetCount : number;
}
const CreateAsstes = ({openDialouge, assetCount} : propsCreateAsset) => {
    return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mb: 1 }}>Created Assets ({assetCount})</Typography>
            <Divider />
           </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size='large'
              className="avatarStyle"
              onClick={openDialouge}
              sx={{backgroundColor: deepOrange}}>
               Create Assets
            </Button>
          </Grid>                
        </Grid>
    )
}
export default CreateAsstes;