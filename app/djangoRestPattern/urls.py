"""djangoRestPattern URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView
from authentication import views as authViews
from api import views as apiViews
from api.user import views as userViews
from api.objective import views as objectiveViews
from api.goal import views as goalViews
from api.task import views as taskViews
from django.conf import settings
from django.conf.urls.static import static

API_URL = 'api'

urlpatterns = [
    # VIEWS URLs
    path('', TemplateView.as_view(template_name='server/index.html')),

    # AUTH APIs
    path(f'{API_URL}/login/', authViews.LoginView.as_view(), name='login'),
    path(f'{API_URL}/logout/', authViews.LogoutView.as_view(), name='logout'),
    path(f'{API_URL}/social-login/',
         authViews.SocialLoginView.as_view(), name='login'),
    path('auth/', include('rest_framework_social_oauth2.urls')),

    # APIs
    path(f'{API_URL}/health-check/',
         apiViews.HealthCheckView.as_view(), name='health-check'),
    # OBJECTIVE
    path(f'{API_URL}/objectives/',
         objectiveViews.GenericView.as_view(), name='allow-all-objective'),
    path(f'{API_URL}/objectives/<int:id>/',
         objectiveViews.SpecificView.as_view(), name='specific-objective'),

    # GOAL
    path(f'{API_URL}/objectives/<int:idObjective>/goals/',
         goalViews.GenericView.as_view(), name='allow-all-goal'),
    path(f'{API_URL}/objectives/<int:idObjective>/goals/<int:id>/',
         goalViews.SpecificView.as_view(), name='specific-goal'),

    # TASK
    path(f'{API_URL}/objectives/<int:idObjective>/goals/<int:idGoal>/tasks/',
         taskViews.GenericView.as_view(), name='allow-all-goal'),
    path(f'{API_URL}/objectives/<int:idObjective>/goals/<int:idGoal>/tasks/<int:id>/',
         taskViews.SpecificView.as_view(), name='specific-goal'),


    # USERS
    path(f'{API_URL}/users/',
         userViews.UserAllowAllView.as_view(), name='allow-all-user'),
    path(f'{API_URL}/users/<int:id>/',
         userViews.UpdateView.as_view(), name='update-user'),
    path(f'{API_URL}/users/verify/',
         userViews.VerifyView.as_view(), name='create-user'),
    path(f'{API_URL}/users/password-recovery/',
         userViews.PasswordRecoveryView.as_view(), name='password-recovery'),



    # ADMIN
    path('admin/', admin.site.urls),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
