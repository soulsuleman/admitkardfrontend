import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

function TopWordCard({topWords}){
    return (
        <Grid container spacing={4}>
            {topWords &&
              topWords.map((word, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Word:- {word.word}
                      </Typography>
                      <Typography>Frequency:- {word.frequency}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
    );
}

export default TopWordCard;