"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

declare global {
  interface Window {
    Calendly: any;
  }
}

export function CalendlyEmbed() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    // Add an event listener to initialize Calendly after the script loads
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/moses-proton?hide_landing_page_details=1&hide_gdpr_banner=1",
          parentElement: document.getElementById("calendly-embed"),
          prefill: {},
          utm: {},
        });
        setLoading(false); // Hide the loader after the widget is initialized
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule a Meeting</CardTitle>
        <CardDescription>Choose a time that works best for you</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Show loader while the Calendly widget is loading */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "630px" }}>
            <div className="loader" />
          </div>
        )}
        <div
          id="calendly-embed"
          style={{ height: "630px", display: loading ? "none" : "block" }} // Hide Calendly until it's loaded
        />
      </CardContent>
    </Card>
  );
}
