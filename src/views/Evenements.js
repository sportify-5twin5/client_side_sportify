/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import axios from "axios";

const evenements = () => {
  const [tkeys, setKeys] = useState([]);
  const [tContent, setContent] = useState([]);
  const [tkeysR, setKeysR] = useState([]);
  const [tContentR, setContentR] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchInput) => {
    setSearchText(searchInput);
    const filteredData = tContent.filter((item) =>
      item.data.some((value) =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    // Fetch data for the "trophee" table
    axios
      .get("http://localhost:8099/evenement")
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
      .get("http://localhost:8099/relationeventvillepays")
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
                    src="data:image/png;base64,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" // Replace with your image URL
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Evenement
                </CardTitle>
                {/* searchInput form */}
                <form>
                  <InputGroup className="no-border">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_zoom-bold" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
                {/* end searchInput form */}
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
                  {filteredData.map((prop, key) => {
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
                <CardTitle tag="h4">relation event ville pays </CardTitle>
                <p className="category">
                  {" "}
                  Relations : DataProperty et ObjectProperty
                </p>
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

export default evenements;
