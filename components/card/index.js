import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActions} from "@mui/material";
import Link from "next/link";
import styles from "./Card.module.css"

export default function BasicCard({infoObject}) {
    const LinkButton = () => {
        if (infoObject?.externalUrl) {
            return (
                <a href={infoObject.Url || ''}
                   target={'_blank'}
                   rel="noopener noreferrer"
                   style={{display: "inline-flex", alignItems: 'center', justifyContent: 'center'}}
                >
                    <Button variant={'text'} className={styles.linkButton}>Github</Button>
                </a>
            )
        } else {
            return (
                <Link href={`/posts/${infoObject?.Url}`}>
                    <Button variant={'text'} className={styles.linkButton}>View Post</Button>
                </Link>
            )
        }
    }

    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography variant={'h5'} gutterBottom>
                    {infoObject?.Title}
                </Typography>
                <Typography variant="body1">
                    {infoObject?.Description}
                </Typography>
            </CardContent>
            <CardActions>
                <LinkButton />
            </CardActions>
        </Card>
    );
}
