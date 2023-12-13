import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { input } from '@nextui-org/react';
import { data } from 'autoprefixer';
axios.defaults.headers.common['Content-type'] = `application/json; charset=UTF-8`;
export const gettoken = createAsyncThunk('counterSlice/token',async(username) => {
  try {
    let password = "123"
    const res = await axios.post('http://127.0.0.1:8000/docapp/token/', {username,password})
    console.log(res)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const createproject = createAsyncThunk('counterSlice/createproject', async({pname,user,token}) => {
  try {
    console.log({pname,user,token})
    const res = await axios.post('http://127.0.0.1:8000/docapp/start/project/', {pname,user}, {
      headers:{'Authorization': token , }
    } )
    console.log(res.data)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const deleteproject = createAsyncThunk('counterSlice/deleteproject', async({project,token}) => {
  try {
    const res = await axios.delete('http://127.0.0.1:8000/docapp/start/project/' + project + "/", {headers:{'Authorization': token+""}} )
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const deletedocument = createAsyncThunk('counterSlice/deletedocument', async({document,token}) => {
  try {
    const res = await axios.delete('http://127.0.0.1:8000/docapp/start/document/' + document + "/", {headers:{'Authorization': token+""}} )
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const openproject = createAsyncThunk('counterSlice/openproject',async({pname,user,token})=>{
  try{
    console.log({pname,user,token})
    let s = token + ""
    const res = await axios.get('http://127.0.0.1:8000/docapp/project/',{params: {pname,user}} , {headers: {'Authorization': s,}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const opendocument = createAsyncThunk('counterSlice/opendocument',async({docname,project,token})=>{
  try{
    console.log({docname,project,token})
    const res = await axios.get('http://127.0.0.1:8000/docapp/docs/',{params:{docname,project}}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const updatedocument = createAsyncThunk('counterSlice/updatedocument',async({docid,text,delta})=>{
  try{
    console.log(text)
    const res = await axios.patch('http://127.0.0.1:8000/docapp/start/document/'+docid+'/',{delta,text})
    console.log(res)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const createdocument = createAsyncThunk('counterSlice/createdocument',async({docname,project,token})=>{
  try{
    const res = await axios.post('http://127.0.0.1:8000/docapp/start/document/',{"docname":docname , "project":[project] , "delta":"{}", "text":"{}"}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const getrole = createAsyncThunk('counterSlice/getrole',async({project,token})=>{
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/roles/',{params:{"project": project}}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const createrole = createAsyncThunk('counterSlice/createrole',async({project,user,role,token})=>{
  try{
    const res = await axios.post('http://127.0.0.1:8000/docapp/roles/',{"project": project , "user" : user, "role" : role}, {headers:{'Authorization': token}})
    console.log(res)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const searchproject = createAsyncThunk('counterSlice/searchproject' ,async({searchquery,token}) => {
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/projectsearch/',{params:{"searchquery": searchquery}}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const searchdocument = createAsyncThunk('counterSlice/searchdocument' ,async({searchquery,token}) => {
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/documentsearch/',{params:{"searchquery": searchquery}}, {headers:{'Authorization': token}})
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const removemember = createAsyncThunk('counterSlice/removemember', async({project,user}) =>{
  try{
    const res = await axios.post('http://127.0.0.1:8000/docapp/roledelete/',{"project": project , "user" : user})
    console.log(res)
    return res.data
  } catch(err){
    console.log(err)
  }
})

export const getallproject = createAsyncThunk('counterSlice/createAllProjects' , async() => {
  try{
    const res = await axios.get('http://127.0.0.1:8000/docapp/getallproject/')
    return res.data
  } catch(err){
    console.log(err)
  }
})

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
      email : "",
      token: "" ,
      docid : "",
      projectid:"",
      pname:"",
      owname:"",
      delta:"",
      dname:"",
      role:"",
      readonly : true,
      rows: [],
      columns: [{
        key: "proname",
        label: "Project Name",
      },
      {
        key: "ownname",
        label: "Owner Name",
      },],
      rows2 : [],
    },
    reducers: {
      logout: (state) => {
      state.email = "";
      state.token= "";
      state.docid = "";
      state.projectid="";
      state.pname="";
      state.owname="";
      state.delta="";
      state.dname="";
      state.role="";
      state.readonly = true;
      state.rows = [];
      state.columns = [{
        key: "proname",
        label: "Project Name",
      },
      {
        key: "ownname",
        label: "Owner Name",
      },];
      state.rows2 = [];
      },
      middletoken: (state) => {
        console.log(state.token)
      },
      getemail: (state,action) => {
        state.email = action.payload;
        console.log(state.email);
      },
      getowner: (state,action) => {
        state.owname = action.payload;
        console.log(state.owname);
      },
      },
    extraReducers: (builder) => {
      builder
      .addCase(gettoken.fulfilled, (state,action)  => {
        state.token = "Token " + action.payload.token;
        axios.defaults.headers.common['Authorization'] = state.token;
        console.log(state.token)
      })
      .addCase(gettoken.rejected, (state,action) => {
        window.alert("Not Registered");
      })
      .addCase(createproject.fulfilled , (state,action) => {
        state.projectid = action.payload.id
        state.pname = action.payload.pname
        state.owname = action.payload.user
        console.log(state.owname)
        state.role = "O"
      })
      .addCase(createproject.rejected , (state,action) => {
        window.alert("Unexpected error");
      })
      .addCase(openproject.fulfilled , (state,action) => {
        console.log(action.payload)
        state.projectid = action.payload.id
        state.pname = action.payload.pname
        state.owname = action.payload.user
      })
      .addCase(openproject.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(opendocument.fulfilled , (state,action) => {
          state.docid = action.payload.id;
          state.dname = action.payload.docname;
          state.delta = data.delta;
          if(state.role!="R"){
          state.readonly = false;}
          else{
          state.readonly=true;}
      })
      .addCase(opendocument.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(updatedocument.rejected , (state,action)=> {
        window.alert("Error");
      })
      .addCase(updatedocument.fulfilled , (state,action)=>{
        console.log(action.payload.data)
        console.log("Saved");
      })
      .addCase(getrole.fulfilled, (state,action) => {
        if(action.payload == undefined){
          state.role = "O"
        }
        else{
        state.role = action.payload.role;}
        console.log(state.role)
      })
      .addCase(createdocument.fulfilled , (state,action) => {
        state.docid = action.payload.id;
        state.dname = action.payload.docname;
        state.delta = "";
        if(state.role!="R"){
          state.readonly = false;}
          else{
          state.readonly=true;}
      })
      .addCase(createdocument.rejected , (state,action)=> {
        console.log("error");
      })
      .addCase(deleteproject.fulfilled , (state,action)=>{
        state.projectid = "";
        state.pname = "";
        state.docid = "";
        state.projectid="";
        state.pname="";
        state.owname="";
        state.delta="";
        state.dname="";
        state.role="";
        state.readonly = true;
        window.alert("Deleted Project")
      })
      .addCase(deletedocument.fulfilled , (state,action) => {
        state.docid = "";
        state.delta="";
        state.dname="";
        state.readonly = true;
        window.alert("Deleted Document")
      })
      .addCase(createrole.fulfilled , (state,action) => {
        window.alert("Role created Successfully")
      })
      .addCase(createrole.rejected , (state,action) =>{
        window.alert("Error Occurred")
      })
      .addCase(searchproject.fulfilled ,(state,action) => {
        state.rows = [];
        state.columns = [{
          key: "proname",
          label: "Project Name",
        },
        {
          key: "ownname",
          label: "Owner Name",
        },]
        if(action.payload != undefined){
        for (var i=0 ; i< action.payload.length; i++){
          var object = action.payload[i];
          var x= {key:i , proname:object.pname , ownname:object.user}
          state.rows.push(x)
        }}
      })
      .addCase(searchproject.rejected , (state,action) => {
        state.rows =[]
        state.columns = [{
          key: "proname",
          label: "Project Name",
        },
        {
          key: "ownname",
          label: "Owner Name",
        },]
      })
      .addCase(searchdocument.fulfilled ,(state,action) => {
        state.rows = [];
        state.columns=[{
          key: "docname",
          label: "Document Name",
        },
        {
          key: "proname",
          label: "Project Name",
        },
        {
          key: "ownname",
          label: "Owner Name",
        },
        {
          key:"text",
          label:"Document Content"
        }
      ]
        if(action.payload != undefined){
        state.rows = action.payload
        }
      })
      .addCase(searchdocument.rejected , (state,action) => {
        state.rows =[]
        state.columns=[{
          key: "docname",
          label: "Document Name",
        },
        {
          key: "proname",
          label: "Project Name",
        },
        {
          key: "ownname",
          label: "Owner Name",
        },
        {
          key:"text",
          label:"Document Content"
        }
      ]
      })
      .addCase(removemember.fulfilled , (state,action)=>{
        window.alert(action.payload)
      })
      .addCase(getallproject.fulfilled , (state,action) => {
        state.rows2 = []; 
        console.log(action.payload)
        if(action.payload != undefined){
          state.rows2 = action.payload
          }
      }).addCase(getallproject.rejected , (state,action) => {
        state.rows2 = [];
      })

    }
    }
  )
export const {getemail,getowner,middletoken,logout} = counterSlice.actions;
export const store = configureStore({
    reducer: counterSlice.reducer
  })








