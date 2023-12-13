// import * as React from "react";
// import {NextUIProvider} from "@nextui-org/react";
// function Sidebar() {
//     return (
//             <div className="flex">
//                 <div className={'w-72 h-screen bg-blue-600'}>
//                     <ul className="flex-1">
//                         <li className="text-white text-center text-3xl m-5 ">Projects</li>
//                         <li className="text-white text-center text-3xl m-5 ">New Project</li>
//                         <li className="text-white text-center text-3xl m-5 ">Add Doc</li>
//                         <li className="text-white text-center text-3xl m-5 " onClick={router}>Members</li>    
//                     </ul>
//                 </div>
//             </div>
//     );
// }
// function router(){

// }
// export default Sidebar;
import Quill from 'quill';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
function SideBar(){
  document.getElementById('editor').style.height = "auto";
  // const quill = new Quill(document.getElementById('editor'), {
  //   modules: {
  //     cursors: true,
  //     toolbar: [
  //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   ['blockquote', 'code-block','image'],
  
  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  //   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction
  
  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],
  
  //   ['clean']    
  //     ],
  //     history: {
  //       // Local undo shouldn't undo changes
  //       // from remote users
  //       userOnly: true
  //     }
  //   },
  //   placeholder: 'Start collaborating...',
  //   theme: 'snow' // 'bubble' is also great
  // })
  
    return(<div className='h-full min-h-screen w-64 bg-blue-600'>
<Sidebar backgroundColor='rgb(37 99 235' width='257px'>
  <Menu
  menuItemStyles={{
    button: ({ level, active, disabled }) => {
      // only apply styles on first level elements of the tree
      if (level === 0)
        return {
          color:'#ffffff',
          backgroundColor:'rgb(37 99 235)',
        };
    },
  }}>
    <MenuItem>Projects</MenuItem>
    <MenuItem>New Project</MenuItem>
    <MenuItem>Add Document</MenuItem>
  </Menu>
</Sidebar>
</div>
);
}
export default SideBar;