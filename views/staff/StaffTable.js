import React, { useMemo } from "react";
import styles from "./StaffTable.module.css";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import Table from "../../components/Table";

const StaffTable = ({ users, setMode, removeData, rowData, toggle }) => {
  const columns = useMemo(() => [
    {
      name: "Fullname",
      sortable: true,
      selector: "fullname",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Flex justify="space-between" align="space-between">
        <IconButton
            size="sm"
            aria-label="Edit Staff"
            m="0.2rem"
            icon={<MdEdit />}
            colorScheme="yellow"
            onClick={(e) => editData(e, row)}
         />

          <IconButton
          icon={<MdDelete />}
            size="sm"
             m="0.2rem"
            aria-label="Delete Staff"
            colorScheme="red"
            onClick={(e) => {
              if (window.confirm("Delete this staff?")) {
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
  
  //     Cell: ({ row: { _id } }) => <IconButton colorScheme="info">Edit</IconButton>,
 

  return <Table columns={columns} data={users} />;
};
export default StaffTable;
