import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import axios from "axios";

const trophee = () => {
  const [tkeys, setKeys] = useState([]);
  const [tContent, setContent] = useState([]);
  const [tkeysR, setKeysR] = useState([]);
  const [tContentR, setContentR] = useState([]);

  useEffect(() => {
    // Fetch data for the "trophee" table
    axios
      .get("http://localhost:8099/trophee")
      .then((res) => {
        const value = res.data.results.bindings;

        if (value.length > 0) {
          setKeys(Object.keys(value[0]).slice(1));
        }

        const content = value.map((val) => {
          const obj = {
            className: "",
            data: Object.values(val)
              .map((property) => {
                return property.value.replace(
                  "http://www.semanticweb.org/lenovo/ontologies/2023/9/untitled-ontology-2#",
                  ""
                );
              })
              .slice(1),
          };
          return obj;
        });

        setContent(content);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch data for the "relationteamtrophee" table
    axios
      .get("http://localhost:8099/relationteamtrophee")
      .then((res) => {
        const value = res.data.results.bindings;

        if (value.length > 0) {
          setKeysR(Object.keys(value[0]));
        }

        const content = value.map((val) => {
          const obj = {
            className: "",
            data: Object.values(val).map((property) => {
              return property.value.replace(
                "http://www.semanticweb.org/lenovo/ontologies/2023/9/untitled-ontology-2#",
                ""
              );
            }),
          };
          return obj;
        });

        setContentR(content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4" style={{ color: "blue" }}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOavBAN6rgHEPhyzVWXPuz98xrAodK94rkLw&usqp=CAU"
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Trophée
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {tkeys.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tContent.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12}>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">relation team trophee</CardTitle>
                <p className="category"> Relations : DataProperty et ObjectProperty</p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {tkeysR.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tContentR.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default trophee;
