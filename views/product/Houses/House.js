import   React from "react";
import { 
  Box,
  Text,
  Heading,
  Flex, 
  Button,
  useDisclosure
} from "@chakra-ui/react";   
import { observer } from "mobx-react" 
import { useMobxStores } from "../../../stores/stores";
import HouseList from "./HouseList";
import HouseForm from "./HouseForm";

const House = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const {productStore} = useMobxStores(); 
  const { getHouses, houses } = productStore;   
  const [mode, setMode] = React.useState('');
  const [rowData, setRowData] = React.useState();   
  React.useEffect(() => {
    getHouses()   
 }, []) 
 
 const createProduct = () => {
  onOpen(true); 
  setMode('Add'); 
}  

  return (
    <>
     <Flex justifyContent="space-between">
        <Heading as="h5">House Management</Heading>
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
      
      <HouseList houses={houses} setMode={setMode} rowData={setRowData} toggle={onOpen} />
     </Flex>
        <HouseForm  mode={mode} initial_data={rowData}  isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default observer(House);
