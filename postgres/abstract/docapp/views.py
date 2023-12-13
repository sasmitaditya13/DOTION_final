from django.shortcuts import render
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import User
from .serializers import UserSerializer
from rest_framework import mixins
from rest_framework import generics
from .models import Project
from .models import Project_role
from .models import Document
from .models import Document_role
from .serializers import UserSerializer
from .serializers import ProjectSerializer
from .serializers import ProjectRoleSerializer
from .serializers import DocumentSerializer
from .serializers import DocumentRoleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import JSONParser
from django.contrib.postgres.search import SearchVector
import json
from django.contrib.postgres.search import TrigramWordSimilarity

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [permissions.AllowAny]


class UserGetView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  def get(self,request,*args, **kwargs):
    
    email = request.GET.get("email","")
    user = User.objects.all().filter(email = email).first()
    if (user == None):
      payload = {"email" : email , "password" : "123"}
      response = requests.post(url = "http://127.0.0.1:8000/docapp/start/user/" , data = payload)
      return (HttpResponse("Created Successfully"))
    else:
      return(HttpResponse("User already exist"))

class ProjectSearchView(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  def get(self,request,*args, **kwargs):
    
    toreturn = []
    tosearch = str(request.GET.get("searchquery",""))
    print(tosearch)
    allproject = Project.objects.annotate(search = SearchVector("pname")).filter(search = tosearch)
    print(allproject)
    i=0
    for x in allproject:
      if(Project_role.is_allowed(x.id , request.user)):
        toreturn.append(ProjectSerializer(x).data)
        print(toreturn)
        i = i +1
        print(x)
    
    print(toreturn)
    if not toreturn:
      return HttpResponse("Not found" , status = 400)
    else:
      # Jsonstring = json.dumps(toreturn)
      return Response(toreturn)
      
  
class DocumentSearchView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes=[permissions.AllowAny]
  
  def get(self,request,*args, **kwargs):
    
    toreturn = []
    tosearch = str(request.GET.get("searchquery",""))
    print(tosearch)
    alldocuments = Document.objects.annotate(search = SearchVector("docname","delta")).filter(search = tosearch)
    print(alldocuments)
    i=0
    for x in alldocuments:
      if(Project_role.is_allowed(x.project.all().first().id , request.user)):
        l = str(x.project.all().first().user)
        y = DocumentSerializer(x).data
        z= {'key':i , 'docname':x.docname  , 'proname':x.project.all().first().pname , 'ownname':l , 'text':x.text}
        toreturn.append(z)
        # print(toreturn)
        i = i +1
        # print(x)
    
    # print(toreturn)
    if not toreturn:
      return HttpResponse("Not found" , status = 400)
    else:
      # Jsonstring = json.dumps(toreturn)
      return Response(toreturn)
        
    
  
class ProjectGetView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]
  
  def get(self,request,*args, **kwargs):
    print(request.auth)
    projec = request.GET.get("pname","") 
    use = request.GET.get("user","") 
    print(use)
    usa = User.objects.all().get(email = use)
    # project = Project.objects.all().get(pname = projec , user = usa)
    # serializedproject = ProjectSerializer(project)
    if(Project.objects.all().filter(pname = projec , user = usa).first() == None):
      return Response(status=400)
    else:
      project = Project.objects.all().get(pname = projec , user = usa)
      serializedproject = ProjectSerializer(project)
      print(project.id)
      if (Project_role.is_allowed(project.id , request.user)):
        return Response(serializedproject.data)
      else:
        return Response(status=400)

