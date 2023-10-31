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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";
import axios from "axios";

const pays = () => {
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
      .get("http://localhost:8099/pays")
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
      .get("http://localhost:8099/relationpayssport")
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
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRYXFRQYGRgaHR4aHRwcHBgcJhkZHhgcHB0cHx8hIS4lHx4rHxgWJjgmLi8xNTU1GiQ7QDs0Py40NTEBDAwMDw8PEQ8REDQdGB0xMTE/NDE/MTE0NDExNDExNDQxMTE0MTExMTExNDExMTExMTExMTExMTExMTExMTExMf/AABEIALQBGAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUCAQj/xAA4EAACAQIEBAQFBAEDBAMAAAABAgADEQQFEiEGMUFREyJhcQcygZGhI0JSscEUYnIV4fDxM4LR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwC5oiICIiAiJEOKOLxQ106Y/WUgeYbAEXJHe233gS+JTWF4txiNq8Zn33Vt1Ppbp9J3qnxEfQNNBQ/Ukkrb0HOWCR8YZ1UwyI1PRdjY6r/gCQTF8aYx+VQIP9igfk3mfN+JaOJUeNh21hSAyuQAe4U7SLQjZbMKpfxDUcuDfUWN5M8H8QyNqtEHbmp5n1vIHECw8i4611mWvpRG+QgfKb8mP+ZPAwIuN5QEkGTcXYjDroBDp0DXOn2PO3pEVcMSvsL8RN1FShYfuZWvb1AIkzwGa0awvTqK217A7j3Eg3okaz/i+jh/Kv6j/wAVIsPczQy3j+i5tVU0/XmP/wBgTSJVnFGet44q4bFsVYAaFJGiw6g7G82sg47ZbriruOjqBcehA5wLJiROhx5hWbSdaj+RG34kjw+NpuAyOrA8iCIGzNDN8yTD0zUqX0iwsBckk2E1My4lw1AgPUBJNrL5iPU25TWbifC1KdQLVS4VtmFrm22x57wNPDcfYZiQwdOxIvf7SR5fj6dZA9Jgy+nT0I6GUUZ0MmzirhnDU2/5KeTjsR/mWC8YnIyriChXUFXUE81JAIPb1nXkCIiAiIgIiICIiAiIgIiY6lRVBZiABzJ2tAySBcacLFzUxKObgXZCCb228tvTpJylRTyIPsQZkgUjQyDEuodaDlTyNrf3OaykEg7EbH3ltcY5pXw9NXoqNNxqcgHSOQGn123lUYisXdnIALEsQOVybm0qMcREoREQEREBPSOVN1JB7gkTzEBERAREQE+q5HIkfWfIgIiICIiABkpyDjOrh0KOpqr+3UxuvpffaRaJBZvCHFNXE1XSoEA06l03B58ue8mkrX4d5cjP4y1D4iXDIR+1vlIN5ZUikTy3LtIfh+LfCrPQxZUFTtUUGzDpcdDbqIEyiaeW5hTrprptqW5H2M3ICIiBqYvHpTVmZh5RcgEE/aRfH/EDDqv6Su7diNIHuZC+LcAaOJdbuVNmBY3LX5m/vecWWCwcv+IgL2rUQqn9ykkr7gjf6TuV+LMAylXqqykbgqxuPUWlRRER18ZmujEM+Ed0S/lFzy67dr9J3Mg46dLriNVRTyYW1L6W6iQyIFxZHxBQxilbANvem1iSO/qJXHF2W+BiXUABW86gdFPS3veSD4ZrT1VSzDXsFU2vaxuR97Tt8eZUtTDtUA89PzXA3K9R7b3+kKqmIiVCIiAiIgIiICIiAiIgIiICIiAiJv5MuHNUf6hmVOd1F9x0O3I7wNWphXVFdkYI3ysRsfYzFLZzfA4fErhwKyLSB1BQQNa2tZe05fFPCtFcPrw9Il1t8pLXXqbdZKOf8Ml/WqnfZB0259TLMlc8GZ8tAjDVqfhkn5iLEk7gPf32MsWRX2Vvm+R4anXK13YCsboyk3S53LA+W1yBtLIkM+IgpNh7n50YaW92sy3723t6QJDk2WJh6YRAPU2A1H+RnSka4Frs+ETW2ogkA3vsDsD2klgIiIHMzfI6GIA8VLkcmGxH1nDp8B4cU2UlixNw5tdfTbYiS+IEHxPBmHo4eq27uqlgzbWIHYdJW0trj7G+HhWANi5CfTmfwJUsuIRESj3SqMjBkYqw3BGxBnTrcSYp10tXcgixG24OxvtOTEBERAREQEREBERAREQEREBERAREQEREDt8K5YmJrqlRgEXexaxb/av/AGlvYTDLTRUQWVRYDsJQ6sQQQbEbgjoZavBvEi4hFpu36yje4+cD9w9eV5NVxviVl3mpVVBJb9MgC/LcfXciSLgs1/8ATAYhWVlJC6uZSwIJ+5H0naxNEsAAQCCDcgNyPS/X1mDOaVVqLrRYK5FgTy9fxeQcXMONKFN2pqr1GU28liCewN+kr3N8bUru4UPo1lwlvlZu4HXnO3w/k7YkFQwp+E9mKeUuGHMdQQVH3MneX5HSpVHqKCXcAMSb8uvudryiPfDvD1qaVFdCqNZ1JuN91I/Ak2iJAiIgIiIET+IeAD4bX+6mdQ9jsR/UqqXrmWBSvTanUF1b1+xlL5zlzYes9Nv2nY91PIy4NKIiVHX4ZycYqqaZfRZS3cm3b7zHn+UthqxpsdQsCrcrgzWy3HPQqJUQ+ZTf3HIg+hEsojDZlSXUNNTSbfyU9bfyF5BVcSUYzgjEIWN0KKCdV7bD0PKcTNstagygnUrqro4GzKwvtA0oiJQiIgIiICIiAiIgIiICIiAiIgJ1uGMwFHEI2jUSQo3ItqNr7c+c5MkXA+XCril1WKoNZB6kcvzILen2IkVrYfCImrQoXUbmw5nuZsxEBERAREQEREBIvxlw7/qUVkNnQGwt8456b/Tb3koiB+f2UgkHmNjPk7nFeUNQxD3U6HYsjdCDva/cThzSE6eRZp4FZHZSyoSQoNuYsf8A1OZECVcQcZviKfhqnhqfm81yw7e06HDvFtEUkoYlL6fKGIDDT0uDytykFmbCYR6jhEUsdzYb7DmZBcL8O4JwD4FMg7gqLXH/ANbXnqnw3hFtbD09uV1B/vnNjJsEKNCnTUkhVG55knc+25O06Eiqw404Xam5rUVJpndgP2MT0A/by9pDnQjYgg+otL7q0wylTexFttucgFTgescQWZ1ene+pySxHY+sogUTLi6Wh3S99LFfsbTFKhEQBARJ9w7wVSq0EqVtYZt7AgeXp06jedPiLhWmcNow9MB0OpRcknuLnfl0kFXRPVRGUlWBBGxB2InmUIiAL8oCJOsu4CBo661QqxGoKLWUWvuT1/qZOGuDqFRA9R2Zr+ZFIAU35Ejc/iQQWhQZ2CIpZibADvLTyLIRgqD1La62gk9bEAnSvpO9g8vpUhamiqL32HX3m5IqMcCY2pVw7NVYu3iNYntsbD0BJknmtg8IlJdCDSty1vViSfyZswEREBERAREQEREBERA5mf5WuIoPTPMi6nsw5GUti8M9N2RxZlNiJfkqj4i4critRGzICD3tsZcEViAJJMn4OxFcKxApof3Nzt6Lz/qER+hQdzZEZj2UEyy+DuFPAtVq38XcAA7Kp79zJFlOVph6aogGwsWsAWPUmdCRSIiAiIgU1xjgvCxdQAWDHWPZv+95w5YfxJyosExCi4UaH9AT5W9r7fUSvJUJP+COFyCuIrDa10U9bj5j9OQmjwDklGuXqVPMUIAU2sbjmZZqKALDYDaFep9iJBXfxLy0A064sCfIw79Qf7H2kDKGwNtjex725y6s9yKnilVahYaTcFTbe1pHeNckppgh4SACmwO3OzbMSfsfpKK2mTD1Sjq45qQw9wbzHEqLfTELmGEZUfQzrZrG5Rr8iOxt9jNjhnJBhaWjVqYm7Na1z6ekqbJ81fD1FqIeXzL0deoMurBYgVER15Mob7jlIrZiIkERzbip6GMFAonhnR5iSCNXM9jJbK54lwenH03rgvRcjTuBv/G/YNv7GT3C4ym4Gh1b2IP8A5ygbUREBERAREQEREBERATg8RcNpiyhZ2XRfkBve3f2neiBxss4bw1C2imCw/cdz7zsxEDVxAq6k0FAt/PqBJI/226+82oiAiIgIiIGtj8MKlN6Z5OpX7iUZi8M1N3RxZlJU/SX5K4+ImTt4iVUUnX5GsL+bp9x/UuDN8L6X/wA7328q2+5vLBkFwNRMsTDo6jVWP6jXPlHQ+wvvJwpvuOUg9REQNPBhtVUtexfy3/iEUbel9U942gHpujC4ZSD9p6pKAWAFrm/P5ieZtMlX5W9j/UCsuFuHBiKOIVrLZ1CPYEjTfUAOxBWR7O8pfDVDTex6hhyYHkZPOAszWz4cqUdWZ9/3Atvt3G0kWdZXTro2umGIVtPe9trSikZcfBlNlwdENe9id+xJtOLwhwiqJrxNMFybqrb6AO/rJuBA+xE1cdXKKSqF25Ko6k+vQdzIObnGX+OygFf0yCSTqvceZWXp5SCD6yNYVlpF8ThxS0KCrKWZbOP22IuDY7G559pMMrwRRWLm9SodbkctRFrD0AAA9pFMbltCjiKheuiIV1KgFzp31gjodzY89/SBMsBiRUpo4FgyhrdrjlNqRvg7NlrpUAJsj6VB56CLr/n7SSQEREBERAREQEREBERAREQEREBERAREQE+T7ECHcdZFVxPhGioYrdTuBYHrv0klyvDtTo00ZtTKoUnuQJuRAREQMLpcgg2I9tx1H9faYaGYUnLBaikqdLC4uG7ETckD4v4bWo71KF1qqutlsQHH8lPLVtAzcY0P9NUTG0gNerQ4PJrg2P4tO5w3nqYqnqFg67Mt+R7+xkYyzOlx1BsLXIWpp8rE/Oy8uf7tpyOCtVDHCnUuhIZCDtc2uPyBaUWxE+TxSUgAE3PU2teQZJDuJeKloV6aABgpvU7qD0Hrbf7TV4r4xTw2p4dyXJsWFxpHWx7yv8OVZ08RjpLDUdztff8AEC68JmlKqgekwe/IAi5I5ixOxE42a8MrUo1SEQ13LMGPq1wL+1hO5l+Dp00UU1AUDY9SD1vzPSbsCJcEZG2HVmdSrsApUm9yrMdQ9CCPsZLZiZblTcixvbvsRY/3PlGsri6kEXIuO4NjAzREQEREBERAREQEREBERAREQEREBERAREQEREBERATXxVNmRgrFGPJrA2PtNiIFU8c5UUqCsijw3sCyiwDjY7dLkXmPh7FeO6JW1MyedH+YpoGre53Sw5Se5vlwZalPSWWte97nTU0+Vh2Xyj6yoqiPRcqwKOhsem4/xKL0w7alU3vcA3ta+3bpK747zCvSxSlXZBoGnSTuLm9xyM7fC2fVq/iMyFlA2ACjQyr8vrq6Ge+MssbE0FanTJqXXym1wp3IPaQVVMuGpa3RL21MFuelzabNTJ8QpYGi/lOkkKSL+/WSH4dYBalZ2dVYIoK6t7NfmBKiYMuIoU6dBKgeoxIV3Hyoq33t8xEx+Lj1CoWwzVDfe5U2/lp62kb40xFWpjUp0yyGmvla5W5K6yQfawnY4HwlJ6QrKG8UF0ZmOrzbb78xYi3uYV28fRK4V1aoSdBBc8yxH43mtkdd6eEV6t36+UajpJ2sAOn+JmrYgI/hVa5/USy+UA3F9R2Fr2tNX/rdF9FO9RVY6LshAcEEAatgL87jtIOxRzCkzaA667X03FwPUTYDg3AIJHP095V3EWWJhsTqQVLC1QDnezDV5r3tOnn3GOjS2Ha5dLkWWyMe+1ywgWFErfKviA4AWvT1G9tS2B+3K8QLIiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICRfi3hlcSrOi2rKNjy1gftP+DJRECCcMYingQ1HEVVV2YNYbgAgDc9JNFxClQwZdJ3vcW35bzlZ5wzh8Tu6lX/kux+vQ/WR/GcBtp00cS9uqvyNv+PL7QJyLEdCD+ZgwuCp0wBTRVA28oA63P5kKyzIcbh2RgKdQKw2LMSo66dwB+Z3jmtdFscG+oi4CsCNRJNr9upPrA95ll7vi8PUsppoGB76m2G3awmLh/Imw9WobjQ1yBcnzE7+nID7zL/1ypsBhmL/ALkD0yUHrvM9bNHRS70gij+bqvT0v1gdRkB5gH3E8+ELAaRYchblblOLl2aVqzakpMKZXYsAo1dwb6mB9hOrXVyCFIFwB/xPU367chbpAw46oq6nenqCod7A3Fx5R7n/ABI9mXA9CopenrpuwLWuSNR3sQeW/aStaXlAJ1WABJ3vbqZmgUVh8Ky10psvmDqpHrqAiTvOOF3/ANWmIQgq1VCyjmoBF2/ESidRESBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA0auApl/F0gVFBsw2PLr3nNOETEVSlYa1o6GUHqxG7G3MxEDvCeoiAiIgIiIH//2Q=="
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Pays
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
                <CardTitle tag="h4">relation pays sport</CardTitle>
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

export default pays;
