# Lint as: python3
"""Request handler classes for the extensions."""

import base64
import json
import re
import tornado.gen as gen
import os
import random

from collections import namedtuple
from notebook.base.handlers import APIHandler, app_log
from google.cloud import bigquery

import google.auth
from google.auth.exceptions import GoogleAuthError
from google.auth.transport.requests import Request

from jupyterlab_cookies.version import VERSION


SCOPE = ("https://www.googleapis.com/auth/cloud-platform",)


words = """yawn rose draw wave install plot slope prepare cause glow
macho impinge found society icicle boast capable sophisticated improve
high circle
""".title().split()

def generate_data(num):
  return {
    'words': [{
      'id': i,
      'name': ''.join(random.sample(words,3))
    } for i in range(num)]
  }

def generate_names(bigquery_client):
  client = bigquery_client.Client()
  QUERY = (
    'SELECT name FROM `bigquery-public-data.usa_names.usa_1910_2013` '
    'WHERE state = "TX" '
    'LIMIT 20')
  query_job = client.query(QUERY)  # API request
  rows = query_job.result()  # Waits for query to finish
  i = 1
  return {
    'words': [{
      'id': i,
      'name': row.name,
    } for row in rows]
  }

class ListHandler(APIHandler):
  """Handles requests for Dummy List of Items."""
  bigquery_client = None
  parent = None

  @gen.coroutine
  def post(self, *args, **kwargs):

    try:
      if not self.bigquery_client:
        self.bigquery_client = bigquery

      self.finish(generate_names(self.bigquery_client))

    except Exception as e:
      app_log.exception(str(e))
      self.set_status(500, str(e))
      self.finish({
        'error':{
          'message': str(e)
          }
        })