class DocumentGetView(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  def get(self,request,*args,**kwargs):
    
    docnam = request.GET.get("docname","")
    projec= request.GET.get("project","")
    document = Document.objects.all().get(docname = docnam, project = projec)
    serializeddocument = DocumentSerializer(document)
    return Response(serializeddocument.data)

class RoleGetView(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]
  
  def get(self,request,*args,**kwargs):
    projec = request.GET.get("project","")
    role = Project_role.objects.all().get(user = request.user.id, project = projec)
    serializedrole = ProjectRoleSerializer(role)
    print(role.role)
    return Response(serializedrole.data)
  
  def post(self,request,*args,**kwargs):
    projec = request.data.get("project","")
    rol = request.data.get("role","")
    use = request.data.get("user","")
    project = Project.objects.all().get(id = projec)
    x = str(project.user)
    y = str(request.user.email)
    if(x == y ):
      data = {"user" : use , "project": projec , "role": rol}
      serializer = ProjectRoleSerializer(data=data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
      else:
        return Response(serializer.errors, status=400)
    else:
      return Response("Access denied or Already exists" , status = 400)

class RoleDeleteView(APIView):
  authentication_classes=[TokenAuthentication]
  permission_classes = [permissions.IsAuthenticated]
  
  def post(self,request,*args,**kwargs):
    projec = request.data.get("project","")
    use = request.data.get("user","")
    project = Project.objects.all().get(id = projec)
    use2 = User.objects.all().filter(email = use).first()
    x = str(project.user)
    y = str(request.user.email)
    if(x == y):
      if(use2 != None):
        role = Project_role.objects.all().filter(user = use2.id, project = projec).first()
        if(role!= None):
          role.delete()
          return Response("Deleted Successful" , status=200)
        else:
          return Response("User was not member of project", status =400)
      else:
        return Response("User does not exist" , status=400)
    else:
      return Response("Not allowed",status=400)
  
class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer
  authentication_classes = [TokenAuthentication]
  permission_classes = [permissions.AllowAny]
  
  

class ProjectRoleViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Project_role.objects.all()
  serializer_class = ProjectRoleSerializer
  permission_classes = [permissions.AllowAny]

class DocumentViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer
  permission_classes = [permissions.AllowAny]

class DocumentRoleViewSet(viewsets.ModelViewSet):
  authentication_classes = [TokenAuthentication]
  queryset = Document_role.objects.all()
  serializer_class = DocumentRoleSerializer
  permission_classes = [permissions.AllowAny]

def index(request):
  return redirect("https://channeli.in/oauth/authorise/?client_id=2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf&redirect_uri=http://localhost:8000/docapp/authenticate/&state='success'")

def authenticate(request):
  code = request.GET['code']
  print(code)
  url1 = "https://channeli.in/open_auth/token/"
  # return redirect("http://localhost:8000/docapp/gettoken/")
  payload1 = {'client_id': '2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf', 'client_secret':'lp9Zt2mrL3lohhweEppEw6dHmBsfITDuNJ9SCZcxK16mDTby1cBNz12fJJssHAguLh6SV2lKT1s8J1agNPOmSshNQFRojx2Aq1MXIAIblhTYYpOC4cQbtjEvtMFmmom2','grant_type': 'authorization_code' , 'redirect_uri':'http://localhost:8000/docapp/authenticate/','code': code}
  response1 = requests.post(url1 , data=payload1)
  token = "Bearer " + response1.json().get('access_token','')
  print(response1.json().get('access_token',''))
  print(response1.json().get('token_type',''))
  print (token)
  param = {"Authorization" : token}
  url2 = "https://channeli.in/open_auth/get_user_data/"
  response2 = requests.get(url = url2 , headers = param)
  mail = response2.json().get('contactInformation','').get('instituteWebmailAddress','')
  response3 = requests.get(url = "http://localhost:8000/docapp/user/" , params = {"email": mail}) 
  
  # payload2 = {
  #   'uname' = 
  # }
  return redirect("http://localhost:3000/?email="+mail)
# def gettoken(request):
#   url = "https:/channeli.in/open_auth/token/"
#   payload = {'client_id': '2ZX53W71ALyNvM8UryjFGfiNGi6GkdCUgxDvyrgf', 'client_secret':'lp9Zt2mrL3lohhweEppEw6dHmBsfITDuNJ9SCZcxK16mDTby1cBNz12fJJssHAguLh6SV2lKT1s8J1agNPOmSshNQFRojx2Aq1MXIAIblhTYYpOC4cQbtjEvtMFmmom2','grant_type': code , 'redirect_uri':'http://localhost:8000/docapp/authenticate/','code': code}
#   url1 = "https://channeli.in/open_auth/token/"
#   r = requests.post(url , data=payload)
#   return HttpResponse("K     "+code)