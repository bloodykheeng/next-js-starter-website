'use client'

import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import AboutUsPage from './AboutUsPage'

const AboutTabs: React.FC = () => {
    return (
        <div className="md:p-1">
            <TabView>
                {/* About Us Tab */}
                <TabPanel header="About Us">
                    <AboutUsPage />
                </TabPanel>


            </TabView>
        </div>
    );
};

export default AboutTabs;
