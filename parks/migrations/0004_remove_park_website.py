# Generated by Django 3.1.1 on 2021-04-27 19:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parks', '0003_auto_20210422_2058'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='park',
            name='website',
        ),
    ]