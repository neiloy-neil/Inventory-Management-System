import { Box, CardContent, Typography } from "@mui/material";
import React from "react";

const StatsCard = ({ title, icon: IconComponent, number }: StatsCardProps) => {
  return (
    <React.Fragment>
      <CardContent
        className="modern-stat-card modern-fade-in"
        sx={{
          border: "none",
          borderRadius: 2,
          width: "100%",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className="modern-stat-title" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <IconComponent
            fontSize="large"
            sx={{ fontSize: 40, color: "var(--primary-color)" }}
          />
        </Box>
        <Typography variant="h5" className="modern-stat-value">
          {number} Taka
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default StatsCard;