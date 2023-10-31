

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

const RegularTables = () => {
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
    axios.get("http://localhost:8099/supporteur")
      .then((res) => {
        const value = res.data.results.bindings;

        if (value.length > 0) {
          setKeys(Object.keys(value[0]).slice(1));
        }

        const content = value.map((val) => {
          const obj = {
            className: "",
            data: Object.values(val).map((property) => {
              return property.value.replace("http://www.semanticweb.org/lenovo/ontologies/2023/9/untitled-ontology-2#", "");
            }).slice(1),
          };
          return obj;
        });

        setContent(content);
      })
      .catch((error) => {
        console.error(error);
      });

        // Fetch data for the "relationteamtrophee" table
        axios.get("http://localhost:8099/relationjoueursuppouteur")
      .then((res) => {
        const value = res.data.results.bindings;

        if (value.length > 0) {
          setKeysR(Object.keys(value[0]));
        }

        const content = value.map((val) => {
          const obj = {
            className: "",
            data: Object.values(val).map((property) => {
              return property.value.replace("http://www.semanticweb.org/lenovo/ontologies/2023/9/untitled-ontology-2#", "");
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
                  supporteur
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
                                <CardTitle tag="h4" style={{ color: "blue" }}>relation joueur supporteur</CardTitle>
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
}

export default RegularTables;
