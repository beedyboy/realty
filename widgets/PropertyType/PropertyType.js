import { FormControl, FormLabel, RadioGroup, Radio, Stack } from '@chakra-ui/react'
import React from 'react'

const PropertyType = ({check, data}) => {
    return (
        <>
              <FormControl mt={4}>
                <FormLabel>Property Type</FormLabel>
                <RadioGroup
                name="propertyType"
                onChange={(value) => check(value, 'propertyType')}
                  value={data}
                >
                  <Stack spacing={4} direction="row">
                    <Radio value="flat">Flat</Radio>
                    <Radio value="bungalow">Bungalow</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
        </>
    )
}

export default PropertyType
