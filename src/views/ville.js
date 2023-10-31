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

const ville = () => {
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
      .get("http://localhost:8099/ville")
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
                    src="data:image/jpeg;base64,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"
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Ville
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
                <CardTitle tag="h4">relation event ville pays</CardTitle>
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

export default ville;
