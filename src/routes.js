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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import Matchs from "views/matchs";
import Sports from "views/Sports";
import Evenements from "views/Evenements";
import Trophees from "views/trophee";
import Villes from "views/ville";
import Pays from "views/pays";
import Stades from "views/stade";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Arbitres",
    icon: "users_single-02",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Entaineurs",
    icon: "users_circle-08",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Joueurs",
    icon: "sport_user-run",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    path: "/extended-tables",
    name: "Supporteurs",
    icon: "emoticons_satisfied",
    component: <TableList />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Equipes",
    icon: " business_badge",
    component: <Notifications />,
    layout: "/admin",
  },

  {
    path: "/Evenements",
    name: "Evenements",
    icon: "ui-1_calendar-60 ",
    component: <Evenements />,
    layout: "/admin",
  },
  {
    path: "/matchs",
    name: "Matchs",
    icon: "files_paper",
    component: <Matchs />,
    layout: "/admin",
  },
  {
    path: "/Sports",
    name: "Sports",
    icon: "design_bullet-list-67",
    component: <Sports />,
    layout: "/admin",
  },
  {
    path: "/stades",
    name: "stades",
    icon: "business_bank",
    component: <Stades />,
    layout: "/admin",
  },
  {
    path: "/Pays",
    name: "Pays",
    icon: "location_world ",
    component: <Pays />,
    layout: "/admin",
  },
  {
    path: "/villes",
    name: "villes",
    icon: "location_pin",
    component: <Villes />,
    layout: "/admin",
  }, 
  {
    path: "/Trophees",
    name: "Trophees",
    icon: "design_app",
    component: <Trophees />,
    layout: "/admin",
  },
  
 
  
];
export default dashRoutes;
