import   React from "react";
import {  
  Heading,
  Flex, 
  Button,
  useDisclosure
} from "@chakra-ui/react";   
import { observer } from "mobx-react" 
import { useMobxStores } from "../../../stores/stores";
import LandList from "./LandList";
import LandForm from "./LandForm";

const Land = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const {productStore} = useMobxStores(); 
  const { getLands, lands } = productStore;   
  const [mode, setMode] = React.useState('');
  const [rowData, setRowData] = React.useState();   
  React.useEffect(() => {
    getLands()   
 }, []) 
 
 const createProduct = () => {
  onOpen(true); 
  setMode('Add'); 
}  

  return (
    <>
     <Flex justifyContent="space-between">
        <Heading as="h5">Land Management</Heading>
        <Button colorScheme="teal" onClick={createProduct} px="1rem">
          Add Product
        </Button>
      </Flex>
      <Flex
        direction="column"
        shadow="2px red"
        justifyContent="space-between"
        borderWidth="1px"
        py="2rem"
      >
      
      <LandList lands={lands} setMode={setMode} rowData={setRowData} toggle={onOpen} />
     </Flex>
        <LandForm  mode={mode} initial_data={rowData}  isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default observer(Land);
