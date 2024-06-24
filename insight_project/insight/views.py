from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import UploadedFile


# Create your views here.
def insight_index(request):
    return render(request, "index.html")


def upload_file(request):
    json_reply = {
        "message": None,
        "error_message": None,
    }
    file = request.FILES.get("file")
    if file.content_type == "text/csv":
        uploaded_file = UploadedFile(file=file)
        uploaded_file.save()
        json_reply["message"] = "File uploaded successfully"
        return JsonResponse(json_reply)
    else:
        json_reply["error_message"] = "File type not okay"
        return JsonResponse(json_reply)


def analyze(request):
    return JsonResponse({"results": "System is ready"})
