"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f7f9fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
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

      
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 350,
          maxWidth: 380,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          align="center"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Login
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: "1rem", py: 1.2 }}
            fullWidth
          >
            Log In
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 3, fontSize: 16 }}>
          Don't have an account?{" "}
          <Link
            href="/sign/signup"
            underline="hover"
            sx={{ color: "#2563eb", fontWeight: 500, cursor: "pointer" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}