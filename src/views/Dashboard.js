import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Container,
} from "reactstrap";
import axios from "axios";

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function Dashboard() {
  // State for all the counts
  const [counts, setCounts] = useState({
    trophyCount: 0,
    evenementCount: 0,
    equipeCount: 0,
    matchCount: 0,
    paysCount: 0,
    sportCount: 0,
    stadeCount: 0,
    villeCount: 0,
    entraineurCount: 0,
    arbitreCount: 0,
    joueurCount: 0,
    supporteurCount: 0,
  });

  useEffect(() => {
    // Define an array of endpoints to fetch data from
    const endpoints = [
      'trophee',
      'evenement',
      'equipe',
      'match',
      'pays',
      'sport',
      'stade',
      'ville',
      'entraineur',
      'arbitre',
      'joueur',
      'supporteur',
    ];

    // Create an array of promises to fetch data from each endpoint
    const promises = endpoints.map(endpoint =>
      axios.get(`http://localhost:8099/${endpoint}`)
        .then((response) => response.data.results.bindings.length)
        .catch((error) => {
          console.error(`Error fetching data for ${endpoint}:`, error);
          return 0; // Return 0 if there's an error
        })
    );

    // Execute all promises concurrently
    Promise.all(promises)
      .then(counts => {
        // Combine the counts into an object
        const countsObject = {};
        endpoints.forEach((endpoint, index) => {
          countsObject[`${endpoint}Count`] = counts[index];
        });
        setCounts(countsObject);
      });
  }, []);

  const dashboard24HoursPerformanceChart = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.6));
      return {
        labels: Object.keys(counts),
        datasets: [
          {
            label: "Nombre",
            backgroundColor: gradientFill,
            borderColor: "#2CA8FF",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#2CA8FF",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: Object.values(counts),
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
      },
      responsive: 1,
      scales: {
        y: {
          ticks: {
            maxTicksLimit: 7,
          },
          grid: {
            zeroLineColor: "transparent",
            drawBorder: false,
          },
        },
        x: {
          display: 0,
          ticks: {
            display: false,
          },
          grid: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 },
      },
    },
  };

  return (
    <Container style={{ marginTop: '200px' }}>
      <Row className="justify-content-center">
      <Col xs={12} md={12}>
          <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h2">Data Counts Overview</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
