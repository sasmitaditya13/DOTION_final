import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import {NextUIProvider} from "@nextui-org/react";
import Quill from 'quill';
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { gettoken,getemail } from "../../store.js";
import { Navigate, redirect, useNavigate } from "react-router-dom";
export default function Login() {
// const email = useSelector((state) => state.counter.email);
const dispatch = useDispatch();
  // document.getElementById('editor').style.height = "0px";
// const quill = new Quill(document.getElementById('editor'), {
//   modules: {
//     cursors: true,
//     toolbar: false,
//     history: {
//       // Local undo shouldn't undo changes
//       // from remote users
//       userOnly: true
//     }
//   },
//   placeholder: 'Start collaborating...',
//   theme: 'snow' // 'bubble' is also great
// })
const navigate = useNavigate();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [mail,setemail] = useState('');
  const [enrol,setenrol] = useState('');
  const handleclick = () => {
    console.log(mail);
    dispatch(getemail(mail));
    dispatch(gettoken(mail));
    navigate("../");
  };

  return (
    <div className="container flex-col place-content-center flex-grow-0">
      <div className="place-self-center mt-20" >welcome</div>
      <Button className= " " onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                value={mail}
                onChange={(e) => setemail(e.target.value)}
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                value={enrol}
                onChange={(e) => setenrol(e.target.value)}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Enrol"
                  placeholder="Enter your Enrollment number"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox> */}
                  {/* <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleclick}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
