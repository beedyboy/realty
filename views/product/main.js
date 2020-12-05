import   React from "react";
import {
  Tabs, TabList, TabPanels, Tab, TabPanel 
} from "@chakra-ui/react";  
import House from "./Houses/House";
import Land from "./Lands/Land";

const Main = () => {
 
  return (
    <>
    <Tabs>
      <TabList>
        <Tab>Houses</Tab> 
        <Tab>Lands</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><House /></TabPanel>
        <TabPanel>
          <Land />
          </TabPanel> 
      </TabPanels>
    </Tabs>

      
      
    </>
  );
};

export default Main;
