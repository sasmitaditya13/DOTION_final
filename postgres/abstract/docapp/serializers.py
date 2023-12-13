from rest_framework import serializers
from .models import User
from .models import Project
from .models import Project_role
from .models import Document
from .models import Document_role
class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['email','password']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class ProjectSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset= User.objects.all()
    )
    class  Meta:
        model = Project
        fields = ['id','pname','user']

class ProjectRoleSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='email',
        queryset= User.objects.all()
    )
    class Meta:
        model = Project_role
        fields = ['user','project','role']

class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ['id','docname','project','delta','text']

class DocumentRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document_role
        fields = ['user', 'document','docrole']
        
