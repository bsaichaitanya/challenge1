from django.shortcuts import render,get_object_or_404
from django.http import JsonResponse,HttpResponse
from .models import StackApiData
# Create your views here.


from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StackApiDataSerializer


# view to render our main template for stackover querying
def home(request):
	return render(request,"stackdata.html")


# view for rendering template for search template which we use to query our database
def search(request):
	return render(request, "search.html")


# view for saving stackoverflow data into our database
def question_create(request):
	
	if request.method == "POST":
		title = request.POST.get("question")
		link = request.POST.get("link")
		title1 = request.POST.get("question")
		link1 = request.POST.get("link")


	instance = StackApiData(title=title,link= link,encrp_title=title1,encrp_link=link1)

	instance.save()

	success = "success"

	data = {
		'saved' : success,
	}
	return JsonResponse(data)
	

# view for getting json data from our database
class StackApiDataList(APIView):

	def get(self, request):
		questions = StackApiData.objects.all()
		title = request.GET["title"]
		link = request.GET["link"]
		if request.method == "GET":
			if title != "" and title:
				query = questions.filter(title__contains=title)
			if link != "" and link:
				query = query.filter(link__contains=link)
		serialized_query = StackApiDataSerializer(query, many=True)

		return Response(serialized_query.data)

	def post(self, request):
		pass
	