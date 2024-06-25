from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import UploadedFile
import pandas as pd


# Create your views here.
def insight_index(request):
    return render(request, "index.html")


def upload_file(request):
    json_reply = {
        "message": None,
        "error_message": None,
        "file_id": None,
    }
    file = request.FILES.get("file")
    if file.content_type == "text/csv":
        uploaded_file = UploadedFile(file=file)
        uploaded_file.save()
        json_reply["message"] = "File uploaded successfully"
        json_reply["file_id"] = uploaded_file.id
        return JsonResponse(json_reply)
    else:
        json_reply["error_message"] = "File type not okay"
        return JsonResponse(json_reply)


def analyze(request, id):
    json_reply = {
        "insights": None,
        "correlations": None,
        "message": None,
    }
    item = UploadedFile.objects.get(pk=id)
    data = pd.read_csv(item.file.path)
    numeric_data = data.select_dtypes(include=["number"])
    json_reply["insights"] = numeric_data.describe().to_dict()
    json_reply["correlations"] = numeric_data.corr().to_dict()
    json_reply["message"] = f"id: {id} analyzed successfully"
    item.delete()
    return JsonResponse(json_reply)
