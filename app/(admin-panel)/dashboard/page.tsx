import type { Metadata } from "next";

import React from "react";


export const metadata: Metadata = {
  title: "PPDA Contract Monitoring System",
  description:
    "The PPDA Contract Monitoring System (CMS) is a digital platform that enables Civil Society Organizations (CSOs) to track and report on government projects in real-time, ensuring transparency and accountability in public procurement.",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <h1>EcommerceMetrics</h1>
        <h1>MonthlySalesChart</h1>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <h1>MonthlyTarget </h1>
      </div>

      <div className="col-span-12">
        <h1>StatisticsChart</h1>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <h1>DemographicCard</h1>
      </div>

      <div className="col-span-12 xl:col-span-7">
        <h1>RecentOrders</h1>
      </div>
    </div>
  );
}
