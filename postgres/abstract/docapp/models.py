from django.db import models
from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import uuid
from django.contrib.auth.hashers import make_password
class UserManager(BaseUserManager):
    def create_user(self, email, password):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(make_password(password))
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.
    
    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def _post_save_receiver(sender,instance=None,created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
    
User = get_user_model()

class Project(models.Model):
    id = models.UUIDField(
         primary_key = True,
         default = uuid.uuid4,
         editable = False)
    pname = models.CharField(max_length=30)
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    class Meta:
        unique_together = ['user','pname']

class Project_role(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    project = models.ForeignKey(Project , on_delete=models.CASCADE)
    rolesidentify = (("O" , "Owner"),("A" , "Admin"),("K" , "Add docs"),("E","Edit docs"),("C" , "Comment"),("R","Read"))
    role = models.CharField(
        max_length = 1,
        choices = rolesidentify,
        default= 'R'
        )
    class Meta:
        unique_together = ['user','project']
    
    def is_allowed(projectid , username):
        role = Project_role.objects.all().filter(project = projectid, user = username.id).first()
        pro = Project.objects.all().get(id = projectid)
        x = str(pro.user)
        y = str(username.email)
        print(x)
        print(y)
        print(role)
        if (role == None and x!=y):
            return False
        else:
            return True

class Document(models.Model):
    id = models.UUIDField(
         primary_key = True,
         default = uuid.uuid4,
         editable = False)
    docname = models.CharField(max_length=30)
    project = models.ManyToManyField(Project)
    delta = models.TextField()
    text = models.TextField()

class Document_role(models.Model):
    # user = models.ManyToManyField(User)
    # document = models.ManyToManyField(Document)
    # rolesidentify = (("O" , "Owner"),("A" , "Admin"),("K" , "Add docs"),("E","Edit docs"),("C" , "Comment"),("R","Read"))
    # docrole = models.CharField(
    #     max_length = 1,
    #     choices =rolesidentify,
    #     default= 'R'
    #     )
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    document = models.ForeignKey(Document , on_delete=models.CASCADE)
    rolesidentify = (("O" , "Owner"),("A" , "Admin"),("K" , "Add docs"),("E","Edit docs"),("C" , "Comment"),("R","Read"))
    docrole = models.CharField(
        max_length = 1,
        choices = rolesidentify,
        default= 'R'
        )
    class Meta:
        unique_together = ['user','document']

