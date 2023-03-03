/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/BookManager/TableList.js";
import Upgrade from "views/Upgrade.js";
import TableListCategory from "views//CategoryManager/TableListCategory";
import ListAuthor from "views/AuthorManager/ListAuthor";
import ListPublisher from "views/PublisherManager/ListPublisher";
import ListUser from "views/UserManager/ListUser";
import ListVoucher from "views/VoucherManager/ListVoucher";
import Login from "views/Login/Login";
import Import from "views/ImportManager/Import";
import InvoiceManagement from "views/InvoiceManager/ListInvoice";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List Book",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/type",
    name: "Table List Category",
    icon: "nc-icon nc-bullet-list-67",
    component: TableListCategory,
    layout: "/admin"
  },
  {
    path: "/author",
    name: "Table List Author",
    icon: "nc-icon nc-single-02",
    component: ListAuthor,
    layout: "/admin"
  },
  {
    path: "/publisher",
    name: "Table List Publisher",
    icon: "nc-icon nc-ambulance",
    component: ListPublisher,
    layout: "/admin"
  },
  {
    path: "/Acountadmin",
    name: "Table List User",
    icon: "nc-icon nc-badge",
    component: ListUser,
    layout: "/admin"
  }
  ,
  {
    path: "/voucher",
    name: "Table List Voucher",
    icon: "nc-icon nc-tag-content",
    component: ListVoucher,
    layout: "/admin"
  }
  ,
  {
    path: "/import",
    name: "Purchase",
    icon: "nc-icon nc-app",
    component: Import,
    layout: "/admin"
  }
  ,
  {
    path: "/invoice",
    name: "Invoice",
    icon: "nc-icon nc-paper-2",
    component: InvoiceManagement,
    layout: "/admin"
  }
];

export default dashboardRoutes;
