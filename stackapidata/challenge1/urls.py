from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
   
    url(r'^$', views.home),                                 		# main page url ----127.0.0.1:8000
    url(r'^question/create$', views.question_create),				# works background to upload the data which come from stackoverflow to our database 
    url(r'^search',views.search),									# url to template for our database json data
    url(r'^oursearchdata', views.StackApiDataList.as_view()),		# url to get data from our database after we click run button on search template
   
]


urlpatterns = format_suffix_patterns(urlpatterns)					#this is used to avoid problems when we get json from our database in the background 