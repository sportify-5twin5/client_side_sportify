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

const Maps = () => {
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
      .get("http://localhost:8099/entraineur")
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
      .get("http://localhost:8099/relationentraineurequipe")
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
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRIVFhIYGBgZGBoYFRwYGhgcGBoVGRkdGhwaHhwcJC4nHR4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMDw8PERERETEdGB0xMT8xNDExPzQ1Pz80NDQxMTE0MTQ/NDExMTExMTExMTExMTQxMTExMTExMTQxMTExMf/AABEIAMEBBQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIEBQYIAwH/xABFEAACAgECAwQGBwUFBgcAAAABAgADEQQSBSExBgdBURMiMmFxgRRScoKRobFCYpKiwSMzY7LCJFNUg9HwFUNEZHOTw//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AmaIiAiIgIieOotVEZ2OFVSzHyVRkn8BA07vA7broEVEAfUWDKKfZReY3uBzxkEAcskHyMhLivaPVali12psfP7IYqg9wVcL+U8+0HF21eou1DZ9dyVH1UHJFHwUD5585j5VFcg5BIPmCQfxmwcG7a67TEej1Tso/YtJsU+7DHI+RE1+JRP8A2K7wqdaRU4FOo8FzlXwOexvE8j6p58vGbzOSabWRldGKsrBkYdVZSCCPeCBOlOxHH/pukruON4zXcB0Fq+18iCGHuYSI2KIiQIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJqfedrDVwzWEdWQV/KxlQ/kxm2TXO33DDqNBq61GW2b0HiXrIsUD3krj5wOaJVKQc85VNKREQpJQ7k+MKlmo0rHHpMWV+9kGHHx2hT90yL5KHclZp/S6lWUfSMA1scZ9F+2q+R3EE+YI8BImpnE+z4J9kQiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAnwz7Phgc595HZ36FrHCriq7NlXkMn10+6x/BlmqSYO/LUKatIgILi1ycdQBWMj570P4SH5VwifCJ9lUmT4FqLtPfp9QldhKWKVwjYfPJkBxzLKzDHvmLAzykl90AZda4NyOHoYFVsZmG1lIOMYXHTnjrykTU1VnIBxjI6HqPdPSfAZ9kQiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICImG4/2k0+iTffaFz7Cjm7HyVep+PSBmDNG7T9rj9Jq4dpWzfY4W1xgihDzYjOQbAuWAPIcs+U1sd5l173WV1rTptPW1j7sNZYxwlVZPRNzsOQzyDc5rfdKC/E0dyWbZc5J5lnIALH3nex+cozffD2ftDV6lAz0Km1xzJrfkN7eO1lVAT5pz6yLJ1kjLYoIwysPEZBB8CDI37W91VVu6zRstD9TWcilj44xzT5ZHuEKiHRuh9S3IQ+y6DLo31gv7a/WX5jn19tfwW2pRYR6So+zdX61TD7Q9k/usFI8p6cJ4DbqNQNOhRW6lnYKgTkd4P7SkEEYzkEHpzkm9teHjhfDKK9NY9bnUKXsUlXd9j7i2OoOB6p5AACBDgOZtfC+MW6bht3o2ZLL9SEV1JDeiSvc+wjmPW2gkfWPQzz4Tx9rL6F1FWmsV3VHd9Np94V2CltwTmV3bueemPGYXiuptZ2Fr7mQtXjAVUCsQVRVAVFyDyUAQMhpe12vrPqa6/wC++/8Az7pJ3Z7vJZ7dDVdWu3UVqDYvIjUB2rbK9NpZPDGN4kLTYuBsGbhjf7vVsrfZLVXD5f3n4QOlokR9le9tWXbrk2tjK2VISp9zIMkH3jIPuklaPjFFqU2JapW1Q1eSFLA+Stg58MSIyUTye1VGWIUeZIA/Ezx1Wurrra53C1qCzMT6oUeORAu4mrU9v+GucDW1j7W5R+LACZmjjOncApqamB8RYh/rAyETyruVvZZT8CD+k9MwPsT5mMwPsREBET5mB9iYfjnaLTaNQ2ouVM+yvMu32VHM/hNZ03exoHYKTcgJA3Og2DPidrEge/EDfomt39t+HozK+trVl6gk5/Tn4dJbL3i8NJI+mKPeVcD8SsDbYmAp7Y6BxlddQfP+0UfrPkDYJ5WOFBJIAAySeQAHUk+E9ZD3edxt7zrNErMn0bZayg8r6iis+R+5vRsdCA3LlAu+2Xemle6nRYdujXHnWv2B+2f3vZ+1Ij1mre12sssZ3Y+sznLH5+XuHKeM+fH/AKfnKrNaw+h0lFI9u8jU3eewbk06/DHpHx++syHdhrBVxPSknAs31fN0O3+YKPnPDj2nTU+k1emcsoC+mpbAt0ygBF5Dk1IAVQ69OW7GZgKLmR0dDh0dXQ+TIwZT+IEDqHRH0dllR9libavgx9dfuud3wsXymG7ecQZKWprGXeuyx/dp6k3WH7x2V/8AMz4S84frxrdLRqacb8B1BPSwDa9beWfWQ+Wc+Amu8Q4ma9LxLiN1RVrM6eiqwc1rRjUFYA/tWNYxweYxIiG9C1up1dZDsbrbkww6hmYcxjoFHQDoFx0EkPvmdq00un5lC72VnyCqENfwUvke5gPCa5wvjq6PV6Gz0dYUU0m4bAdnpRuZ1JyUIR06eR5c5tPfrjHDiP8AHwfd/YyiJkrZuSg7j0x8OufDHXJ5DGZd8ZuV773Vgyu5fK9CW5sR94tznhptS9bbkdkbzU4OPL4e6Z/h2pN9WsfUrXYlNBZWKKtgudglKh0CkguSSDnkplVrcyPD9QUqsI6pbU4+8lqfqyTHSpLCA4HRlAPyZWH5r+cDNdkezrayxstsopXfqLPBK1BJA/eIBx5cz4YN1w8VXvdrtTX/ALNRtWqnOAzY/sNMpPRQBucjwyT7UyHFe0lFXDaNDpG3NYgs1r4Iy7AFk59STyPgFUDx5axrtYDVp6U9hFZ3/e1FhyzHzwgRB7kPnAq4/wAcv1lhe9y3P1U57EHgqp0Ax49fMxTxq1dK+jViKmsWxhn6q42geALYY+ZUTHRIEoKA+A/CVxKqj0a+Q/AT3r1Dr7Njr9l2X9DPOIF4vF9SvTV3j4XWD/VLhO0utXprdSP+dYf1aYuJEZpe1+vHTX3/AP2E/rPQdtOIf8fd/Ev/AEmBiUZ1u2fED/6+/wDiA/QTL0ds9bXpPV1b7tyYZ9rt69mqLc2BzkVp8NvKaXL7S6LUXoVp09tqpt3ejrd8EbiM7Qcf3jH5mQW+u1llztZbYzu3tO5yx8h7h7hyEaWlXJDWpWMcmcPtLeA9QEjr16ATy1FbISrqyN5OpVh8mwZkhtLekpfkVwyIAXrOBnKN7aeO4Hx54MDz0tVa3Vrqt61jAY17SwQ+yy5BDL48uozjnJc0fddw26tbKr7nRhlWWxCp/k5f0mI7F9ijq6i+qZLNO65oatTXcH3YJHqLtX1TkHcCcHwzJO7PcDq0VK0UhtiknLHLFmOSSfP4ACNRrOm7quHqDuS1yfFrG5fDZgRN8iQJA3eVadPxg3bcgpU7D66FTU6HPgyqy/OTzIG76bd3EK1x7OmrBPnl7G/rLg0nimlFV1lYOVVsofrVsA6N80ZT85bS81Vm+qlvGsGls9SoJes/wsy/CsSzlVmeCHZpuJWf4NenHvN9qsfntqeYaZjhXE6xVZpb629E7rZvr/va7VUqrbScWIAx9Q46nBzLLiPDmpK5ZXRxuqsQko6jllSeYI6FTzB6jpkN67oe03oLjpLGxXcc1k9FvxjHuDAAfEDzmyd+F5XS6ZAfav3H3hK2/qwPykLKxBBBIIIII5EEHIIPgQZvHbHtEddoNA7f3ldj13/b2Aq33lUn4hh4SDStRcXYs3MkKPdtVQgHwCqBNu7W8W+kcP4MzEl0Goqcnrur9CoJ95XYfnNMl7eT6DTjnj0lzfNvRL/+cotJm9a3odFRT0fUMdVZ/wDEua6FPxxY/wB5TMbwvRemtrr3bVY+u/glSjc7k+AVFZvlK+Ma/wBPdZYBtUkCtfq1IAiJ8kVfnmBZyvTVb3VPFiFHxPIfmRKJ8/75dYUI/wCzyM+yQ+F9hzxOhdZVaKXdmW5XUlGtU4axSp9UMckgg4JPhKn7ntb4X6Y/FrB/oMiVHUSSKe53Vn29Tp1+z6RvyKrNip7ntN6MK+ouNniy7AufIIVPL4mCoViTGe5ir/jbf4K56J3M6f8Aa1d5+ArH+kxSoYiTpV3RaEe097/F1H+VRL2nut4avWl3+1bb/pYRSufpSDk48fAeP4TpXT9heHJ00NJ+2u8/z5mY0vDKa/7uitPsIi/oIpXMek4FqbfY0l7e8VPj8cYmVp7A8SfpoXH2mqX/ADOJ0pEVHPlHdZxJutdSfatGf5Q0lfsD2V/8PoKM+57CrW9NquFCkKQBleXLIzNsiQW9+lRxh0VvtKp/USmrQVJzWpFP7qqP0EuogUquJVEQERED5IT70NfoH1TE+muvRFqZa3RKk2sx9ZijFmy5yAPADlJn1L7VdvqqWHyBM5SvrcYexHUvlwWVl3bjksN3tDJ6jlLgoL+0AMAnOM5xjpzwMnmRnEpiUmVomSCvUr12siqSC1bk7g2PVfYAWRwD1ODg4PKS93b9ia9MFuvCtqiquEbBNCNnb6vg55gt4YIHjmQ66FUkqqgk5JAAJPmSOslRzVwHsxdrCw04Z9vJm2MqA9cFzyBwRy6y81fZfV6IWfSNOxocbbmTLIoByH6ZBUgNkjBGVyAZOHaDtVpdG9SX27DZ05Ftq9NzBeYXPLPTr5GZPSaqrUJvrsSxGBG5GDKQeRGR+kVHK11ZRipwSPEHII6gg+IIwR7iJ76sYXTr/hlvm9rn9Ns2nt9wAUXWqo/u9r4HLOndiFcD91jsbHIEg8g2FwAqV2rZyRXXRWbCvIkAckU9N7Fto8sk9AZVKz6HTsej6kbV8106t6zffcBR+6j+cxk9tbqmsdnbAJ5ALyVVAwqKPBQAAB7vHrPGAiJSTCukO7TTBOGaIAe0hc/Gxmf/AFTapiOytGzRaJPq6eofMVrmZeZZIiICIiAiIgIiICIiAiIgIiICIiAiIgR93o9r7dCtNdAUPcHO9hu2Ku0eqp5FiWHXI5dDIt4h2e1ArOr113ot/OtbSW1FxxkBUB9VfexG0eGMSRu87jWm092ldk9Nqaksamtv7pN5XFlniSCh2qOp8sAyH+KcTt1NjXXWM7t1J8B4KoHJVHkP6mXFWkyXADttNu0N6Gtr9reyzJgID7t7IflMbM12T0Dam23ToV9JbQ6JuOAWDI+M+Hqo0ozndxx3Uf8AiaMzPa2oyl+TklT62/yAQjPkBuA6gSedY7LXYyJvYKxVcgbmA5Lk8hk4Hzkbd1PY+7S26m7U07HCiurJVsgkl2BUkc9qDz6yUZlHKnGOI26i6y64k2Ox3Z5bcctgHgFxjHu88zOd22qdOI6RVsZVdyrqCQrLsb2h0PQdfKb3267tbNTqfT6U1oLOd4dmUbx+2NoOdw6jzGfEy67Jd1/0W+nUWare9ZLKiptXJUrzYkk4z5CVW4doeAV6pQHA3qGCN+642uh81YHBHng9QJzjr0NS+gJ9ZXf0pHi1bNWoP2QrnH+JOnOJcRr09bW2uERRkljj5DzPuE5j4/Zv1OqfGN11jY8izsSPzjExYREStEos6N8D+krlFnst8D+kDq/ha4ppHlWg/lEvJZcJfdRQfOtD+Kgy9mWSIiAiIgIiICIiAiIgIiICIiAiIgIiIHOvaDtg2sdy/DtKSAQWZLDaqof94rqRjPXzM1em0ISfRoxzyD5Kj3bc8z9rPwkhdrOGVaTUJo6/WNrW6zUsR6zInpLKqvsD0bkgdTg8pHnoD6NbD0Lsn3lRHP8AnlXFZ1rE+xVjyFFA/MJn85m+y3EUXUU2eg2PW2/0lbbFVFGGLo52lcHBwU9rxOAdcm0dj6dO9PEkvfYXSiut8Z2M93Jj+6HWst7hKNu7Xd6xYNVoQV8Dc4GfuIf8zfhMr2G7eL9GJ4hqq1sD/wBmWwHeoqCGKqOfrbgDgZA+ZhtleixlZAHrdlZXVWAdGwQVYYbBHiMcpVqNSLGZ3zvY5LKAdxOM7lJHPl4EeWPKDprgnG6NXWbNPYHUMUJwQQwxyIIBHIg/AzRO2fegKHNOjRLXU4sdsmsHxVQpG4+BOcA8uZkUafi70ramnsdEtTZblvWdfgOS+I5c8E8+c9eA2aeom21Dc4O3T0LkKzkYDuw5hVPRV9YtjwGSgz3ajj41Wr02p1CMtKCr+yBBLMvrWbQTjbv3LuOMhflNZ4zRssJ37xYq3KxXYzLb64LJk7TnPLJHQgkES6tIpY2WhbNQelZAKU+XpB0ZhjAq6L+1z9U4m65nZndizMSzMeZLHqSfEymKYiIUlMqiB072Ov36HQt56erPxCAH9Jm5pndTrPScM03nWXrP3XbH8pX8ZucyyREQEREBERAREQEREBERAREQEREBERA0Ttv2Te/UabV1AM6A1XLyBahwyEqT+0osc48QfMCRDpdA/wBG1+mdCt2mZNTsPJsL/Z39fAIyP8FzOmCJjNXwaiyxLnqU2KGUP0YoylWRiPaUhj6pyPGUcty84U6bnrdgqWoa2Y52ocq6OQPAOiZ926SJxzugtDs2kuRkJyEtLKyj6oYAhgPeB85g27ruJD/yqz7xauPzxCsPxdlsf/aS1GpVVW8shdLGUbVsyvMMVAyQCrYDA8+fjwvgn0i+uim+tmcnmwsRVUDLMS6jOACcDnMrquFPp8Ua7V0qichWu3UahR9WsKM1/eZV90suI8drCvVotP8AR63G13Zt2osXGCruc7FPPKLgHPlylR5NwzTIx369HQZONOlrO/uBdFRefiWOPIzwfi+3cunrWhSCNwO65geXrWtzHwQIOcxsQpET5uxz8ucK+xPTU17HdPqsy/gcTzgIiIEwdxvEMpq9OT7LLao9zgo34Gtf4pLE5x7tOL/RuIUFjhLM0N5euRtP8ap+JnRsmsvsREgREQEREBERAREQEREBERAREQEREBERAREQOau8ZccT12P94p+ZrQ/1muTYe8J88S15/wAXH4Ig/pNelXCIiVSUOMgj3SuUwMv2nq26gtjAsrpuX7NlSsf5t0xU3Htrof8AY+DakDk+lShz76xlfnhn/hmnSIRESq+Z8jg+BHUHzHvnS/Yjj412kquyN4Gy4DwtUDd+IIYe5hOaZt/dt2pGh1OHOKLtqW56Iw5LZ8Bkg+4+6RNdExKEbIBByDzBHTErkQiIgIiICIiAiIgIiICIiAiIgIiICIiAiJ8Jgcv9sbd2u17f+5tH8Llf9MxEueLW779S4/autb+J2MtppSIiFJTPm4dM8/zmV4X2f1WpYLTpbHz47CqfN2woHzhEtHgR1fZ/TVqubEoS2oeJdMnaPtKWX70hOdUcF0A0+n09Gc+irRM+exQufymidoe6mrUXWXU3mkudzJsDJuPMkcwRk88SUQlElVe5h889euPdSc/m8yek7nNMDm3VXP7lCID+TH84pULy+4ZwbUag4o09lnvRSU+bH1R8zJ/4X3f8PoIK6RXYftWlrDn3ByQPkBNnrrVQAqhQOgAAA+Qilar3e8P1tGmFWsKnYcUgMWdU+qxHI4PTBPLl4TboiRCIiAiIgIiICIiAiIgIiICIiAiIgIiICUn+kRA5X4z7bfE/rLGImlIiIVLndv7C/KSyPCIkZVxESBERAREQEREBERAREQEREBERAREQEREBERAREQP/2Q==" // Replace with your image URL
                    alt="Arbitre"
                    style={{ width: "150px", height: "150px", Color: "blue" }}
                  />
                  Entraineur
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
                <CardTitle tag="h4">relation entraineur equipe</CardTitle>
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

export default Maps;
