import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Skeleton,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import {
    useLoginDispatch,
    useLoginState,
} from '../../context/global/LoginContext';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from '../../utils/CustomAxios';
import { useToastDispatch } from '../../context/global/ToastContext';
import useGetUserQuery from '../../hooks/queries/UseGetUserQuery';
import LogoutButton from '../../components/buttons/LogoutButton';

function UserInformationCard() {
    const accessToken = useLoginState();
    const loginDispatch = useLoginDispatch();
    const toastDispatch = useToastDispatch();
    const { isLoading, data } = useGetUserQuery(accessToken, {
        onError,
    });

    function onError(error: AxiosError<AxiosErrorResponseData>) {
        if (error.response) {
            toastDispatch({
                type: 'OPEN',
                severity: 'error',
                message: error.response.data.error.message,
            });
            loginDispatch(null);
        }
    }

    return (
        <Card
            raised
            sx={{
                backgroundColor: grey[50],
                padding: 2,
            }}
        >
            {isLoading || !data ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 1,
                    }}
                >
                    <Skeleton
                        variant="circular"
                        sx={{
                            width: 80,
                            height: 80,
                            mr: 4,
                        }}
                    />
                    <CardContent
                        sx={{
                            flexGrow: '1',
                        }}
                    >
                        <Skeleton variant="text" width={'50%'} />
                        <Skeleton variant="text" width={'80%'} />
                    </CardContent>
                </Box>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 1,
                        }}
                    >
                        <Avatar
                            src={data.profileImage}
                            alt="profile avatar image"
                            sx={{
                                width: 80,
                                height: 80,
                                mr: 4,
                            }}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ color: grey[800] }}>
                                {data.name}
                            </Typography>
                            <Typography sx={{ color: grey[500] }}>
                                {data.email}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <LogoutButton />
                    </Box>
                </>
            )}
        </Card>
    );
}

export default UserInformationCard;
