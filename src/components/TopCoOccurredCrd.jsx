import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

function TopCoOccurredCrd({topCoOccurrences}) {
    return (
          <Grid container spacing={4}>
            {topCoOccurrences &&
              topCoOccurrences.map((word, i) => (
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
                        Pair:- {word.pair}
                      </Typography>
                      <Typography>Frequency:- {word.frequency}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
    );
}

export default TopCoOccurredCrd;