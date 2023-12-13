import React,{useEffect, useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent, Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { gettoken,getemail,openproject,createproject ,getowner,middletoken, getrole,createdocument, opendocument, deleteproject,logout,createrole, searchproject, searchdocument, deletedocument, removemember} from "../../store.js";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import {Card, CardBody} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import { Quill } from "react-quill";
import Editor from "./editor.js";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

export default function NavBar() {
  const searchParams = new URLSearchParams(window.location.search);
  const sendmail = searchParams.get("email")
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const semail = useSelector(state => state.email)
  const stoken = useSelector(state => state.token)
  const spname = useSelector(state => state.pname)
  const sdname = useSelector(state => state.dname)
  const sowner = useSelector(state => state.owname)
  const sprojectid = useSelector(state => state.projectid)
  const sdocid = useSelector(state=> state.docid)
  const rows = useSelector(state => state.rows)
  const columns = useSelector(state => state.columns)
  const [project,setproject] = useState('project 1');
  const [doc,setdoc] = useState('doc 1');
  const [owner,setowner] = useState();
  const [rolemaker , setrole] = useState('R');
  const [columnmaker, setcolumn] = useState('P');
  const [squery , setquery] = useState('');
  const [memmail,setmember] = useState('');
  
    // document.getElementById('editor').style.height = "au
    useEffect(()=>{
      dispatch(getemail(sendmail));
      dispatch(gettoken(sendmail));
    },[]
    )
    const handleopenproject = () => {
      dispatch(getowner())

      console.log(project)
      console.log(owner)
      console.log(stoken)
      dispatch(openproject({pname:project,user:owner,token:stoken}))
      if(project != ''){
        dispatch(getrole({project:sprojectid,token:stoken}))
      }
      // dispatch(getrole({project:sprojectid,token:stoken}))
    }
    const handlecreateproject = () => {
      console.log(project)
      console.log(semail)
      console.log(stoken)
      
      dispatch(createproject({pname:project,user:semail,token:stoken}))
    }

    const handlecreatedocument = () => {
      if(semail == sowner){
      dispatch(createdocument({docname:doc , project:sprojectid, token:stoken}))}
      else{
        window.alert("Not Allowed")
      }
    }
    const handleopendocument =() =>{
      dispatch(opendocument({docname:doc , project:sprojectid , token:stoken}))
    }
    const handledeleteproject=() => {
      if(semail == sowner){
      dispatch(deleteproject({project:sprojectid , token:stoken}))}
      else{
        window.alert("Not Allowed")
      }
    }
    const handledeletedocument=() => {
      if(semail == sowner){
        dispatch(deletedocument({document:sdocid , token:stoken}))}
        else{
          window.alert("Not Allowed")
        }
    }
    const handlelogout = () => {
      dispatch(logout());
      navigate("../login")
    }
    const handlecreaterole = () => {
      if(semail == sowner){
      dispatch(createrole({project:sprojectid , token:stoken , user:memmail , role:rolemaker}));}
      else
      {
        window.alert("Not Allowed");
      }
    }

    const handleremovemember = () => {
      if(semail == sowner){
        dispatch(removemember({project:sprojectid , token:stoken , user:memmail}));}
        else
        {
          window.alert("Not Allowed");
        }
    }
    const handlesearch = () => {
      if(columnmaker === 'P'){
      dispatch(searchproject({searchquery:squery , token:stoken}))
      }
      else{
        dispatch(searchdocument({searchquery:squery , token:stoken}))
      }
    }

  return (
    <>
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">DOTION</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Project
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {project} onChange={(e) => setproject(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Button onClick={handlecreateproject}>Create Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="copy" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Open Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {project} onChange={(e) => setproject(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Input value = {owner} onChange={(e) => setowner(e.target.value)}  label="Owner email" size="sm" variant="bordered" />
              <Button onClick={handleopenproject}>Open Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
        <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="danger">Delete Project</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div>Confirm to delete this project</div>
              <Button onClick={handledeleteproject}>Delete Project</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Documents
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Document Name" size="sm" variant="bordered" />
              <Button onClick={handlecreatedocument}> Create Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="copy" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Open Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Project Name" size="sm" variant="bordered" />
              <Button onClick={handleopendocument}>Open Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
        <Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="danger">Delete Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <div>Confirm to delete document</div>
              {/* <Input value = {doc} onChange={(e) => setdoc(e.target.value)} label="Document Name" size="sm" variant="bordered" /> */}
              <Button onClick={handledeletedocument}>Delete Document</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown closeOnSelect = {false} >
      <DropdownTrigger>
        <Button 
          variant="ghost" >
          Members
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new" color="primary"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="primary">Add Members</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input label="Member email" size="sm" variant="bordered"  value={memmail} onChange={(e) => setmember(e.target.value)}/>
              <Select
      isRequired
      label="Role"
      placeholder="Select a role"
      defaultSelectedKeys= "Read"
      className="max-w-xs"
      value={rolemaker} onChange={(e) => setrole(e.target.value)}
    >
        <SelectItem key="E"  value="E">
          Edit
        </SelectItem>
        <SelectItem key="R"  value="R">
          Read
        </SelectItem>
    </Select>
              <Button onClick={handlecreaterole}>Add Member</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
    <DropdownItem key="roleremove" color="danger"><Popover placement="bottom" showArrow offset={10}>
      <PopoverTrigger>
        <Button className="w-44" color="danger">Remove Member</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input label="Member email" size="sm" variant="bordered" value={memmail} onChange={(e) => setmember(e.target.value)}/>
              <Button onClick={handleremovemember}>Remove</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover></DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Button variant="ghost" onPress={onOpen}>Search</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Search Items</ModalHeader>
              <ModalBody>
                <div className="flex justify-between gap-6">
                <Input placeholder="Enter name" size="lg" value={squery} onChange={(e) => {setquery(e.target.value)}}></Input>
                <Select
                size="sm"
      isRequired
      label="Search On"
      placeholder="Select what u want to search"
      defaultSelectedKeys= "P"
      className="max-w-xs"
      value={columnmaker} onChange={(e) => {setcolumn(e.target.value);}}
    >
        <SelectItem key="P"  value="P">
          Project
        </SelectItem>
        <SelectItem key="D"  value="D">
          Document
        </SelectItem>
    </Select>
    </div>
    <div className="flex justify-end gap-6">
    <Button color="danger" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handlesearch}>
                  Search
                </Button>
    </div>
              </ModalBody>
              <ModalFooter>
                <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent="No Results Found">
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={handlelogout} color="primary" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div><Card>
      <CardBody>
        <p className="flex justify-center items-center">Project:   <Textarea
        isReadOnly
        maxRows={1}
      value={spname}
    /></p>
    <p className="flex justify-center items-center">Document: <Textarea
        isReadOnly
        maxRows={1}
      value={sdname}
    /></p>
      </CardBody>
    </Card></div>
    <Editor></Editor>
    </>
    
  );
}