import React, { useEffect, useLayoutEffect, useState } from "react";
import dataHero from "data-hero";
import { observer } from "mobx-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input, 
  Text, 
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from "@chakra-ui/react";
import { useMobxStores } from "../../../stores/stores";
import { MdImage } from 'react-icons/md'
const schema = {
  title: {
    isEmpty: false,
    min: 2,
    message: "A valid title is required",
  },
  numOfBathRooms: {
    isEmpty: false,
    message: "This field is important",
  },
  numOfBedRooms: {
    isEmpty: false,
    message: "A valid number is required",
  },
  province: {
    isEmpty: false,
    message: "Invalid province",
  },
  city: {
    isEmpty: false,
    message: "Please select a city",
  },
};
import location from '../../../ng.json';
const HouseForm = ({ isOpen, onClose, mode, initial_data }) => {
  const { productStore } = useMobxStores();
  const [showSuggestions  , setShowSuggestions] = useState(false);
  const [suggestions , setSuggestions] = useState([]);
  const [uploadImage, setUploadImage] = useState('');
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: "",
      title: "",
      numOfBedRooms: "",
      city: "",
      province: "",
      category: "house",
      price: "",
      numOfBathRooms: "",
      propertyType: "",
      isSaleOrRent: "",
      numOfGarages: "",
      petsAllowed: "",
      furnished: "",
      serviced: "",
      shared: "",
      description: "",
    },
    touched: {},
    errors: {},
  });
  const { 
    sending,
    close,
    toggleClose,
    saveHouse,
  } = productStore;

  useLayoutEffect(() => {
    let shouldSet = typeof initial_data !== "undefined" ? true : false;
    if (shouldSet) {
      const data = initial_data && initial_data._id;
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          _id: data && initial_data._id,
          title: data && initial_data.title,
          city: data && initial_data.city,
          numOfBathRooms: data && initial_data.numOfBathRooms,
        },
      }));
    }
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    const title = errors.title && errors.title.error;
    const province = errors.province && errors.province.error;
    const city = errors.city && errors.city.error;
    const numOfBathRooms = errors.numOfBathRooms && errors.numOfBathRooms.error;
    if (mode === "Add") {
      setFormState((formState) => ({
        ...formState,
        isValid:
          title || province || city || numOfBathRooms || city ? false : true,
        errors: errors || {},
      }));
    } else {
      setFormState((formState) => ({
        ...formState,
        isValid:
          errors.title.error || errors.city.error || errors.numOfBathRooms.error
            ? false
            : true,
        errors: errors || {},
      }));
    }
  }, [formState.values, mode]);

  useEffect(() => {
    if (close === true) {
      resetForm();
      onClose();
    }
    return () => {
      toggleClose();
    };
  }, [close]);
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
    if (event.target.name === "city" && event.target.value !== "" && event.target.value.length > 2) {
      const data = event.target.value;
      filterLocation(data);
      setShowSuggestions(true);
    }
  };
    const handleRadio = (value, field) => { 
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [field]:value,
      },
      touched: {
        ...formState.touched,
        [field]: true,
      },
    }));
    
  };
  const readURI = (e) => {
    if (e.target.files) { 
        /* Get files in array form */
        const files = Array.from(e.target.files); 
        console.log(files)
        setUploadImage(files)
        /* Map each file to a promise that resolves to an array of image URI's */ 
        // Promise.all(files.map(file => {
        //     return (new Promise((resolve,reject) => {
        //         const reader = new FileReader();
        //         reader.addEventListener('load', (ev) => {
        //             resolve(ev.target.result);
        //         });
        //         reader.addEventListener('error', reject);
        //         reader.readAsDataURL(file);
        //     }));
        // }))
        // .then(images => { 
        //     /* Once all promises are resolved, update state with image URI array */
        //     setImageArray( images )
        //     setUploadImage(files)

        // }, error => {        
        //     console.error(error);
        // });
    }
}
  const filterLocation = (value) => {
    let result = location.filter(d => d.city.toLowerCase().includes(value.toLowerCase()) ||  d.admin_name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(result);
  }
 const suggestionSelected = (suggestion)=>{ 
  setFormState((formState) => ({
    ...formState,
    values: { 
      ...formState.values,
      city: suggestion.city,
      province: suggestion.admin_name, 
    },
    touched: {
      ...formState.touched, 
      city: true,
      province: true, 
    },
  }));
  setSuggestions([]);
  setShowSuggestions(false);
  }
  
 const renderSuggestions = () => {  
    if (suggestions.length === 0) {
      return null;
    } else if (showSuggestions  && suggestions.length === 0) {
      return <em>No suggestions!</em>;
    }
    return (
      <ul>
        {suggestions.slice(0, 6).map(suggestion => <li key={suggestion.city} onClick={e => suggestionSelected(suggestion)}>{suggestion.city}</li>)}
      </ul>
    )
  }
  const resetForm = (e) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: "",
        title: "",
        numOfBedRooms: "",
        city: "",
        province: "",
        category: "house",
        price: "",
        numOfBathRooms: "",
        propertyType: "",
        isSaleOrRent: "",
        numOfGarages: "",
        petsAllowed: "",
        furnished: "",
        serviced: "",
        shared: "",
        description: "",
      },
      touched: {
        ...formState.touched,
        price: false,
        title: false,
        city: false,
        province: false,
        numOfBathRooms: false,
        propertyType: false,
        isSaleOrRent: false,
        numOfGarages: false,
        petsAllowed: false,
        furnished: false,
        serviced: false,
        shared: false,
        description: "",
      },
    }));
 
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();   
    for(var x = 0; x < uploadImage.length; x++) { 
    fd.append('image', uploadImage[x]);
    }
 
    fd.append('city', formState.values.city); 
    fd.append('province', formState.values.province);
    fd.append('price', formState.values.price); 
    fd.append('propertyType', formState.values.propertyType);
    fd.append('isSaleOrRent', formState.values.isSaleOrRent); 
    fd.append('numOfBedRooms', formState.values.numOfBedRooms); 
    fd.append('numOfBathRooms', formState.values.numOfBathRooms); 
    fd.append('numOfGarages', formState.values.numOfGarages); 
    fd.append('petsAllowed', formState.values.petsAllowed); 
    fd.append('furnished', formState.values.furnished); 
    fd.append('category', formState.values.category);  
    fd.append('serviced', formState.values.serviced); 
    fd.append('shared', formState.values.shared); 
    fd.append('title', formState.values.title); 
    fd.append('description', formState.values.description);
     
    saveHouse(fd); 
  }

  
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{mode === "Add"? 'Create': 'Edit'} house</ModalHeader>
          <ModalCloseButton />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isInvalid={hasError("title")}>
                <FormLabel>Title</FormLabel>
                <Input
                  value={formState.values.title || ""}
                  name="title"
                  id="title"
                  onChange={handleChange}
                  placeholder="Title"
                />
                <FormErrorMessage>
                  {hasError("title")
                    ? formState.errors.title && formState.errors.title.message
                    : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Sell or Rent</FormLabel>
                <RadioGroup
                name="isSaleOrRent"
                onChange={(value) => handleRadio(value, 'isSaleOrRent')}
                  value={formState.values.isSaleOrRent}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="sale">Sell</Radio>
                    <Radio value="rent">Rent</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Flex justifyContent="space-between">
                <FormControl mt={4}>
                  <FormLabel>Bathrooms</FormLabel>
                  <NumberInput
                    size="sm"
                    min={1}
                    onChange={(value) => handleRadio(value, 'numOfBathRooms')}
                    value={formState.values.numOfBathRooms}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Bedrooms</FormLabel>
                  <NumberInput
                    size="sm"
                    min={1}
                    onChange={(value) => handleRadio(value, 'numOfBedRooms')}
                    value={formState.values.numOfBedRooms}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Garages</FormLabel>
                  <NumberInput
                    size="sm"
                    min={1}
                    onChange={(value) => handleRadio(value, 'numOfGarages')}
                    value={formState.values.numOfGarages}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>
              

              <FormControl mt={4}>
                <FormLabel>Property Type</FormLabel>
                <RadioGroup
                name="propertyType"
                onChange={(value) => handleRadio(value, 'propertyType')}
                  value={formState.values.propertyType}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="flat">Flat</Radio>
                    <Radio value="bungalow">Bungalow</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Flex justifyContent="space-between">
                
              <FormControl mt={4}>
                <FormLabel>Furnished</FormLabel>
                <RadioGroup
                name="furnished"
                  onChange={(value) => handleRadio(value, 'furnished')}
                  value={formState.values.furnished}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="no">No</Radio>
                    <Radio value="yes">Yes</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Serviced</FormLabel>
                <RadioGroup
                name="serviced"
                onChange={(value) => handleRadio(value, 'serviced')}
                  value={formState.values.serviced}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="no">No</Radio>
                    <Radio value="yes">Yes</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              </Flex>

              <Flex justifyContent="space-between">
                
              <FormControl mt={4}>
                <FormLabel>Shared</FormLabel>
                <RadioGroup
                name="shared"
                  onChange={(value) => handleRadio(value, 'shared')}
                  value={formState.values.shared}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="no">No</Radio>
                    <Radio value="yes">Yes</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Pets Allowed</FormLabel>
                <RadioGroup
                name="petsAllowed"
                onChange={(value) => handleRadio(value, 'petsAllowed')}
                  value={formState.values.petsAllowed}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="no">No</Radio>
                    <Radio value="yes">Yes</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              </Flex>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  value={formState.values.price || ""}
                  name="price"
                  id="price"
                  onChange={handleChange}
                  placeholder="Price"
                />
              </FormControl>
           

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="textarea"
                  value={formState.values.description || ""}
                  name="description"
                  id="description"
                  onChange={handleChange}
                  placeholder="Provide description"
                />
              </FormControl>
           
              <FormControl mt={4} className="TypeAheadDropDown">
                <FormLabel>City</FormLabel>
                <Input
                  disabled={mode === "Add" ? false : true}
                  value={formState.values.city || ""}
                  name="city"
                  id="city"
                  onChange={handleChange}
                  placeholder="City"
                />
                {renderSuggestions()}
              </FormControl>
 
 
               
              <Flex
								border="2px dotted #888"
								mb={4}
                py={2}
                mt={4} 
								position="relative"
								flexDir="column"
								align="center"
								justify="center"
							>
								<Input
									cursor="pointer"
									position="absolute"
                  _focus={{ outline: "none" }}
                  multiple
                  name="main"
                  id="main"
                  onChange={(e)=> readURI(e)}
									isRequired
									mb={["1.5rem"]}
									type="file" 
									aria-describedby="main"
									accept="image/*"
									opacity={0}
									width="100%"
									visibility="none"
									top={0}
									left={0}
								/>
								<Flex align="center" justify="center">
									<MdImage size="2rem" />
									<Text ml="1rem" fontWeight="bold">
										{" "}
										{uploadImage.length > 0 ? 'Image has been added' : "Upload Your images"}
									</Text>
								</Flex>
							</Flex>

 
 </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                disabled={!formState.isValid || sending}
                isLoading={sending}
                type="submit"
              > Saving data 
                 
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(HouseForm);
