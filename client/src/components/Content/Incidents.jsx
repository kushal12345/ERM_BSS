import React from 'react'
import { TabItem, Tabs } from "flowbite-react";
import { Label, Select } from "flowbite-react";

const Incidents = () => {

  return (
    <div className="w-full h-full p-5 pt-5 overflow-hidden bg-[#fff] dark:bg-[#212528] shadow-xl rounded-xl no-scrollbar">
       <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Incident Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor and manage security incidents across all client locations.
              </p>
            </div>
            
            <div className='flex  justify-between'>
              <div className='flex space-x-2'>
                <Tabs active title='Incidents' className="w-auto">
                  <TabItem title="All Incidents">
                    <div className="h-[80vh] overflow-y-auto no-scrollbar">
                      <p>All Incidents</p>
                    </div>
                  </TabItem>
                  <TabItem title="Open Incidents">
                    <div className="h-[80vh] overflow-y-auto no-scrollbar">
                      <p>Open Incidents</p>
                    </div>
                  </TabItem>
                  <TabItem title="Closed Incidents">
                    <div className="h-[80vh] overflow-y-auto no-scrollbar">
                      <p>Closed Incidents</p>
                    </div>
                  </TabItem>
                </Tabs>
              </div>

              <div className='flex space-x-2'>
                <div className="max-w-md">
                      
                      <Select id="countries" required>
                        <option>Filter by client</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>France</option>
                        <option>Germany</option>
                      </Select>
                </div> 
                <div className="max-w-md">
                      
                      <Select id="countries" required>
                        <option>Filter by severity</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>France</option>
                        <option>Germany</option>
                      </Select>
                </div>              
              </div>
            </div>
          </div>
    </div>
  )
}

export default Incidents