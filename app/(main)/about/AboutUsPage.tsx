import React from 'react';
import { Card } from 'primereact/card';

// import { Button } from 'primereact/button';

// import Dropdown from "./dropdown"

const AboutUsPage = () => {
    return (
        <>
            <div className="container p-1 mx-auto">
                <Card className="shadow-2 p-1">
                    <h1 className="text-3xl font-bold mb-4">About the Contract Monitoring System (CMS)</h1>
                    <p className="mb-6">
                        The Contract Monitoring System (CMS) is an online platform that enables Civil Society Organizations (CSOs) to monitor ongoing government projects and contracts.
                        It enhances transparency, accountability, and service delivery by providing real-time tracking of government projects.
                    </p>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Who Can Use CMS?</h2>
                        <ul className="list-disc ml-6">
                            <li>Civil Society Organizations (CSOs) with a Memorandum of Understanding with the PPDA Authority</li>
                            <li>The Public Procurement and Disposal of Public Assets Authority (PPDA)</li>
                            <li>Anti-Corruption Agencies</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">How CMS Works</h2>
                        <p>
                            CMS provides a structured way to monitor government contracts, report findings, and take appropriate action. CSOs play a crucial role in gathering evidence, reporting issues, and ensuring accountability in project execution.
                        </p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>Monitors:</strong> Community focal persons who upload reports on ongoing projects.</li>
                            <li><strong>Verifiers:</strong> Supervisors who conduct quality assurance of the reports.</li>
                            <li><strong>Approvers:</strong> Senior CSO officials who determine the appropriate action to be taken.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Key Benefits of CMS</h2>
                        <ul className="list-disc ml-6">
                            <li>Real-time monitoring of government projects to ensure value for money.</li>
                            <li>Enhanced accountability in the contract management process.</li>
                            <li>Citizen involvement in monitoring projects and services.</li>
                            <li>Leveraging technology for efficient contract tracking and reporting.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">CMS Features</h2>
                        <ul className="list-disc ml-6">
                            <li>Mobile application for evidence-based reporting.</li>
                            <li>Photo and video capture for documentation.</li>
                            <li>Dashboard with detailed reports and analytics.</li>
                            <li>High-security access with verification processes.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Accessing CMS</h2>
                        <p className="mb-2">
                            The CMS is accessible via:
                        </p>
                        <ul className="list-disc ml-6">
                            <li>The <strong>CMS Mobile App</strong> available on the Google Play Store.</li>
                            <li><strong>Web-based platform</strong> for easy access to reports and monitoring tools.</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Support & Contact</h2>
                        <p>
                            For inquiries or assistance, contact the CMS Support Team:
                        </p>
                        <ul className="list-disc ml-6 mt-2">
                            <li>Email: <a href="mailto:compliance@ppda.go.ug" className="text-blue-500">compliance@ppda.go.ug</a></li>
                            <li>Helpline: <strong>0414311163</strong></li>
                        </ul>
                    </section>

                </Card>
            </div>
        </>
    );
};

export default AboutUsPage;
