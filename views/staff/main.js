import   React from "react";
import {
  Box,
  Text,
  Heading,
  Flex, 
  Button,
  useDisclosure
} from "@chakra-ui/react"; 
import StaffForm from "./staffForm";
import { useMobxStores } from "../../stores/stores"; 
import { observer } from "mobx-react"
import StaffTable from "./StaffTable";

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const {staffStore} = useMobxStores(); 
  const { getStaff, users, info, removeData } = staffStore;   
  const [mode, setMode] = React.useState('');
  const [rowData, setRowData] = React.useState();  
  React.useEffect(() => {
   getStaff()   
 }, []) 
 
 const createStaff = () => {
  onOpen(true); 
  setMode('Add'); 
}  

  return (
    <>
      <Flex justifyContent="space-between">
        <Heading as="h5">Staff Management</Heading>
        <Button variantColor="teal" onClick={createStaff} px="1rem">
          Add Staff
        </Button>
      </Flex>
      <Flex
        direction="column"
        shadow="2px red"
        justifyContent="space-between"
        borderWidth="1px"
        py="2rem"
      >
      {/* <Text>Found {users.length} users</Text>    
      <SearchInput placeholder="Filter by Name, Position or Email" /> */}
      <StaffTable users={users} setMode={setMode} rowData={setRowData} toggle={onOpen}  removeData={removeData} />
     </Flex>
      {/* <StaffForm isOpen={open} onClose={toggleModal} /> */}
      <StaffForm  mode={mode} initial_data={rowData}  isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default observer(Main);
