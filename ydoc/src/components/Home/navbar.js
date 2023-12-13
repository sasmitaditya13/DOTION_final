import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function NavBar() {
    document.getElementById('editor').style.height = "auto";
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">DOTION</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Button color="blue">
            Projects
          </Button>
        </NavbarItem>
        <NavbarItem>
        <Button color="blue">
            Documents
          </Button>
        </NavbarItem>
        <NavbarItem>
        <Button color="blue">
            Members
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}