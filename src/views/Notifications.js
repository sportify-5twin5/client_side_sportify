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
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import axios from "axios";


const Notifications=()=> {
  const [tkeys, setkeys] = useState([]);
  const [tContent, setcontent] = useState([{
    className: "",
    data: [],
  }]);
  useEffect(() => {
    axios.get(`http://localhost:8099/equipe`)
      .then(res => {
        const value = res.data.results.bindings;

        // Extract the keys from the first result
        if (value.length > 0) {
          setkeys(Object.keys(value[0]).slice(1));
        }
        value.forEach((val) => {
      
          const obj = {
            className: "",
            data: Object.values(val).map((property) => property.value).slice(1),
         
          };
          
          setcontent((prevContent) => [...prevContent, obj]);
        });

       
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // The empty array means this effect runs once after the initial render
  useEffect(() => {console.log(tContent)},[tContent])
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Equipe</CardTitle>
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
        
        </Row>
      </div>
    </>
  );
}

export default Notifications;
