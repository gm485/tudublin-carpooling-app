'use client'

import React from 'react'
import SignInButton from '../auth/SignIn'
import CustomSignUpButton from '../auth/CustomSignUp'
import {Button, Typography} from '@mui/material'

export function navBarActions(user, handleLogout, onLogin) {
    if (user) {
        return (
            <>
                <Typography sx={{ml: 5}}>
                    Welcome {user.name}
                </Typography>
                <Button key="logout" color="secondary" variant="contained" size='small'  sx={{ml: 2}}onClick={handleLogout}>
                    Logout
                </Button>
            </>
        )
    } else {
        return  (
            <>
            <SignInButton onLogin={onLogin}/>
            <CustomSignUpButton onLogin={onLogin}/>
            </>
        )
    }

}