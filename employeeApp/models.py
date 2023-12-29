from django.db import models

# Create your models here.
class Department(models.Model):
    name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Employee(models.Model):
    employee_id=models.IntegerField()
    employee_name=models.CharField(max_length=100)
    department=models.ForeignKey(Department,on_delete=models.SET_NULL, null=True, blank=True)
    date_of_joining=models.DateField()
    
    def __str__(self):
        return self.employee_name
    
