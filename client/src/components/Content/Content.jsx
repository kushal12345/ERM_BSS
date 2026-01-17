import React from "react";
import { Users, BanknoteArrowUp , BanknoteArrowDown,Siren } from "lucide-react";
import { Card, CardDash } from "../../components/ui/card";
import ColumnChart from "../lib/ColumnChart.jsx";
import ClicksLineChart from "../lib/LineChart.jsx";

const Dashboard = ({ userRole }) => {
  const renderDashboard = () => {
    switch (userRole) {
    
      case "admin":
      default:
        return <AdminDashboard />;
    }
  };

 

  

  return (
    <div className="p-6 h-full  w-full overflow-y-scroll no-scrollbar dark:bg-[#0f1114] bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

/* ------------------ ADMIN DASHBOARD ------------------ */
const AdminDashboard = () => (
  <div>
    <h1 className="text-2xl font-semibold mb-4 dark:text-white">Dashboard</h1>

   {/* SUMMARY CARDS */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             ["Total Staff", 300],
             ["Total Income", `Rs. 1,20,000`],
             ["Total Expenses", `Rs. 80,000`],
             ["Emergency", "No Alerts"],
           ].map(([t, v]) => (
             <Card key={t}>
               <CardDash className="p-2 grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <p className=" m-0 p-0 text-muted-foreground text-xs">{t}</p>
                    <p className="text-xl font-bold">{v}</p>
                  </div>
                  <div className="flex items-center justify-center p-2">
                    {t === "Total Staff" && <Users className="h-8 w-8 text-blue-500" />}
                    {t === "Total Income" && <BanknoteArrowUp className="h-8 w-8 text-green-500" />}
                    {t === "Total Expenses" && <BanknoteArrowDown className="h-8 w-8 text-red-500" />}
                    {t === "Emergency" && <Siren className="h-8 w-8 text-yellow-500" />}
                  </div>
                 
               </CardDash>
             </Card>
           ))}
         </div>

         {/*  CARDS */}
         <div className="grid grid-cols-1 md:grid-cols-2 my-4 p-4 gap-4">
             
                  <div className="shadow-xl p-4">
                    <p className=" m-0 p-0 text-muted-foreground font-bold text-lg">Monthly Staff Overview</p>
                    
                      <div class="max-w-sm w-full bg-neutral-primary-soft p-2 md:p-6">
                        <div class="flex justify-between mb-1 border-b border-light">
                          <div class="flex items-center">
                            <div class="w-12 h-12 bg-neutral-primary-medium border border-default-medium flex items-center justify-center rounded-full me-3">
                              <svg class="w-7 h-7 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/></svg>
                            </div>
                            <div>
                              <h5 class="text-2xl m-0 font-semibold text-heading">3.4k</h5>
                              <p class="text-sm text-body">Leads generated per week</p>
                            </div>
                          </div>
                          <div>
                            <span class="inline-flex items-center bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium px-1.5 py-0.5 rounded">
                              <svg class="w-4 h-4 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/></svg>
                              42.5%
                            </span>
                          </div>
                        </div>

                        <div class="grid grid-cols-2">
                          <dl class="flex items-center ">
                              <dt class="text-body text-sm font-normal me-1">Money spent:</dt>
                              <dt class="text-heading  text-sm font-semibold">$3,232</dt>
                          </dl>
                          <dl class="flex items-center justify-end">
                              <dt class="text-body text-sm font-normal me-1">Conversion:</dt>
                              <dt class="text-heading text-sm font-semibold">1.2%</dt>
                          </dl>
                        </div>
                        <ColumnChart />
                        <div class="grid grid-cols-1 items-center border-light border-t justify-between">
                          <div class="flex justify-between items-center pt-4 md:pt-6">
                            <button id="dropdownLastDaysButton" data-dropdown-toggle="LastDaysdropdown" data-dropdown-placement="bottom" class="text-sm font-medium text-body hover:text-heading text-center inline-flex items-center" type="button">
                                Last 7 days
                                <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                            </button>
                            <div id="LastDaysdropdown" class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                                <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownLastDaysButton">
                                  <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Yesterday</a>
                                  </li>
                                  <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Today</a>
                                  </li>
                                  <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 7 days</a>
                                  </li>
                                  <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 30 days</a>
                                  </li>
                                  <li>
                                    <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 90 days</a>
                                  </li>
                                </ul>
                            </div>
                            <a href="#" class="inline-flex items-center text-fg-brand bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                              Leads Report
                              <svg class="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                            </a>
                          </div>
                        </div>
                      </div>

                  </div>
                  
                  <div className="shadow-xl p-4">
                    <p className=" m-0 p-0 text-muted-foreground font-bold text-lg">Monthly Staff Overview</p>

                  <div class="max-w-sm w-full bg-neutral-primary-soft p-4 md:p-6">
                    <div class="flex justify-between items-start">
                      <div>
                        <h5 class="text-2xl font-semibold text-heading">32.4k</h5>
                        <p class="text-body">Users this week</p>
                      </div>
                      <div class="flex items-center px-2.5 py-0.5 font-medium text-fg-success text-center">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/></svg>
                        12%
                      </div>
                    </div>
                    <ClicksLineChart/>
                    <div class="grid grid-cols-1 items-center border-light border-t justify-between">
                      <div class="flex justify-between items-center pt-4 md:pt-6">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="lastDaysdropdown" data-dropdown-placement="bottom" class="text-sm font-medium text-body hover:text-heading text-center inline-flex items-center" type="button">
                            Last 7 days
                            <svg class="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
                        </button>
                        <div id="lastDaysdropdown" class="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
                            <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                              <li>
                                <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Yesterday</a>
                              </li>
                              <li>
                                <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Today</a>
                              </li>
                              <li>
                                <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 7 days</a>
                              </li>
                              <li>
                                <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 30 days</a>
                              </li>
                              <li>
                                <a href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">Last 90 days</a>
                              </li>
                            </ul>
                        </div>
                        <a href="#" class="inline-flex items-center text-fg-brand bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                          Users Report
                          <svg class="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  </div>


         </div>
  </div>
);
export default Dashboard;
