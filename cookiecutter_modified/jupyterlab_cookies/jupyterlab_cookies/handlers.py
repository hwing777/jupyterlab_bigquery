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


class AuthProvider:
  """Provides default GCP authentication credential."""

  _instance = None

  def __init__(self):
      self._auth, self._project = google.auth.default(scopes=SCOPE)

  @property
  def project(self):
      return self._project

  def refresh(self):
      if not self._auth.valid:
          app_log.info("Refreshing Google Cloud Credential")
          try:
              self._auth.refresh(Request())
          except GoogleAuthError:
              msg = "Unable to refresh Google Cloud Credential"
              app_log.exception(msg)
              raise

  def get_header(self):
      return {"Authorization": "Bearer {}".format(self._auth.token)}

  @classmethod
  def get(cls):
      if not cls._instance:
          auth = AuthProvider()
          cls._instance = auth
      cls._instance.refresh()
      return cls._instance

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
      'name': row.name+"hello",
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

  @gen.coroutine
  def get(self, *args, **kwargs):

    try:
      # if not self.bigquery_client:
      #   self.bigquery_client = bigquery
        
      # if not self.parent:
      #   self.parent = self.bigquery_client.location_path(
      #     AuthProvider.get().project, "hwing-sandbox"
      #   )

      self.finish(
          #generate_names(self.parent, self.bigquery_client)
          {}
      )

    except Exception as e:
      app_log.exception(str(e))
      self.set_status(500, str(e))
      self.finish({
        'error':{
          'message': str(e)
          }
        })

