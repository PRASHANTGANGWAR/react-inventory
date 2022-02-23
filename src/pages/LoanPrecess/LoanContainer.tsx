
import React from 'react';
import { Button, Grid } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import { deepOrange } from '@mui/material/colors';


interface propsCreateAsset {
    openDialouge : () => void
  }
export default function LoanContainer({openDialouge} : propsCreateAsset) {
    return (
        <Grid container>         
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size='large'
              className="avatarStyle"
              onClick={openDialouge}
              sx={{backgroundColor: deepOrange}}>
              TAKE LOAN
            </Button>
          </Grid>                
        </Grid>
    )
}
