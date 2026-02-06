import { useState } from "react";
import "../create-post/create.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export default function Create() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="postForm">
      <Box
        sx={{
          minWidth: 400,
          maxWidth: 600,
          mx: "auto",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography color="black" variant="h5">
            Create a Post
          </Typography>
          <Box
            fullWidth
            sx={{
              mx: "auto",
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "white",
              mt: 3,
            }}
          >
            <input
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Box>

          <Grid>
            <TextField
              id="outlined-error"
              fullWidth
              label="Description"
              name="Description"
              margin="normal"
              borderRadius={2}
              boxShadow={3}
              sx={{ mt: 3 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Button sx={{ mt: 6 }} type="submit" fullWidth variant="contained">
            Post
          </Button>
        </form>
      </Box>
    </div>
  );
}
