# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-02-02 22:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mini_url', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='miniurl',
            name='nb_acces',
            field=models.IntegerField(default=0, verbose_name=b"Nombre d'acces a l'URL"),
        ),
        migrations.AlterField(
            model_name='miniurl',
            name='url',
            field=models.URLField(unique=True, verbose_name=b'URL a reduire'),
        ),
    ]