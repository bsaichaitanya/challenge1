from __future__ import unicode_literals
from django.db import models
from django_cryptography.fields import encrypt


# model to save data
class StackApiData(models.Model):

	title = models.CharField(max_length=1500)
	link = models.CharField(max_length=2500)
	encrp_title = encrypt(models.CharField(max_length=1500))
	encrp_link = encrypt(models.CharField(max_length=2500))
	created_on = models.DateTimeField(auto_now=False, auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True, auto_now_add=False)
		
			
	def __str__(self):
		return self.title

