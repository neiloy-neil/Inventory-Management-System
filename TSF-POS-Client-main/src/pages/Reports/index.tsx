import React, { useState } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import ReportBuilder from "../../components/sections/Reports/ReportBuilder";
import VisualizationDashboard from "../../components/sections/Reports/VisualizationDashboard";
import ScheduledReports from "../../components/sections/Reports/ScheduledReports";
import ComparativeAnalysis from "../../components/sections/Reports/ComparativeAnalysis";
import "./Reports.scss";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <Pagewrapper title="Reports">
      <div className="reports-page">
        <div className="reports-header modern-dashboard-header">
          <h1 className="reports-title modern-dashboard-title">Advanced Reporting</h1>
          <p className="reports-subtitle">Generate and analyze business insights</p>
        </div>

        <div className="reports-tabs modern-mb-lg">
          <button 
            className={`modern-btn ${activeTab === "builder" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("builder")}
          >
            Report Builder
          </button>
          <button 
            className={`modern-btn ${activeTab === "dashboard" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboards
          </button>
          <button 
            className={`modern-btn ${activeTab === "scheduled" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("scheduled")}
          >
            Scheduled Reports
          </button>
          <button 
            className={`modern-btn ${activeTab === "analysis" ? "modern-btn-primary" : "modern-btn-outline"}`}
            onClick={() => setActiveTab("analysis")}
          >
            Comparative Analysis
          </button>
        </div>

        <div className="reports-content">
          {activeTab === "builder" && (
            <div className="modern-card">
              <div className="modern-card-body">
                <ReportBuilder />
              </div>
            </div>
          )}
          
          {activeTab === "dashboard" && (
            <div className="modern-card">
              <div className="modern-card-body">
                <VisualizationDashboard />
              </div>
            </div>
          )}
          
          {activeTab === "scheduled" && (
            <div className="modern-card">
              <div className="modern-card-body">
                <ScheduledReports />
              </div>
            </div>
          )}
          
          {activeTab === "analysis" && (
            <div className="modern-card">
              <div className="modern-card-body">
                <ComparativeAnalysis />
              </div>
            </div>
          )}
        </div>
      </div>
    </Pagewrapper>
  );
};

export default Reports;