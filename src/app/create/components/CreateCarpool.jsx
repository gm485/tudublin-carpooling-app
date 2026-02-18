"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../create-pool.module.css";

// MUI
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

// Google Maps
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMaps } from "@/components/GoogleMapsProvider"; 

export default function CreateCarpool({ onNewCarpool }) {
  const router = useRouter();
  const { isLoaded } = useGoogleMaps();       

  // states
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [status, setStatus] = useState("");

  // refs
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const originPlace = originRef.current?.getPlace();
      const destinationPlace = destinationRef.current?.getPlace();

      const payload = {
        origin: originPlace?.formatted_address || origin,
        originLat: originPlace?.geometry?.location?.lat(),
        originLng: originPlace?.geometry?.location?.lng(),
        destination:
          destinationPlace?.formatted_address || destination,
        destinationLat:
          destinationPlace?.geometry?.location?.lat(),
        destinationLng:
          destinationPlace?.geometry?.location?.lng(),
        date,
        seatsAvailable: Number(seatsAvailable),
      };

      const res = await fetch("/api/carpool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("Carpool Created");

      setOrigin("");
      setDestination("");
      setDate("");
      setSeatsAvailable(1);

      onNewCarpool?.(data.carpool);

      router.push("/dashboard");
    } catch (error) {
      setStatus(error.message);
    }
  }

  // ⛔ IMPORTANT: Don't render until maps is ready
  if (!isLoaded) {
    return <Typography>Loading Maps...</Typography>;
  }

  return (
    <div className={styles.formHolder}>
      <Paper elevation={24} variant="outlined">
        <Typography
          variant="h6"
          sx={{ textAlign: "center" }}
          gutterBottom
        >
          Create a new Carpool
        </Typography>

        <Box
          component="form"
          className={styles.createPoolForm}
          onSubmit={handleSubmit}
        >
          <Autocomplete
            onLoad={(ref) => (originRef.current = ref)}
          >
            <TextField
              label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              fullWidth
            />
          </Autocomplete>

          <Autocomplete
            onLoad={(ref) => (destinationRef.current = ref)}
          >
            <TextField
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              fullWidth
            />
          </Autocomplete>

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Seats Available"
            type="number"
            value={seatsAvailable}
            onChange={(e) =>
              setSeatsAvailable(Math.max(1, Number(e.target.value)))
            }
            required
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Create Carpool
          </Button>

          {status && (
            <Typography
              variant="body2"
              color={
                status.includes("Error") ? "error" : "success.main"
              }
            >
              {status}
            </Typography>
          )}
        </Box>
      </Paper>
    </div>
  );
}
