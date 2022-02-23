import React from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import { deepOrange } from '@mui/material/colors';

interface propsCoaApproval {
  openDialouge : () => void;
}
const CoaApproval = ({openDialouge} : propsCoaApproval) => {
    return (
        <Grid container>
         
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Button
             
              variant="contained"
              size='small'
              className="avatarStyle"
              onClick={openDialouge}
              sx={{backgroundColor: deepOrange}}>
               Approve COA
            </Button>
          </Grid>                
        </Grid>
    )
}
export default CoaApproval;