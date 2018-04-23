from rest_framework import serializers
from .models import StackApiData

# this class converts our python query object into json object
class StackApiDataSerializer(serializers.ModelSerializer):


	class Meta:
		model = StackApiData
		fields = ('title', 'link', 'created_on', 'updated_on')

		
		#fields = '__all__'