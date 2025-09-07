"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";

const accountTypes = [
  { value: "collector", label: "Collector" },
  { value: "verifier", label: "Verifier" },
  { value: "marketer", label: "Marketer" },
];

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    wallet: "",
    password: "",
    accountType: "",
  });

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
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 350,
          maxWidth: 400,
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
          Register
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Wallet Key"
            value={form.wallet}
            onChange={e => setForm({ ...form, wallet: e.target.value })}
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
          <TextField
            select
            label="Type of Account"
            value={form.accountType}
            onChange={e => setForm({ ...form, accountType: e.target.value })}
            fullWidth
            InputProps={{ sx: { borderRadius: 2 } }}
          >
            {accountTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: "1rem", py: 1.2 }}
            fullWidth
          >
            Register
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 3, fontSize: 16 }}>
          Already have an account?{" "}
          <Link
            href="/sign/signin"
            underline="hover"
            sx={{ color: "#2563eb", fontWeight: 500, cursor: "pointer" }}
          >
            Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}