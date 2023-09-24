import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BsFileEarmarkWord } from "react-icons/bs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Input,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopWordCard from "../components/TopWordCard";
import TopCoOccurredCrd from "../components/TopCoOccurredCrd";
import WordCountCard from "../components/WordCountCard";
import axios from "axios";

const defaultTheme = createTheme();

function Homepage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [topCoOccurrences, setTopCoOccurrences] = useState([]);
  const [topWords, setTopWords] = useState([]);
  const [wordCount, setWordCount] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [uploadingFile, setUploadingFile] = useState(false);
  const [searching, setSearching] = useState(false)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
  if (!selectedFile) {
    setErrorMessage("Please select a file.");
    return;
  }

  // Check file type
  if (selectedFile.type !== "text/plain") {
    setErrorMessage("File type should be .txt");
    return;
  }

  // Check file size (5MB limit)
  if (selectedFile.size > 5 * 1024 * 1024) {
    setErrorMessage("File size should be less than 5MB.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
setUploadingFile(true)
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/api/upload`, formData)
    .then((response) => {
      const data = response.data;
      setTopCoOccurrences(data.topCoOccurrences);
      setTopWords(data.topWords);
      setWordCount(data.wordCount);
      setErrorMessage("")
      setUploadingFile(false)
    })
    .catch((error) => {
      // console.error("Error:", error); 
      setUploadingFile(false)
    });
};


  const handleSearch = async () => {
    try {
      setSearching(true);
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/search/${searchWord}`)
        .then((response) => response.json())
        .then((data) => setSearchResult(data));
        setSearching(false);
    } catch (error) {
        // console.error("Error:", error);
        setSearching(false);
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BsFileEarmarkWord sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Text Analyzer
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Text Analyzer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              The Text Analyzer Tool provides top 5 frequently used words,
              co-occurring word pairs, and word frequency analysis for
              comprehensive text insights.
            </Typography>
          </Container>
        </Box>
        <Box>
          <Input
            accept=".txt"
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />&nbsp; &nbsp; &nbsp;
          <Button
            onClick={handleSubmission}
            variant="contained"
            component="span"
          >
            {uploadingFile ? "Upload..." : "Upload File"}
          </Button>
          <Typography color={"red"}>
            {errorMessage && errorMessage ? errorMessage :""}
          </Typography>
        </Box>
        <Box mt="30px">
          <Input
            id="word-input"
            type="text"
            placeholder="search word.."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />&nbsp; &nbsp; &nbsp;
          <Button onClick={handleSearch} variant="contained" component="span" >
            {searching ? "Finding..." : "Find Word"}
          </Button>
        </Box>

        <Container>
           {
            searchResult !== null ? <>
             <Typography variant="h4" gutterBottom>Searched Result</Typography>
            {
               searchResult && searchResult.word ? <>
                <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Word:- {searchResult.word}
                      </Typography>
                      <Typography>Frequency:- {searchResult.frequency}</Typography>
                    </CardContent>
                  </Card>
                </> : "Word not found"
            }
            </>:""
           }
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h4" gutterBottom>Top 5 mostly occurred words</Typography>
          <TopWordCard topWords={topWords} />
        </Container>
        <Container sx={{ pb: 8 }} maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Top 5 mostly co-occurred words ( adjacent words in pairs )
          </Typography>
          <TopCoOccurredCrd topCoOccurrences={topCoOccurrences} />
        </Container>
        <Container>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h4" gutterBottom>Frequency of each word</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <WordCountCard wordCount={wordCount} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          @copyright sumitsaurabh
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Homepage;
