from django.shortcuts import render

# Create your views here.
from .models import *
from .serializers import EmployeeSerializer,DepartmentSerializer
from rest_framework import viewsets


class EmployeeView(viewsets.ModelViewSet):
    queryset=Employee.objects.all()
    serializer_class=EmployeeSerializer



class DepartmentView(viewsets.ModelViewSet):
    queryset=Department.objects.all()
    serializer_class=DepartmentSerializer