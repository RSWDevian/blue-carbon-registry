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
  Alert,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Login successful!");
        if (data.token) localStorage.setItem("token", data.token);
        // Optionally cache user info
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => router.push("/"), 1000); // Redirect to home or dashboard
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              py: 1.2,
            }}
            fullWidth
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            onClick={handleSubmit}
          >
            {loading ? "Logging in..." : "Log In"}
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
