from django.shortcuts import render
from django.http import HttpResponse
from .models import DoubanDetail
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def main_page(request):
    # print(DoubanDetail.objects.filter(douban_id__contains="7916239")[0].movie_title)
    return render(request,"index.html")


def get_movies_rating():
    # DoubanDetail.objects.filter(douban_id__contains="7916239")[0].movie_title
    return 1