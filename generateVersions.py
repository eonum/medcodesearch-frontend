#!/usr/bin/python

"""
GET the Versions for all languages and catalogs from eonum api and generate the typescript file
src/app/versions.ty, that exports them as Dictionary.
"""

import os;
import json
from urllib.request import urlopen
from pprint import pformat

DIR = os.path.dirname(os.path.realpath(__file__))
FILE_PATH = DIR + "/src/assets/versions.json"

URL = "https://search.eonum.ch/{}/{}/versions"
LANGUAGES = ["de", "fr", "it", "en" ]

CATALOGS = ["icds", "chops", "drgs", "tarmeds", "klv1s"]
CATALOG_NAMES = {"icds": "ICD", "chops":"CHOP", "drgs": "SwissDRG", "tarmeds": "TARMED","klv1s": "KLV1"}

versions = {}

for lang in LANGUAGES:
    versions[lang] = {}
    for cat in CATALOGS:
        url = URL.format(lang, cat)
        print('GET: ' + url)
        # request url and save in reversed order
        response = urlopen(url).read()
        if cat == 'klv1s':
          years = [ver[-4:] for ver in json.loads(response)]
          versions[lang]["REG"] = years[::-1]
        versions[lang][CATALOG_NAMES[cat]] = json.loads(response)[::-1]

#content = json

with open(FILE_PATH,'w') as outfile:
    json.dump(versions, outfile,indent=4)


print('\nWrote' + FILE_PATH + '\n' + json.dumps(versions,indent=4))

