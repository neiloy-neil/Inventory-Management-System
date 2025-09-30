import { Box, CardContent, Typography } from "@mui/material";
import React from "react";
import "./stats-card.scss";

interface StatsCardProps {
  title: string;
  icon: React.ElementType;
  number: number;
}

const StatsCard = ({ title, icon: IconComponent, number }: StatsCardProps) => {
  return (
    <React.Fragment>
      <CardContent
        className="modern-stat-card-content"
        sx={{
          border: "none",
          borderRadius: 2,
          width: "100%",
          boxShadow: "var(--shadow-md)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "var(--shadow-lg)",
          }
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography className="modern-stat-title" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <IconComponent
            fontSize="large"
            sx={{ fontSize: 40, color: "var(--primary-color)" }}
          />
        </Box>
        <Typography variant="h5" className="modern-stat-value">
          {number?.toLocaleString('en-BD')} Taka
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

export default StatsCard;