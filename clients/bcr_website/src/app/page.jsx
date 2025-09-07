"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GridOnIcon from "@mui/icons-material/GridOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/navigation";

//* Steos for a blue carbon project lifecycle
const steps = [
  {
    label: "Project Registration",
    icon: <PersonIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    label: "Data Upload",
    icon: <CloudUploadIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    label: "Data Processing",
    icon: <SettingsIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    label: "Verification",
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
  {
    label: "Registry",
    icon: <GridOnIcon sx={{ fontSize: 40, color: "#2563eb" }} />,
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "transparent", boxShadow: "none", pt: 2 }}
      >
        <IconButton
          onClick={() => router.push("/")}
          sx={{
            position: "fixed",
            top: 32,
            right: 32,
            bgcolor: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: 1,
            "&:hover": { bgcolor: "#f1f5f9" },
          }}
          aria-label="Go to Home"
        >
          <HomeIcon sx={{ color: "#2563eb" }} />
        </IconButton>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, md: 6 } }}>
          <Typography
            variant="h6"
            sx={{ color: "#111", fontWeight: 700, letterSpacing: 0.5 }}
          >
            Blue Carbon
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              router.push("/sign/signin");
            }}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              px: 3,
              borderColor: "#222",
              color: "#222",
              "&:hover": { borderColor: "#2563eb", color: "#2563eb" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Introduction */}
      <Container maxWidth="md" sx={{ mt: 8, mb: 6 }}>
        <Typography
          variant="h2"
          align="center"
          fontWeight={700}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2 }}
        >
          Blockchain-based <br />
          blue carbon registry
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 4, fontWeight: 400, maxWidth: 700, mx: "auto" }}
        >
          A transparent, immutable, and decentralized platform for registering
          and tracking blue carbon projects.
        </Typography>
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            onClick={() => {
              router.push("/sign/signin");
            }}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              px: 5,
              py: 1.2,
              boxShadow: "none",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>
      </Container>

      {/* Steps */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
                <Paper
                  elevation={0}
                  sx={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "transparent",
                    boxShadow: "none",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#2563eb",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    {React.cloneElement(step.icon, {
                      sx: { color: "#fff", fontSize: 36 },
                    })}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mt: 1, fontSize: "1.05rem" }}
                  >
                    {step.label}
                  </Typography>
                </Paper>
              </Grid>
              {idx < steps.length - 1 && (
                <Grid
                  item
                  xs={12}
                  sm={1}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArrowForwardIosIcon
                    sx={{ color: "#2563eb", fontSize: 28 }}
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
