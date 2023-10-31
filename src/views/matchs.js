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
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import axios from "axios";

const Matchs = () => {
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
      .get("http://localhost:8099/match")
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
      .get("http://localhost:8099/relationmatchequipeeventstade")
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
                    src="data:image/jpeg;base64,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" // Replace with your image URL
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Match
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
                <CardTitle tag="h4">
                  relation match equipe event stade
                </CardTitle>
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

export default Matchs;
