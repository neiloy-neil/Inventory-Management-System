# Fix for Recharts Import Error

## Issue
The application was throwing an error: "Failed to resolve import "recharts" from "src\components\sections\Reports\ComparativeAnalysis\index.tsx". Does the file exist?"

## Root Cause
The project didn't have the `recharts` library installed, but several components were trying to import from it.

## Solution
Instead of installing the `recharts` library, we modified the reporting components to use the existing charting library already installed in the project (`chart.js` and `react-chartjs-2`).

## Changes Made

1. **VisualizationDashboard Component** (`src/components/sections/Reports/VisualizationDashboard/index.tsx`):
   - Replaced recharts imports with chart.js imports
   - Updated all chart components to use Chart.js syntax
   - Maintained the same functionality with bar, line, and pie charts

2. **ComparativeAnalysis Component** (`src/components/sections/Reports/ComparativeAnalysis/index.tsx`):
   - Replaced recharts imports with chart.js imports
   - Updated the bar chart component to use Chart.js syntax
   - Maintained the same comparative analysis functionality

## Verification
- All recharts imports have been removed
- No more "Failed to resolve import" errors
- Components are now using the existing charting library
- Application should build and run without charting-related errors

## Benefits
- No additional dependencies needed
- Leveraged existing charting library already in use in the project
- Maintained consistent styling and functionality
- Reduced bundle size by not adding another charting library