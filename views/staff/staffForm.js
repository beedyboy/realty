import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
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
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useMobxStores } from "../../stores/stores";
const schema = {
  fullname: {
    isEmpty: false,
    min: 2,
    message: "A valid fullname is required",
  },
  role: {
    isEmpty: false,
    message: "You must choose a role",
  },
  username: {
    isEmpty: false,
    min: 6,
    message: "A valid username is required",
  },
  password: {
    isEmpty: false,
    message: "Password is invalid",
  },
  email: {
    min: 8,
    max: 50,
    email: true,
    message: "Email is not valid",
  },
};

const StaffForm = ({ isOpen, onClose, mode, initial_data }) => {
  const { staffStore } = useMobxStores();
  const [show, setShow] = useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      _id: "",
      fullname: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
    touched: {},
    errors: {},
  });
  const {
    emailExist,
    confirmEmail,
    sending,
    close,
    toggleClose,
    createStaff,
  } = staffStore;

  useLayoutEffect(() => {
    let shouldSet = typeof initial_data !== "undefined" ? true : false;
    if (shouldSet) {
      const data = initial_data && initial_data._id;
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          _id: data && initial_data._id,
          fullname: data && initial_data.fullname,
          email: data && initial_data.email,
          role: data && initial_data.role,
        },
      }));
    }
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    const fullname = errors.fullname && errors.fullname.error;
    const password = errors.password && errors.password.error;
    const email = errors.email && errors.email.error;
    const role = errors.role && errors.role.error;
    if (mode === "Add") {
      setFormState((formState) => ({
        ...formState,
        isValid:
          fullname || password || email || role || emailExist ? false : true,
        errors: errors || {},
      }));
    } else {
      setFormState((formState) => ({
        ...formState,
        isValid:
          errors.fullname.error || errors.email.error || errors.role.error
            ? false
            : true,
        errors: errors || {},
      }));
    }
  }, [formState.values, emailExist, mode]);

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
    if (event.target.name === "email" && event.target.value !== "") {
      const data = event.target.value;
      confirmEmail(data);
    }
  };
  const resetForm = (e) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        _id: "",
        fullname: "",
        email: "",
        password: "",
        role: "",
      },
      touched: {
        ...formState.touched,
        name: false,
        fullname: false,
        email: false,
        password: false,
        role: false,
      },
    }));

    // handleMode('Add');
  };
const togglePassword = () => setShow(!show);
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      mode === "Add"
        ? createStaff(formState.values)
        : updateStaff(formState.values);
    }
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create staff account</ModalHeader>
          <ModalCloseButton />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isInvalid={hasError("fullname")}>
                <FormLabel>First name</FormLabel>
                <Input
                  value={formState.values.fullname || ""}
                  name="fullname"
                  id="fullname"
                  onChange={handleChange}
                  placeholder="First name"
                />
                <FormErrorMessage>
                  {hasError("fullname")
                    ? formState.errors.fullname &&
                      formState.errors.fullname.message
                    : null}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select option"
                  value={formState.values.role || ""}
                  name="role"
                  id="role"
                  onChange={handleChange}
                >
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>email</FormLabel>
                <Input
                  disabled={mode === "Add" ? false : true}
                  value={formState.values.email || ""}
                  name="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        value={formState.values.password || ""}
        name="password"
        id="password"
        onChange={handleChange}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={togglePassword}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
                
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                disabled={!formState.isValid || sending}
                isLoading={sending}
                type="submit"
              >
                {sending ? (
                  <span>
                    {" "}
                    Saving data <i className="fa fa-spinner"></i>
                  </span>
                ) : (
                  "Save changes"
                )}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default observer(StaffForm);
