# -*- coding: utf-8 -*-
import os
import re
import requests
import pygsheets
from bs4 import BeautifulSoup as Bs

SEARCH_PAGE = 'http://www.pap.fr/annonce/vente-appartements-paris-75-g439g43308g43313g43335g43339-du-studio-au-2-pieces'
SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1OkqYB9Z4rHIYLZXjwboV_v0BmBSKWtn6_gVGFw1CDF8/edit?usp=sharing'
URL_DOMAIN = 'http://www.pap.fr'

PAGINATION_SELECTOR = '.pagination li a'
LISTING_DETAIL_BTN_SELECTOR = '.btn-details'
NEXT_PAGE_SELECTOR = '.next'
GEOLOC_SELECTOR = '.item-geoloc'
SPECS_SELECTOR = '.item-summary'
DESCRIPTION_SELECTOR = '.item-description'
METRO_SELECTOR = '.item-metro .label'
PRICE_SELECTOR = '.price'
