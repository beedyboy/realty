import React, { useMemo } from "react"; 
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import Table from "../../../components/Table";

const HouseList = ({ houses, setMode, removeData, rowData, toggle }) => {
  const columns = useMemo(() => [
    {
      name: "Title",
      sortable: true,
      selector: "title",
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Actions", 
      cell: (row) => (
        <Flex justify="space-between" align="space-between">
          <IconButton
            size="sm"
            aria-label="Edit House"
            m="0.2rem"
            icon={<MdEdit />}
            colorScheme="yellow"
            onClick={(e) => editData(e, row)}
          /> {" "}

          <IconButton
            size="sm"
            aria-label="Delete House"
            colorScheme="red"
            m="0.2rem"
            icon={<MdDelete />}
            onClick={(e) => {
              if (window.confirm("Delete this house?")) {
                deleteData(e, row._id);
              }
            }}
         />
        </Flex>
      ),
    },
  ]);
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };

  const deleteData = (e, id) => {
    removeData(id);
  };
   

  return <Table columns={columns} data={houses} />;
};
export default HouseList;
