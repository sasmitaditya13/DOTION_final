import Quill from 'quill';
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors'
import { WebsocketProvider } from 'y-websocket'
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { gettoken,getemail,openproject,createproject ,getowner, updatedocument} from "../../store.js";
import { Button, Input } from '@nextui-org/react';
import { useEffect } from 'react';
export default function Editor() {
    const read = useSelector((state) => state.readonly)
    const room = useSelector((state) => state.docid)
    const name = useSelector((state) => state.email)
    Quill.register('modules/cursors', QuillCursors)
    const dispatch = useDispatch();
useEffect(() =>{
const quill = new Quill(document.getElementById('editor'), {
  modules: {
    cursors: true,
    toolbar: true,
    history: {
      // Local undo shouldn't undo changes
      // from remote user
      userOnly: true
    }
  },
  theme: 'snow'
})

// A Yjs document holds the shared 
console.log(read)
if(read == true)
{
  quill.disable()
}
else{
  quill.enable()
}
quill.on('text-change', function(delta,oldDelta,source){
  if(source == 'user'){
    var del = quill.getContents();
    var del2 = JSON.stringify(del);
    console.log(del2);
    var tex = quill.getText();
    dispatch(updatedocument({docid: room , text: tex , delta:del2}))
  }
});
const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:1234', room, ydoc)
const awareness = provider.awareness
provider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})
// Define a shared text type on the document
const ytext = ydoc.getText('quill')
// console.log(ytext.toDelta())
console.log(room)
// "Bind" the quill editor to a Yjs text type.
const binding = new QuillBinding(ytext, quill, provider.awareness)
// Remove the selection when the iframe is blurred
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: name
})
window.addEventListener('blur', () => { quill.blur()})},[room,read]);
// If you want to stat measuring performance in your app, pass a function
// to log result (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vital
return(<>
  <div id="editor"></div>
<Button variant= 'ghost' className='my-5 left-0'>Save document</Button>
</>
);
}