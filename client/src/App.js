import './App.css';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CSVLink } from "react-csv";
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const TAPS_CSV_FIELD = [{
    label: 'Started',
    key: 'started'
  }, {
    label: 'Finished',
    key: 'finished'
  }, {
    label: 'DurationSecs',
    key: 'durationSecs'
  }, {
    label: 'FromStopId',
    key: 'fromStopId'
  }, {
    label: 'ToStopId',
    key: 'toStopId'
  }, {
    label: 'ChargeAmount',
    key: 'chargeAmount'
  }, {
    label: 'CompanyId',
    key: 'companyId'
  }, {
    label: 'BusID',
    key: 'busId'
  }, {
    label: 'PAN',
    key: 'pan'
  }, {
    label: 'Status',
    key: 'status'
  }];

  const [tripsData, setTripsData] = useState([]);
  const [loader, setLoader] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "5rem",
    width: "40%"
  }));

  const Input = styled('input')({
    display: 'none',
  });

  const getTrips = (e) => {
    setLoader(true);
    var formdata = new FormData();
    formdata.append("file", e.target.files[0]);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    fetch("http://localhost:3001/api/tracker/generateTripsFromTaps", requestOptions)
      .then(response => response.json())
      .then(result => setTripsData(result))
      .catch(error => console.log('error', error));
    setLoader(false);
  }


  return (
    <div className="App">
      <Typography variant="h3" component="div">Simple Journey Tracker</Typography>


      <div className="Content">

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}>

          {/* Upload Button */}
          <Item>
            <Typography variant="h5" component="div">Upload Taps CSV</Typography>
            <label htmlFor="csvFile">
              <Input accept=".csv" id="csvFile" type="file" onChange={(e) => getTrips(e)} />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Item>

          {/* Download Button */}
          <Item>
            <Typography variant="h5" component="div">Download Trips CSV</Typography>
            {
              tripsData.length === 0
                ? (loader ? <CircularProgress /> : "")
                :
                <CSVLink data={tripsData} headers={TAPS_CSV_FIELD} filename={"trips.csv"}>
                  Download me
                </CSVLink>
            }
          </Item>
        </Stack>
      </div>

    </div>
  );
}

export default App;
