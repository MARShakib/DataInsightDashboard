from django.db import models
import os


# Create your models here.
class UploadedFile(models.Model):
    file = models.FileField(upload_to="csvs/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        super(UploadedFile, self).delete(*args, **kwargs)
