# Generated by Django 3.0 on 2020-10-26 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_objective_dificulty'),
    ]

    operations = [
        migrations.AlterField(
            model_name='objective',
            name='objective',
            field=models.CharField(max_length=240),
        ),
    ]
